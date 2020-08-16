const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.getProductById = (req,res,next,id)=>{
  Product.findById(id)
  .populate("category")
  .exec((err,product)=>{
    if(err){
      return res.status(400).json({
        "error":"Product not found"
      })
    }
    req.product = product
    next();

  })
}

//post Product
exports.createProducts = (req,res)=>{

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  console.log("insideCreateProducts");
  //todo come back here for error name
  console.log("reqest:"+req);
  form.parse(req, (err,fields,file)=>{
    if(err){
      console.log("error in form");
      return res.status(400).json({
        "error":"problem with image"+err.message
      })
    }


    console.log("destructuring the fields")

    //destructure the fields
    const {name,description,price,category,stock} = fields;
    //add some restriction
    if(!name || !description || !price || !category || !stock){
      return res.status(400).json({
        "error":"Please fill all required fields "
      })
    }

    console.log("creating product with fields")

    //create product
    let product = new Product(fields)

    console.log("Handling file")

    //Handle file here
    if(file.photo){
      if(file.photo.size > 300000){
        console.log("photo size is too big")
        return res.status(400).json({
          "error":"chose file smaller than 3mb"
        })

      }
      console.log("Saving photo")

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    console.log("Saving to database");

    //save to the db
    product.save((err,product)=>{
      if(err){
        return res.status(400).json({
          "error":"Could not save product into database error:"+err.message
        })
      }
      console.log("Saving to database");
      return res.json(product)
    })


  })

}

  //get product
exports.getProduct  = (req,res)=>{
  return res.json(req.product);
}

//TODO try removing this and removing undefined written above
//middlewear
exports.photo = (req,res,next)=>{
  if(req.product.photo.data){
    res.set("Content-Type",req.product.photo.contentType)
    return res.send(req.product.photo.data)
  }
  next();
}

//delete product
exports.removeProduct = (req,res)=>{
  let product = req.product;
  product.remove((err,deletedProduct)=>{
    if(err){
      return res.status(400).json({
        "error":"Failed to delete the product"
      })
    }
    return res.json({
      "message":"Succesfully Deleted product  "
    })

  })
}
//update product
exports.updateProduct = (req,res)=>{
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  //todo come back here for error name
  form.parse(req, (err,fields,file)=>{
    if(err){
      return res.status(400).json({
        "error":"problem with image"
      })
    }


    //destructure the fields
    const {name,description,price,category,stock} = fields;
    //add some restriction
    if(!name || !description || !price || !category || !stock){
      return res.status(400).json({
        "error":"Please fill all required fields "
      })
    }

    //get product from req.product
    let product = req.product;
    //update product
    product = _.extend(product,fields)

    //Handle file here
    if(file.photo){
      if(file.photo.size > 300000){
        return res.status(400).json({
          "error":"chose file smaller than 3mb"
        })
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //save to the db
    product.save((err,product)=>{
      if(err){
        return res.status(400).json({
          "error":"Could not update product into database error:"+err.message
        })
      }
      return res.json(product )
    })


  })
}
//get all products
exports.getAllProducts =(req,res)=>{
  let limit = req.query.limit? parseInt(req.query.limit):8
  let sortBy  = req.query.sortBy? req.query.limit:"_id"
  Product.find()
  .populate("category")
  .sort([[sortBy,"asc"]])
  .limit(limit)
  .exec((err,products)=>{
    if(err){
      return res.status(400).json({
        "error":"Error while showing products "+err.message
      })
    }
    return res.json(products);
  })
}

//update stock and sold
exports.updateStock = (req,res,next )=>{

  let myOperations = req.body.order.products.map(prod=>{
    return {
      updateOne:{
        filter:{_id:prod._id},
        update: {$inc:{stock: -prod.count ,sold: +prod.count}}
      }
    }
  });

  Product.bulkWrite(myOperations,{},(err,result)=>{
    if(err){
      return res.status(400).json({
        "error":"bulkOperations failed"+err.message
      })
    }
    next()
  })



}
//get all unique categories
exports.getAllUniqueCategories = (req,res)=>{
  Product.distinct("category",{},(err,categories)=>{
    if(err){
      return res.status(400).json({
        "error":"No categories found"+err.message
      })
    }
    return res.json(categories);
  })
}

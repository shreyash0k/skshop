

const Category = require('../models/category');


exports.getCategoryById = (req,res,next,id)=>{
  console.log("getcategorybyid Category");

  Category.findById(id)
  .exec((err,category)=>{
    if(err||!category){
      res.status(400).json({
        "error":"Category not found in DB"
      })

    }
    req.category =  category;
    next();

  })

}
exports.createCategory = (req,res)=>{
  console.log("create Category");

  const category = new Category(req.body);
  category.save((err,cate)=>{
    if(err){
      return res.status(400).json({
        "error":err.message
      })

    }
    return res.json(cate)
  })
}

exports.getAllCategory = (req,res)=>{
  console.log("getall Category");

  Category.find()
  .exec((err,categories)=>{
    if(err || !categories){
      return res.status(400).json({
        "error":"Could not find any categoryies"
      })
    }
    return res.json(categories);
  })
}
exports.getCategory = (req,res)=>{
  console.log("Get Category");
  return res.json(req.category)
}

//update controller
exports.updateCategory = (req,res)=>{
  console.log("update Category");

  const category = req.category;
  category.name= req.body.name;
  category.save((err,updatedCategory)=>{
    if(err ){
      return res.status(400).json({
        "error":"Failed to update category error:"+err.message
      })
    }
    return res.json(updatedCategory);
  })
}
//delete controller
exports.removeCategory = (req,res)=>{
  console.log("remove Category");

  const category = req.category;
  category.remove((err,category)=>{
    if(err || !category){
      return res.status(400).json({
        "error":"Failed to delete category error:"
      })
    }
    return res.json({
      "message":"Successfully deleted category"
    });
  })
}

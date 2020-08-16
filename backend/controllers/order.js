

const {Order,ProductCart} = require('../models/order')
//middlewear
exports.getOrderById = (req,res,next,id)=>{

  Order.findById(id)
  .populate("products.product","name price")
  .exec((err,order)=>{
    if(err){
      return res.status(400).json({
        "error":err.message
      })
    }
    req.order = order;
    next();

  })



}
//create order
exports.createOrder = (req,res)=>{
  req.body.order.user  = req.profile;
  const order = new Order(req.body.order);
  order.save((err,order)=>{
    if(err){
      return res.status(400).json({
        "error":"failed to save order :"+err.message
      })
    }
     return res.json(order);

  })
}

//get all orders
exports.getAllOrders = (req,res)=>{
  Order.find()
  .populate("user","_id name")
  .exec((err,orders)=>{
    if(err){
      return res.status(400).json({
        "error":"Could not load any orders :"+err.message
      })
    }
    return res.json(orders);
  })
}
//get order status
exports.getOrderStatus =(req,res)=>{
  res.json(Order.schema.path("status").enumValues )
}
//update order
exports.updateStatus = (req,res)=>{
  Order.update(
    {_id:req.body.orderId},
    {$set : {status:req.body.status}},
    (err,order)=>{
      if(err){
        return res.status(400).json({
          "error":"Cannot update order status "+err.message
        })
      }
      return res.json(order);
    }
  )
}

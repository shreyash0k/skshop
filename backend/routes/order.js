const express = require('express');
const router = express.Router();

//import controllers
const {isSignedin,isAuthenticated,isAdmin} = require('../controllers/auth');
const {getUserById,pushOrderInPurchaseList } = require('../controllers/user');
const {updateStock } = require('../controllers/product');
const {getOrderById,createOrder,getAllOrders,getOrderStatus,updateStatus}  = require('../controllers/order')

//params
//populates req.profile
router.param('userId',getUserById);

router.param('orderId',getOrderById)



//actual routes

//create order
router.post('/order/create/:userId',isSignedin,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder)
//list all orders
router.get('/order/all/:userId',isSignedin,isAuthenticated,isAdmin,getAllOrders)

//status of orders
router.get('/order/status/:userId',isSignedin,isAuthenticated,isAdmin,getOrderStatus)
//update order
router.put('/order/:orderId/status/:userId',isSignedin,isAuthenticated,isAdmin,updateStatus)

module.exports = router;

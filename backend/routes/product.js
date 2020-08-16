const express = require('express');
const router = express.Router();


//import controllers
const {getProductById,getProduct,createProducts,photo,removeProduct,updateProduct,getAllProducts,getAllUniqueCategories} = require('../controllers/product');
const {isSignedin,isAuthenticated,isAdmin} = require('../controllers/auth');
const {getUserById } = require('../controllers/user');

//param
router.param("userId",getUserById);
router.param("productId",getProductById)

//actual routes
//create product
router.post("/product/create/:userId",isSignedin,isAuthenticated,isAdmin,createProducts)

//get product by id
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);

//delete product
router.delete("/product/:productId/:userId",isSignedin,isAuthenticated,isAdmin,removeProduct);

//update product
router.put("/product/:productId/:userId",isSignedin,isAuthenticated,isAdmin,updateProduct);

//get all products
router.get("/products",getAllProducts)

//get all distinct categories
 router.get("/products/categories",getAllUniqueCategories)
module.exports  = router;

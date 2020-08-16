const express = require('express');
const router = express.Router();


const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,removeCategory} = require('../controllers/category');
const {getUserById} = require('../controllers/user');
const {isSignedin,isAdmin,isAuthenticated} = require('../controllers/auth');


//params
router.param('userId',getUserById);
router.param('categoryId',getCategoryById);

//actual routes
//insert category
router.post('/category/create/:userId',isSignedin,isAuthenticated,isAdmin,createCategory);
//get one category
router.get('/category/:categoryId',getCategory);
//get all categories
router.get('/categories',getAllCategory );
//update one category by id
router.put('/category/:categoryId/:userId',isSignedin,isAdmin,isAuthenticated,updateCategory);
//delete categy by id
router.delete('/category/:categoryId/:userId',isSignedin,isAdmin,isAuthenticated,removeCategory );

module.exports = router;



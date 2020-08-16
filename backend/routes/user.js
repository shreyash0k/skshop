const express = require('express');
const router = express.Router();
const {getUserById,getUser,updateUser,userPurchaseList} = require ('../controllers/user.js');
const {isAdmin,isAuthenticated,isSignedin } = require ('../controllers/auth.js');

// this will populate req.profile
router.param('userId',getUserById)

//get single user
router.get("/user/:userId",isSignedin,isAuthenticated, getUser )
//update user
router.put("/user/:userId",isSignedin,isAuthenticated, updateUser )
//get orders
router.put("/orders/user/:userId",isSignedin,isAuthenticated, userPurchaseList )


module.exports = router;

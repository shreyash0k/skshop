var express = require('express')
var router = express.Router();
const {signout,signup,signin,isSignedin} = require('../controllers/auth');
const { check } = require('express-validator');



router.post("/signup",[
  check('name')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 chars long'),
  check('email')
     .isEmail().withMessage('Email is invalid'),
  check('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 chars long'),


],signup);
router.post("/signin",[
  check('email')
     .isEmail().withMessage('Email is invalid'),



],signin);

router.get('/signout',signout);
router.get('/testroute',isSignedin,(req,res)=>{
  res.send("A protected route");
})

module.exports = router

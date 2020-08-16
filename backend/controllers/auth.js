

const User = require('../models/user');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');



exports.signup = (req,res) =>{



  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({
      "error": errors.array()[0].msg,
      "message":errors.array()[0].msg
    })
  }



  const user = new User(req.body);
  user.save((err,user)=>{
    if(err){
      return res.status(400).json({
        "message":"Account with this email already exists",
        "error":"Account with this email already exists"
      })
    }
    return res.status(200).json({
      name:user.name,
      email:user.email,
      id:user._id,
      role:user.role
    });
  });
}

exports.signin = (req,res) =>{
   const {email,password} = req.body;
   const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({
      "error": errors.array()[0].msg
    })
  }

  User.findOne({email},(err,user)=>{
    if(err||!user){
      return res.status(400).json({
        "error":"user with this email does not exists",
        "message":"user with this email does not exists",

      })
    }

    if(!user.authenticate(password)){
      return res.status(401).json({
        "error":"Email and password do not match",
        "message":"Email and password do not match"
      })
    }
    //auth success create token
    const expiration = 604800000;
    const token = jwt.sign({_id:user._id},process.env.SECRET,{
      expiresIn:'7d'
    });
    //put token insider user's cookie
    res.cookie("token",token,{
      expires: new Date(Date.now() + expiration),
      secure: false, // set to true if your using https
      httpOnly: true
    });
    //send response to frontend
    const {_id,name,email,role} = user;
    return res.json({
      token,
      user:{_id,name,email,role }
    })


  })
}

exports.signout = (req,res)=>{
  res.clearCookie("token");
  return res.json({
    "message":"User Successfully signed out"
  })
}
//protected routes
exports.isSignedin  = expressJwt({
  secret:process.env.SECRET,
  algorithms: ['HS256'],
  userProperty:"auth"
})

//custom middlewear
exports.isAuthenticated = (req,res,next)=>{
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if(!checker){
    return res.status(403).json({
      "error":"Access Denied"
    })
  }
  next();
}
exports.isAdmin = (req,res,next)=>{
  if(req.profile.role === 0){
    res.status(403).json({
      "error":"You are not admin"
    })
  }
  next();
}

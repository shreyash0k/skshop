const express = require('express');
const app = express();
const port = 3000;
app.get('/',(req,res)=>{
  res.send("hellow world");
});

const admin = (req,res)=>{
  res.send("This is admin dashboard");
}

const isAdmin = (req,res,next)=>{
  console.log("This is middlewear");
  next();
}
app.get('/admin',isAdmin,admin)
app.listen(port,()=>{
  console.log("Listening to port http://localhost:"+port);
})

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser  = require('cookie-parser');
const cors = require('cors');
const app = express();
require('dotenv').config()

//middlewear
app.use(bodyParser.json());//bodyparser
app.use(cookieParser());//cookieparser
app.use(cors());//cors

//route imports
const authRoutes= require('./routes/auth');
const userRoutes= require('./routes/user');
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')
const paymentBRoutes = require('./routes/paymentBRoutes')

//port
const port = process.env.PORT || 3000;

//Db connection
mongoose.connect(process.env.DB_CONNECTION,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then( ()=>{
       console.log("Connected to database!");
  }).catch(()=>{
    console.log("Database failed to connect ")
  });


//my routes
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',orderRoutes);
app.use('/api',paymentBRoutes );

app.get('/',(req,res)=>{
  return res.send("Home")
})

//starting server
app.listen(port,()=>{
  console.log("app is running on port"+port);
})

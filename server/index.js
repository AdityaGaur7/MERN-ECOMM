const express = require("express");
const app = express();
const mongoose = require('mongoose');


app.get("/",(req,res)=>{
    res.send("app is running");
})
const connectdb = async()=>{
 mongoose.connect('mongodb://localhost:27017/okayy')
 const productschema = new mongoose.Schema({});
 const product = mongoose.model('product',productschema);
 
 const data = await product.find();
 
 console.log(data);
}

connectdb();
app.listen(5000);
const express = require("express");
const app = express();
const db  = require('./db/config')
const User = require("./db/User")
app.use(express.json())
app.post('/register',async(req,res)=>{
 
    const user = new User(req.body)
   let result = await user.save();
   res.send(result);

})

app.listen(5000);
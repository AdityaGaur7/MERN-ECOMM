const express = require("express");
const app = express();
const db  = require('./db/config')
const cors = require('cors')
const User = require("./db/User")

app.use(cors())
app.use(express.json())
app.post('/register',async(req,res)=>{
 
    const user = new User(req.body)
   let result = await user.save();
   res.send({result,success:true});

})

app.listen(5000);
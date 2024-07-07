const express = require("express");
const app = express();
const db = require('./db/config')
const cors = require('cors')
const User = require("./db/User")
const Product = require("./db/product")
app.use(cors())
app.use(express.json())
app.post('/register', async (req, res) => {

    const user = new User(req.body)
    let result = await user.save();
    result = result.toObject();
    delete result.password
    res.send({ result, success: true });

})
app.post('/login', async (req, res) => {
    let user = await User.findOne(req.body).select("-password");
    if (req.body.email && req.body.password) {
        if (user) {
            res.send({user, success: true} )
        }
        else {
            res.send({ result: 'No User found', success: false  });
    
        }
    } else {
        res.send({ result: 'No User found', success: false  });
    }
})


app.post('/addproduct',async(req,res)=>{

    const product = new Product(req.body);
    let result = await product.save();
    res.send({ result, success: true });
})
app.get('/allproduct',async(req,res)=>{
    let result = await Product.find();
    if(result.length>0){
        res.send({ result, success: true});
    }else{
        res.send({ result:"no product found", success: false });

    }
})


app.listen(5000);
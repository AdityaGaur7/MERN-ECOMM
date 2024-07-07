const express = require("express");
const app = express();
const db = require('./db/config')
const cors = require('cors')
const User = require("./db/User")
const Product = require("./db/product")
const jwt = require('jsonwebtoken');
const jwtkey = 'ecom';
app.use(cors())
app.use(express.json())
app.post('/register', async (req, res) => {

    const user = new User(req.body)
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({result},jwtkey,{expiresIn:'2h'},(err,token)=>{
        if(err){
            res.send({ result: 'No result found try after sometime', success: false  });
        }else{

            res.send({result,token, success: true});
        }
    
    })

})
app.post('/login', async (req, res) => {
    let user = await User.findOne(req.body).select("-password");
    if (req.body.email && req.body.password) {
        if (user) {
            jwt.sign({user},jwtkey,{expiresIn:'2h'},(err,token)=>{
                if(err){
                    res.send({ result: 'No User found try after sometime', success: false  });
                }else{

                    res.send({user,token, success: true});
                }
            
            })
          
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

app.delete("/product/:id",async(req,res)=>{
    
    let result = await Product.deleteOne({_id:req.params.id});
    if(result){
        res.send({ result, success: true });
    }
    else{
        res.send({ result, success: false });
    }
    
})
app.get("/product/:id",async(req,res)=>{
    let result = await Product.findOne({_id:req.params.id});
  
    if(result){
        res.send({ result, success: true });
    }
    else{
        res.send({ result:'Product not found', success: false });
    }
})

app.put("/product/:id",async(req,res)=>{
    let result = await Product.updateOne({_id:req.params.id},req.body);
    if(result){
        res.send({ result, success: true });
    }
    else{
        res.send({ result, success: false });
    }
})

app.get("/search/:key",async(req,res)=>{
    let result = await Product.find({
        "$or":[
            {name: {$regex:req.params.key}},
            {company: {$regex:req.params.key}},
            {category: {$regex:req.params.key}},
            {price: {$regex:req.params.key}},
    ]
    })
    if(result)
    res.send({result,success:true});
else {
    res.send({result,success:false});

}
})





app.listen(5000);
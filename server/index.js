const express = require("express");
const app = express();
const db = require('./db/config')
const cors = require('cors')
const User = require("./db/User")
const Product = require("./db/product")
const dotenv = require("dotenv");
dotenv.config();
const jwt = require('jsonwebtoken');
const jwtkey = process.env.JWT_SECRET;

  const corsOptions = {
    origin: ['https://mern-ecomm-yk9t.vercel.app'],
    methods:["GET","POST","PUT","DELETE"],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(cors(corsOptions));


app.use(express.json())

const PORT = process.env.PORT || 5000

app.get("/",async(req,res)=>{
    res.send("app is running dude")
})
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
                    res.status(401).send({ result: 'No User found try after sometime', success: false  });
                }else{

                    res.send({user,token, success: true});
                }
            
            })
          
        }
        else {
           
            res.status(403).send({ result: 'No User found', success: false  });
        }
    } else {
        res.status(403).send({ result: 'No User found', success: false  });
    }
})

app.post('/addproduct',verifyToken,async(req,res)=>{
    
    const product = new Product(req.body);
    let result = await product.save();
    res.send({ result, success: true });
})
app.get('/allproduct',verifyToken,async(req,res)=>{
    let result = await Product.find();
    if(result.length>0){
        res.send({ result, success: true});
    }else{
        res.send({result, success: false });
        
    }
})

app.delete("/product/:id",verifyToken,async(req,res)=>{
    
    let result = await Product.deleteOne({_id:req.params.id});
    if(result){
        res.send({ result, success: true });
    }
    else{
        res.send({ result, success: false });
    }
    
})
app.get("/product/:id",verifyToken,async(req,res)=>{
    let result = await Product.findOne({_id:req.params.id});
  
    if(result){
        res.send({ result, success: true });
    }
    else{
        res.send({ result:'Product not found', success: false });
    }
})

app.put("/product/:id",verifyToken,async(req,res)=>{
    let result = await Product.updateOne({_id:req.params.id},req.body);
    if(result){
        res.send({ result, success: true });
    }
    else{
        res.send({ result, success: false });
    }
})

app.get("/search/:key",verifyToken,async(req,res)=>{
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
function verifyToken(req,res,next){
    
    let token = req.headers["authorization"];

    if(token){
        token = token.split(' ')[1];
        jwt.verify(token,jwtkey,(err,success)=>{
            if(err){
                res.send({result:"Invalid token",success:false});
            }
            else{
           next();
            }
        
        })
    }else{
        res.send({result:"No token found",success:false});
    }
    // console.log("ok",token);
  
}




app.listen(PORT);
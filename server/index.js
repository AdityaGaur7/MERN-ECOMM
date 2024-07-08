const express = require("express");
const app = express();
const db = require('./db/config');
const cors = require('cors');
const User = require("./db/User");
const Product = require("./db/product");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
dotenv.config();
const jwtkey = process.env.JWT_SECRET;

app.use(express.json());

const corsOptions = {
  origin: "https://mern-ecomm-yk9t.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true  // Enable credentials like cookies, if needed
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

const PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  res.send("App is running");
});

app.post('/register', async (req, res) => {
  const user = new User(req.body);
  let result;
  try {
    result = await user.save();
    result = result.toObject();
    delete result.password;
    const token = jwt.sign({ result }, jwtkey, { expiresIn: '2h' });
    res.send({ result, token, success: true });
  } catch (err) {
    res.status(500).send({ result: 'No result found, try again later', success: false });
  }
});

app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne(req.body).select("-password");
    if (!user) {
      return res.status(403).send({ result: 'No User found', success: false });
    }
    const token = jwt.sign({ user }, jwtkey, { expiresIn: '2h' });
    res.send({ user, token, success: true });
  } catch (err) {
    res.status(500).send({ result: 'No User found, try again later', success: false });
  }
});

app.post('/addproduct', verifyToken, async (req, res) => {
  const product = new Product(req.body);
  try {
    const result = await product.save();
    res.send({ result, success: true });
  } catch (err) {
    res.status(500).send({ result: 'Error adding product', success: false });
  }
});

app.get('/allproduct', verifyToken, async (req, res) => {
  try {
    const result = await Product.find();
    res.send({ result, success: true });
  } catch (err) {
    res.status(500).send({ result: 'Error fetching products', success: false });
  }
});

app.delete("/product/:id", verifyToken, async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send({ result, success: true });
  } catch (err) {
    res.status(500).send({ result: 'Error deleting product', success: false });
  }
});

app.get("/product/:id", verifyToken, async (req, res) => {
  try {
    const result = await Product.findOne({ _id: req.params.id });
    if (!result) {
      return res.status(404).send({ result: 'Product not found', success: false });
    }
    res.send({ result, success: true });
  } catch (err) {
    res.status(500).send({ result: 'Error finding product', success: false });
  }
});

app.put("/product/:id", verifyToken, async (req, res) => {
  try {
    const result = await Product.updateOne({ _id: req.params.id }, req.body);
    res.send({ result, success: true });
  } catch (err) {
    res.status(500).send({ result: 'Error updating product', success: false });
  }
});

app.get("/search/:key", verifyToken, async (req, res) => {
  try {
    const result = await Product.find({
      "$or": [
        { name: { $regex: req.params.key } },
        { company: { $regex: req.params.key } },
        { category: { $regex: req.params.key } },
        { price: { $regex: req.params.key } },
      ]
    });
    res.send({ result, success: true });
  } catch (err) {
    res.status(500).send({ result: 'Error searching product', success: false });
  }
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(' ')[1];
    jwt.verify(token, jwtkey, (err, success) => {
      if (err) {
        res.status(401).send({ result: "Invalid token", success: false });
      } else {
        next();
      }
    });
  } else {
    res.status(401).send({ result: "No token found", success: false });
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const mongoose =require ("mongoose")
const dotenv = require("dotenv");
dotenv.config();
// mongoose.connect("mongodb://localhost:27017/lol")
const url = process.env.MONGO

mongoose.connect(url)

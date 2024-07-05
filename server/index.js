const express = require("express");
const app = express();
const db = require('./db/config')
const cors = require('cors')
const User = require("./db/User")

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
            res.send(user)
        }
        else {
            res.send({ result: 'No User found' });
    
        }
    } else {
        res.send({ result: 'No User found' });

    }
})

app.listen(5000);
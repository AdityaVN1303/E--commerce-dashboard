const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
require('./db/config');

const User = require('./db/user');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/' , (req, res)=>{ 
    res.send("Success Opening");
})

app.post('/register' , async (req , res)=>{
    let user = await User.findOne({email : req.body.email}).select('-password');
    if (!req.body.name && !req.body.email && !req.body.password) {
        res.send({error : "Fill All Details"});
    }
    else if(user){
        res.send({error : "User Already Exist ! Please Login"});
    }
    else{
        let user = new User(req.body);
        let result = await user.save();
        res.send(result);
        console.log(result);
    }
})


app.post('/login' , async (req , res)=>{
    let user = await User.findOne(req.body).select('-password');
    if(req.body.password && req.body.email){
        if(user){
            res.send(user);
        }
        else{
            res.send({error : "User not Found"});
        }
    }
    else{
        res.send({error : "Fill Complete Details"});
    }
    console.log(user);
})

app.listen(5000);
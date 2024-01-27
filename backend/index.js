const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
require('./db/config');

const User = require('./db/user');
const Product = require('./db/product');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/' , (req, res)=>{ 
    res.send("Success Opening");
})

app.get('/products' , async (req, res)=>{ 
    let product = await Product.find();
    if(!product){
         res.send({error : "No Products Found !"})
      }
    else{
        res.send(product);
         
    }
})

app.get('/update-product/:id' , async (req, res)=>{ 
    let product = await Product.findOne({_id : req.params.id});
    if(!product){
         res.send({error : "No Products Found !"})
      }
    else{
        res.send(product);
         
    }
})

app.get('/search/:key' , async (req, res)=>{ 
    let product = await Product.find({
        "$or" : [
            { name : {$regex : req.params.key} },
            { company : {$regex : req.params.key} },
            { category : {$regex : req.params.key} }
        ]
    });

    if(!product){
         res.send({error : "No Products Found !"})
      }
    else{
        res.send(product);
         
    }
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

app.post('/add-product' , async (req , res)=>{

    if (!req.body.name && !req.body.price && !req.body.category && req.body.company && req.body.userId) {
        res.send({error : "Fill All Details"});
    }
    else{
        let product = new Product(req.body);
        let result = await product.save();
        res.send(result);
        console.log(result);
    }
    
})


app.delete('/products/:id' , async (req, res)=>{ 
    const result = await Product.deleteOne({_id : req.params.id});
    res.send(result);
    
})


app.put('/products/:id' , async (req, res)=>{ 
    const result = await Product.updateOne(
        {_id : req.params.id},
        {
           "$set" : req.body
        }
        );
    if(!result){
        res.send({error : "Error Updating the Product"})
    }
    else{
        res.send(result);
    }
    
})




app.listen(5000);
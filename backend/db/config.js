const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://adityanagare09:adityanagare09@cluster0.ac4sq5h.mongodb.net/e-commerce?retryWrites=true&w=majority").then((res) => {
    console.log("Mongoo Success")
  }).catch((err) => {
    console.log(err)
  });;
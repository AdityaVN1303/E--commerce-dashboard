const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/e-commerce").then((res) => {
    console.log("Mongoo Success")
  }).catch((err) => {
    console.log(err)
  });;
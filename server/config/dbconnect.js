const mongoose = require('mongoose')

const dbconnect=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/olx').then(()=>{
        console.log("Database connected");
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports=dbconnect;
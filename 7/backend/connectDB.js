const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongodb connected successfully");
})
.catch((error)=>{
    console.log("Error occured while connecting :",error)
})
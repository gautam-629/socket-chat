const mongoose=require('mongoose');

 async function connectDB(){
   try {
   await mongoose.connect("mongodb://0.0.0.0/27017",{dbName:"chat"});
   console.log("mongodb Connect");
   } catch (error) {
    console.log(error)
   }
}

module.exports=connectDB;
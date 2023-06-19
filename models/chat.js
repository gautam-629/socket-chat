const mongoose=require('mongoose')

const chatSchema=new mongoose.Schema({
    content:{
        type:String,
    },
    user:{
        type:String,
    },
    roomId:{
        type:String
    }
})
const chat=mongoose.model('Chats',chatSchema);

module.exports=chat;
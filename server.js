const express=require('express');
const http=require('http')
const app=express();
const Socketio=require('socket.io');
const server=http.createServer(app);
const Chat=require('./models/chat')
const io=Socketio(server)
const connectDB=require('./config/DBConnect');

app.use('/',express.static(__dirname+'/public'));

connectDB();

io.on('connection',(socket)=>{
 
   socket.on('join_room',(data)=>{
     
    console.log('Join',data.roomid);
      socket.join(data.roomid);
      
   })

   socket.on('msg-send',async(data)=>{
      
    const chats=await Chat.create({
        roomId:data.roomid,
        user:data.username,
        content:data.msg
    })
       io.to(data.roomid).emit('msg_rec',data);
   });

   socket.on('typing',(data)=>{
    io.to(data.roomid).emit('Someone_typing');
   })
})

app.set('view engine','ejs');

app.use('/',express.static(__dirname+'/public'));


app.get('/chat/:roomid', async(req,res)=>{
    const chats= await Chat.find({
        roomId:req.params.roomid
    })
    
    res.render('index',{
        id:req.params.roomid,
        data:chats
    })
})
server.listen(5000,()=>{
    console.log('serverRunning at port 5000');
})
 
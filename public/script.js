var socket=io();

let btn=document.getElementById('btn');
let inputMsg=document.getElementById('newmsg');
let msgList= document.getElementById('msgList');

btn.onclick=function exec(){
    socket.emit('msg-send',{
        msg:inputMsg.value
    });
}


socket.on('msg_rec',(data)=>{
    let Limsg=document.createElement('li');
    Limsg.innerHTML=data.msg;
    msgList.append(Limsg);
})
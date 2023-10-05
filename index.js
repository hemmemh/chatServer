const express = require('express');
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');
const router = require('./routs/index');
const ApiErrorMiddleware = require('./middleWares/ApiErrorMiddleware');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const cookieParser = require('cookie-parser');
const roomService = require('./services/roomService');
const mesaageService = require('./services/mesaageService');
const date= new Date()
const fileUpload = require('express-fileupload');
const path = require('path');
const { CLIENT_URL } = require('./utils/config');
const port = process.env.PORT || 5030;
app.use(express.json())
app.use(cookieParser())
app.use(cors(
  {credentials:true,
  origin:'http://31.129.107.38:3050',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",}
))
const io = new Server(server,{
  cors:{
    credentials:true,
    origin:'http://31.129.107.38:3050',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  }
})
io.on('connection',socket=>{
  socket.on('join',async( {data})=>{
    console.log(data);
    const room =await roomService.createOrUpdateRoom(data.userOne,data.userTwo)
    console.log(room);
    const rooms = await roomService.getAll()
    rooms.forEach(el => {
      console.log(el._id,'----');
      socket.leave(el._id.toString())
    });

    socket.join(room._id.toString())
     console.log(room._id,'yyu2');
  
    socket.emit('adminMessage',{
      data:{name:'admin',image:'', text:`hello ${data.name}` ,date:date.getHours() + ':' + date.getMinutes(),room:room }
    })
  })
  socket.on('userMessage',async({data})=>{

    const room =await mesaageService.createMessage(data)
    console.log(room,'yyu');

    io.to(room.roomCandidate._id.toString()).emit('userMessageFromServer',{...data,image:room.image})
  })
})

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api',router)




  app.use(ApiErrorMiddleware)


  const start = async ()  =>{
    try {
      await mongoose.connect('mongodb+srv://hem2:123@cluster0.6clhlbv.mongodb.net/')
      server.listen(port, async() => {
      console.log(`application is running at: http://localhost:${port}`);
      });
    } catch (error) {
        console.log(error);
    }
}


start()





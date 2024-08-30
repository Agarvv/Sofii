const express = require('express');
const http = require('http');
const sequelize = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const { setupRoutes } = require('./routes/main.js');
const ChatController = require('./controllers/ChatController')
const socket = require('./websocket/socket');
const socketIo = require('socket.io');
require('./config/passport'); // Archivo para la configuración de Passport
const cookie = require('cookie');
const Tests = require('./models/Tests')
const  CommentAnswer  = require('./models/CommentAwnser'); // Importa el

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:5000',
        methods: ['GET', 'POST'],
        credentials: true
    }
});
//socket.handleWebSocket(io);



io.on('connection', (socket) => {
    console.log('Socket.io Connection Detected, That means Socket.io WORKS!');
    
    const cookie = require('cookie');

    console.log('Cookies del usuario:', socket.request.headers.cookie);

    // Parsear las cookies
    const cookies = cookie.parse(socket.request.headers.cookie || '');
    const jwtToken = cookies.jwt;

    console.log('JWT Token:', jwtToken);
    
    socket.on('joinRoom', async (room_id) => {
        console.log('Joined room id ', room_id)
        
        try {
            
            
            const isAuthorized = await ChatController.checkIfAuthorized(jwtToken, room_id)
        if(isAuthorized) {
            console.log('You are authorized to connect hereeeeee')
        } else {
            console.log('It seems you arent authorized to be here, try again.')
        }
        
        
        } catch(e) {
            console.log(e)
        }
    })

    socket.on('chatMessage', async (data) => {
        
        console.log('message received', data)
        const { message, chat_id } = data;
        
        console.log('socket io data: ', data)
        
        socket.join(chat_id)
        
        
        
        
        try {
            let newMessage;
            switch(data.type) {
                case "single_message":
                   newMessage = await ChatController.handleSindleMessage(jwtToken, data)
                    io.to(chat_id).emit('chatMessage', newMessage)
                    break;
                case "image":
                    console.log('Image')
                    newMessage = await 
                    ChatController.handleMessageWithFile(jwtToken, data, 'image')
                    io.to(chat_id).emit('chatMessage', newMessage)
                    break;
                case "text-image":
                    console.log(data.type)
                    newMessage = await 
                    ChatController.handleMessageWithFile(jwtToken, data, 'text-image')
                    io.to(chat_id).emit('chatMessage', newMessage)
                    break;
                case "video":
                    newMessage = await 
                    ChatController.handleMessageWithFile(jwtToken, data, 'video')
                    io.to(chat_id).emit('chatMessage', newMessage)
                    break;
                case "text-video":
                    newMessage = await 
                    ChatController.handleMessageWithFile(jwtToken, data, 'text-video')
                    io.to(chat_id).emit('chatMessage', newMessage)
                    break;
                case "audio":
                    newMessage = await 
                    ChatController.handleMessageWithFile(jwtToken, data, 'audio')
                    io.to(chat_id).emit('chatMessage', newMessage)
                
                default:
                     console.log('Unknown Type')
                     return 
            }
            
        } catch (e) {
            console.log(e)
            throw e
        }
        
        
    });
});



app.use('/media', express.static(path.join(__dirname, 'media')));
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}));

app.get('/health', (req, res) => {
    res.send('Working')
})

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Configuración de rutas (incluye createPost)
setupRoutes(app);

 sequelize.authenticate().then(() => {
   console.log('Database Working Fine');
      sequelize.sync();
 }).catch((e) => { 
     console.log(e);
 });

server.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server Working Fine');
    }
});

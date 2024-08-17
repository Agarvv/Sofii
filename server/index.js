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
        const { message, chat_id } = data;
        console.log('Chat Message received from the frontend!', message, chat_id);
        socket.join(chat_id)
        
        try {
            console.log(`After sending message. MESSAGE: ${message}, CHAT_ID: ${chat_id}`)
            const newMessage = await ChatController.handleMessageSending(jwtToken, message, chat_id);
            if(newMessage) {
                console.log('Message intercepted: ', newMessage)
                io.to(chat_id).emit('chatMessage', newMessage)
            } else {
                console.log('Could not send message..')
                io.to(chat_id).emit('error', 'something went wrong while sending message')
            }
            
        } catch (e) {
            console.log(e)
            socket.emit('error', 'Something went wrong!'); // Emitir el error al socket específico
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
      sequelize.sync({alter: true});
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

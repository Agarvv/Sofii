const express = require('express');
const http = require('http');
const sequelize = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const { setupRoutes } = require('./routes/main.js');
const socket = require('./websocket/socket');
const socketIo = require('socket.io');
require('./config/passport'); // Archivo para la configuración de Passport

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
socket.handleWebSocket(io);




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
     sequelize.sync({ alter: true });
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

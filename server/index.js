const express = require('express');
const http = require('http')
const sequelize = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const multer = require("multer");
const passport = require('passport');
const { setupRoutes } = require('./routes/main.js');
const socket = require('./websocket/socket')
require('./config/passport'); // Archivo para la configuración de Passport
const socketIo = require('socket.io')


const app = express();
const server = http.createServer(app) 
const io = socketIo(server)
socket.handleWebSocket(io)




app.use('/media', express.static(path.join(__dirname, 'media')));
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}));


app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'media/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


app.use(multer({ storage }).single('file'));



app.get('/health', (req, res) => res.json('Ok'));



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
const express = require('express');
const http = require('http');
const sequelize = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const { setupRoutes } = require('./routes/main.js');
const ChatController = require('./controllers/ChatController')
const socketIo = require('socket.io');
require('./config/passport'); // Archivo para la configuración de Passport
const cookie = require('cookie');
const Tests = require('./models/Tests')
const  CommentAnswer  = require('./models/CommentAwnser'); // Importa el
const setUserActiveOrInactive = require('./outils/setUserActiveOrInactive')
const tokenController = require('./controllers/tokenController')
const websocket = require('./websocket')

const app = express();
const server = http.createServer(app);



// INIT WEBSOCKET SERVER
websocket.init(server)


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

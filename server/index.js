require('dotenv').config()

const express = require('express');
const http = require('http');
const sequelize = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const { setupRoutes } = require('./routes/main.js');
const ChatController = require('./controllers/ChatController')
const socketIo = require('socket.io');
const cookie = require('cookie');
const Tests = require('./models/Tests')
const  CommentAnswer  = require('./models/CommentAwnser'); // Importa el
const setUserActiveOrInactive = require('./outils/setUserActiveOrInactive')
const tokenController = require('./controllers/tokenController')
const websocket = require('./websocket')
require('./config/googlePassport'); 
require('./config/twitterPassport.js')
require('./config/githubPassport.js')



const app = express();


app.use(session({
    secret: 'secret', // Cambia esto por un secreto seguro
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambia a true si estás usando HTTPS
}));

const server = http.createServer(app);


// INIT WEBSOCKET SERVER
websocket.init(server)


app.use('/media', express.static(path.join(__dirname, 'media')));
app.use(cors({
    origin: 'https://sofii.vercel.app',
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('All Ok');
});

app.get('/health', (req, res) => {
    res.send('okk');
});

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Configuración de rutas (incluye createPost)
setupRoutes(app);

  sequelize.authenticate().then(() => {
   console.log('Database Working Fine');
     sequelize.sync({ force: false });
  }).catch((e) => { 
     console.log(e);
  });

server.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server Working Fine');
    }
});

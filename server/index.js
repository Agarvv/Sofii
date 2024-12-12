
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
const errorHandler = require('./middleware/errorHandler')
const moduleAlias = require('module-alias');

require('./config/googlePassport'); 
require('./config/twitterPassport.js')
require('./config/githubPassport.js')
require('./config/mailer')

const app = express();

app.use(session({
    secret: 'secret', // just for demo, i know the danger of using low security secrets.
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(errorHandler)


const server = http.createServer(app);

websocket.init(server)

app.use('/media', express.static(path.join(__dirname, 'media')));
app.use(cors({
    origin: 'https://sofii.vercel.app',
    credentials: true
}));

app.get('/health', (req, res) => {
    res.send('UP');
});

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
setupRoutes(app);

moduleAlias.addAliases({
  '@controllers': path.resolve(__dirname, './controllers'),
  '@models': path.resolve(__dirname, './models'),
  '@routes': path.resolve(__dirname, './routes'),
  '@middlewares': path.resolve(__dirname, './middlewares'),
  '@services': path.resolve(__dirname, './services'),
  '@outils': path.resolve(__dirname, './outils')
});


  sequelize.authenticate().then(() => {
   console.log('DATABASE OK');
     sequelize.sync({ force: false});
  }).catch((e) => { 
     console.log(e);
  });

server.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('SERVER OK');
    }
});

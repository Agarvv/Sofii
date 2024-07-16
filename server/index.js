const express = require('express');
const sequelize = require('./config/database.js');
const User = require('./models/User.js');
const Post = require('./models/Post');
const PostComment = require('./models/Comment');
const CommentAnswer = require('./models/CommentAwnser');
const Likes = require('./models/Likes');
const Follower = require('./models/Followers');
const Message = require('./models/Message');
const { body, validationResult } = require('express-validator');
const registerController = require('./controllers/registerController');
const loginController = require('./controllers/loginController');
const cookieParser = require('cookie-parser');
const tokenController = require('./controllers/tokenController');
const createPostController = require('./controllers/createPostController');
const cors = require('cors')
const multer = require("multer");
const path = require('path');
// PC VERSION COMMIT



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'media/images'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo
  }
});

// Configuración de Multer
const upload = multer({ storage: storage });







const app = express();
app.use('/media', express.static(path.join(__dirname, 'media')));
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.get('/health', (req, res) => {
    return res.json('Ok');
});

app.post('/api/sofi/register', [
    body("name").escape().trim().isLength({ min: 3, max: 30 }),
    body("email").escape().trim().isEmail(),
    body("password").escape().trim().isLength({min: 3, max: 50})
], async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Data Is Missing.' });
    }

    try {
        await registerController.createUser(name, email, password);
        return res.status(201).json({ success: 'Welcome To Sofii!' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e.message });
    }
});

app.post('/api/sofi/login', [
    body("email").escape().trim().isEmail(),
    body("password").escape().trim()
], async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email or Password Missing' });
    }

    try {
        const token = await loginController.handleLogin(email, password);
        res.cookie('jwt', token);
        return res.status(200).json({ welcome: 'Welcome Back To Sofii, Have a Good Session.' });
    } catch (e) {
        console.log(e);
        return res.status(401).json({ error: e.message });
    }
});

app.get('/api/sofi/check_token', async (req, res) => {
    try {
        console.log('Endpoint Solicited.');
        const jwt = req.cookies.jwt;
        if (!jwt) {
            return res.status(404).json({ detail: 'No Token Found.' });
        } else {
            console.log('You do have a Token.');
        }

        console.log('before invoking verifyJwtToken');
       const user =  await tokenController.verifyJwtToken(jwt)
        
        console.log('after invoking verifyJwtToken');
        return res.status(200).json({ detail: 'Your Session Is Valid.', user: user});
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});
//xd
app.post('/api/sofi/createPost', upload.single('postPicture'), [
    body("description").escape().trim(),
    body("postPicture").escape().trim(),
    body("privatePost").isBoolean(),
    body("only_friends").isBoolean(),
], async (req, res) => {
    console.log('FILE:::::,,,', req.file.path)
    console.log('BODY....????', req.body)
    try {
        const jwt = req.cookies.jwt;
        const decoded = await tokenController.verifyJwtToken(jwt);
        const user_id = decoded.user_id;
        const user_name = decoded.username;
        const user_img = decoded.userPicture;

        await createPostController.createPost(req.body, user_id, user_name, user_img, req.file.path);
        return res.status(201).json({ detail: 'Your Post Has Been Submitted To Our System.' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e.message });
    }
});

app.get('/api/sofi/posts', async (req, res) => {
    try {
        const posts = await Post.findAll({ where: { private: false } });
        return res.status(200).json({ posts });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

app.get('/api/sofi/post/:post_id', async (req, res) => {
    const post_id = req.params.post_id;

    try {
        const post = await Post.findOne({ where: { id: post_id } });
        if (!post) {
            return res.status(404).json({ detail: 'Post Not Found.' });
        }
        return res.status(200).json({ post });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

sequelize.authenticate().then(() => {
    console.log('Database Working Fine');
    sequelize.sync();
}).catch((e) => {
    console.log(e);
});

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server Working Fine');
    }
});
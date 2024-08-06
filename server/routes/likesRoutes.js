
const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likesController');
const Video = require('../models/Video'); // Esta línea parece no estar en uso, podrías eliminarla si no la necesitas
const Post = require('../models/Post'); // Supongo que querías importar el modelo de Post aquí

router.post('/like_content', async (req, res) => {
    try {
        console.log('like req.body ', req.body);
        
        const type = req.body.type;
        const token = req.cookies.jwt;
         
        if (!type) {
            return res.status(400).json({ error: 'Data is missing' }); // Cambié 404 a 400 para un error de solicitud incorrecta
        }
        
        switch (type) {
            case "VIDEO": { // Corregí la sintaxis del case
                if (!req.body.video_id) {
                    return res.status(400).json({ error: 'Something is wrong with the video that you want to like.' }); // Cambié 404 a 400
                }
                await likesController.likeVideo(token, req.body.video_id, (liked, unliked) => {
                    if (liked) {
                        return res.status(201).json({ detail: 'Video liked.' }); // Cambié "Liked" a "liked" para mantener consistencia
                    }
                    if (unliked) {
                        return res.status(201).json({ detail: 'Video unliked.' }); // Cambié "Unliked" a "unliked"
                    }
                });
                break; // Añadí el break para salir del case
            }
            case "POST": { // Corregí la sintaxis del case
                if (!req.body.post_id) {
                    return res.status(400).json({ error: 'Something is wrong with the post that you want to like.' }); // Cambié 404 a 400
                }
                await likesController.likePost(token, req.body.post_id, (liked, unliked) => {
                    if (liked) {
                        return res.status(201).json({ detail: 'Post liked.' }); // Cambié "liked" a "liked" para consistencia
                    }
                    if (unliked) {
                        return res.status(201).json({ detail: 'Post unliked.' }); // Cambié "unliked" a "unliked"
                    }
                });
                break; // Añadí el break para salir del case
            }
            default: {
                return res.status(400).json({ error: 'Invalid type provided.' }); // Añadí un caso por defecto para manejar tipos inválidos
            }
        }
    
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e.message }); // Mejoré la respuesta del error para mostrar el mensaje del error
    }
});

module.exports = router;
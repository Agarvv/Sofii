let io;
const cookie = require('cookie');
const ChatController = require('./controllers/ChatController');
const setUserActiveOrInactive = require('./outils/setUserActiveOrInactive');
const tokenController = require('./controllers/tokenController');

module.exports = {
    init: (server) => {
        io = require('socket.io')(server, {
            cors: {
                origin: 'https://sofii.vercel.app',
                methods: ['GET', 'POST'],
                credentials: true
            }
        });

        // Configuración de eventos WebSocket
        io.on('connection', async (socket) => {
            console.log('Socket.io Connection Detected, That means Socket.io WORKS!');
            
            // Parsear las cookies del header
            const cookies = cookie.parse(socket.request.headers.cookie || '');
            const jwtToken = cookies.jwt;
    
            if (!jwtToken) {
                 io.emit('notjwt', "The server could not found a JWT token websocekt.")
                return;
            }
    
            if (jwtToken) {
                io.emit("jwt", "OK")
                await setUserActiveOrInactive('active', jwtToken);
            }
    
            const userDecoded = await tokenController.verifyJwtToken(jwtToken);
            socket.join(userDecoded.user_id)
            console.log('User joined: ', userDecoded.user_id)
    
            // Evento para unirse a una sala
            socket.on('joinRoom', async (room_id) => {
                console.log('Joined room id', room_id);
    
                try {
                    const isAuthorized = await ChatController.checkIfAuthorized(userDecoded, room_id);
                    if (isAuthorized) {
                        console.log('Estás autorizado para conectarte aquí');
                    } else {
                        console.log('Parece que no estás autorizado para estar aquí, inténtalo de nuevo.');
                    }
                } catch (e) {
                    console.log(e);
                }
            });
    
            // Evento para recibir y reenviar mensajes de chat
            socket.on('chatMessage', async (data) => {
                console.log('Mensaje recibido:', data);
                const { message, chat_id } = data;
    
                socket.join(chat_id);
    
                try {
                    let newMessage;
                    switch (data.type) {
                        case "text":
                            newMessage = await ChatController.handleSindleMessage(jwtToken, data);
                            io.to(chat_id).emit('chatMessage', newMessage);
                            break;
                        case "image":
                            newMessage = await ChatController.handleMessageWithFile(jwtToken, data, 'image');
                            io.to(chat_id).emit('chatMessage', newMessage);
                            break;
                        case "text-image":
                            newMessage = await ChatController.handleMessageWithFile(jwtToken, data, 'text-image');
                            io.to(chat_id).emit('chatMessage', newMessage);
                            break;
                        case "video":
                            newMessage = await ChatController.handleMessageWithFile(jwtToken, data, 'video');
                            io.to(chat_id).emit('chatMessage', newMessage);
                            break;
                        case "text-video":
                            newMessage = await ChatController.handleMessageWithFile(jwtToken, data, 'text-video');
                            io.to(chat_id).emit('chatMessage', newMessage);
                            break;
                        case "audio":
                            newMessage = await ChatController.handleMessageWithFile(jwtToken, data, 'audio');
                            io.to(chat_id).emit('chatMessage', newMessage);
                            break;
                        default:
                            console.log('Tipo desconocido');
                            return;
                    }
                } catch (e) {
                    console.log(e);
                    throw e;
                }
            });
    
            // Evento para notificar cuando un usuario está escribiendo
            socket.on('typing', (chatId) => {
                socket.join(chatId);
                console.log('ChatId de typing:', chatId);
                socket.to(chatId).emit('typing');
                console.log('Emitido typing a:', chatId);
            });
    
            // Evento para marcar mensajes como leídos
            socket.on('readMessage', async (data) => {
                socket.join(data.chat_id);
                console.log('Leyendo mensaje:', data.message);
    
                const readedMessage = await ChatController.readMessage(data.message, userDecoded);
    
                if (readedMessage) {
                    socket.to(data.chat_id).emit('readMessage', readedMessage);
                }
            });
    
            // Evento de desconexión del socket
            socket.on('disconnect', async () => {
                console.log('Socket desconectado');
                if (jwtToken) {
                    await setUserActiveOrInactive('inactive', jwtToken);
                }
            });
        });

        return io;
    },
    
    // Función para obtener la instancia de socket.io
    getIO: () => {
        if (!io) {
            throw new Error("Socket.io no está inicializado");
        }
        return io;
    }
};
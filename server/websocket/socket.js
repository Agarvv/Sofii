const tokenController = require('../controllers/tokenController');
const cookie = require('cookie');

let handleWebSocket = (io) => {
    io.use(async (socket, next) => {
        try {
            const cookieHeader = socket.handshake.headers.cookie;
            if (cookieHeader) {
                const parsedCookie = cookie.parse(cookieHeader);
                const token = parsedCookie['jwt'];
                if (token) {
                    const userDecoded = await tokenController.verifyJwtToken(token);
                    if (!userDecoded) {
                        return next(new Error('Session verification failed, try logging in.'));
                    }
                    socket.user = userDecoded; // Asignar userDecoded al socket
                    return next();
                } else {
                    return next(new Error('Authentication error'));
                }
            } else {
                return next(new Error('No cookie found'));
            }
        } catch (err) {
            return next(new Error('Internal server error'));
        }
    });

    io.on('connection', (socket) => {
        console.log(`User ${socket.user.username} connected`); // Acceder a userDecoded
        // Manejar otros eventos aquí
      
        

        socket.on('disconnect', () => {
            console.log(`User ${socket.user.username} disconnected`);
        });
    });
}

module.exports = {
    handleWebSocket
};
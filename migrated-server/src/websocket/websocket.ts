import JwtHelper from '@helpers/JwtHelper';
import { Server } from 'socket.io';
import cookie from 'cookie';
//import ChatController from './controllers/ChatController';
//import setUserActiveOrInactive from './outils/setUserActiveOrInactive';
//import tokenController from './controllers/tokenController';

let io: Server | null = null;
export default {
    init: (server: any) => {
        io = new Server(server, {
            cors: {
                origin: 'https://sofii.vercel.app',
                methods: ['GET', 'POST'],
                credentials: true
            }
        });

        io.on('connection', async (socket) => {
            const cookies = cookie.parse(socket.request.headers.cookie || '');
            const jwtToken = cookies.jwt;

            if(!jwtToken) {
              return; 
            }
            //await setUserActiveOrInactive('active', jwtToken);

            const userDecoded = await JwtHelper.verifyToken(jwtToken);
            socket.join(userDecoded.user_id);

  
            socket.on('chatMessage', async (data: { message: string; chat_id: string; type: string; } ) => {
                const { message, chat_id } = data;
                socket.join(chat_id);
                // send message func soon
            });

            socket.on('typing', (chatId: string) => {
                socket.join(chatId);
                socket.to(chatId).emit('typing');
            });

            socket.on('stopTyping', (chatId: string) => {
                socket.join(chatId);
                socket.to(chatId).emit('stopTyping');
            });

            socket.on('readMessage', async (data: { message: string; chat_id: string; }) => {
                socket.join(data.chat_id);

                //const readedMessage = await ChatController.readMessage(data.message, userDecoded);

                //if (readedMessage) {
                //    socket.to(data.chat_id).emit('readMessage', readedMessage);
               // }
            });

            socket.on('disconnect', async () => {
                   // await setUserActiveOrInactive('inactive', jwtToken);
            });
        });

        return io;
    },

    getIO: () => {
        if (!io) {
            throw new Error("Socket.io not Initialized");
        }
        return io;
    }
};

import JwtHelper from '@helpers/JwtHelper';
import { Server } from 'socket.io';
import cookie from 'cookie';
import ChatService from '@services/chat/ChatService';
import ProfileService from '@services/profile/ProfileService'

let io: Server | null = null;

export default {
    init: (server: any) => {
        io = new Server(server, {
            cors: {
                origin: 'https://sofii-vsly.vercel.app',
                methods: ['GET', 'POST'],
                credentials: true,
            },
        });

        io.on('connection', async (socket) => {
            const cookies = socket.request.headers.cookie
                ? cookie.parse(socket.request.headers.cookie)
                : {};
            const jwtToken = cookies.jwt;

            if (!jwtToken) return;
            
            const userDecoded = await JwtHelper.verifyToken(jwtToken);

            socket.join(userDecoded.user_id);
            
            await ProfileService.setUserStatus('online', userDecoded.user_id)

            socket.on('chatMessage', async (data: { message: string; chat_id: number; type: string }) => {
                const { message, chat_id } = data;

                socket.join(String(chat_id));

                const newMessage = await ChatService.sendMessage(message, chat_id, userDecoded);

                socket.to(String(chat_id)).emit('chatMessage', newMessage);
            });

            socket.on('typing', (chatId: string) => {
                socket.join(chatId);
                socket.to(chatId).emit('typing');
            });

            socket.on('stopTyping', (chatId: string) => {
                socket.join(chatId);
                socket.to(chatId).emit('stopTyping');
            });

            socket.on('readMessage', async (data: { messageId: number; chatId: number }) => {
                socket.join(String(data.chatId));

                const readedMessage = await ChatService.readMessage(data.messageId);

                socket.to(String(data.chatId)).emit('readMessage', readedMessage);
            });

            socket.on('disconnect', async () => {
                
                await ProfileService.setUserStatus('offline', userDecoded.user_id)
            });
        });

        return io;
    },

    getIO: () => {
        if (!io) {
            throw new Error('Socket.io not Initialized');
        }
        return io;
    },
};
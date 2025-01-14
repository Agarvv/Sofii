import { Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import cookie from 'cookie';


let io: SocketIOServer;

interface DecodedUser {
  user_id: string;
}

interface ChatMessageData {
  type: string;
  message: string;
  chat_id: string;
}

interface ReadMessageData {
  chat_id: string;
  message: string;
}

export default {
  init: (server: Server) => {
    io = new SocketIOServer(server, {
      cors: {
        origin: 'https://sofii.vercel.app',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });

    io.on('connection', async (socket: Socket) => {
        console.log("user connection succeded")
    });

    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized');
    }
    return io;
  },
};
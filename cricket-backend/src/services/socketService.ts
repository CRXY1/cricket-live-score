import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { SocketEvents, JWTPayload } from '../types';

export const socketHandler = (io: Server) => {
  // Authentication middleware for Socket.IO
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user || !user.isActive) {
        return next(new Error('Authentication error'));
      }

      socket.data.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.data.user?.email} (${socket.id})`);

    // Join user to their role-based room
    if (socket.data.user?.role === 'admin') {
      socket.join('admins');
    }
    if (['admin', 'editor'].includes(socket.data.user?.role)) {
      socket.join('editors');
    }

    // Join match rooms for live updates
    socket.on('join:match', (matchId: string) => {
      socket.join(`match:${matchId}`);
      console.log(`User ${socket.data.user?.email} joined match room: ${matchId}`);
    });

    socket.on('leave:match', (matchId: string) => {
      socket.leave(`match:${matchId}`);
      console.log(`User ${socket.data.user?.email} left match room: ${matchId}`);
    });

    // Admin-only events
    if (socket.data.user?.role === 'admin') {
      socket.on('admin:broadcast', (data) => {
        socket.broadcast.emit('admin:notification', {
          message: data.message,
          type: data.type || 'info',
          timestamp: new Date()
        });
      });

      socket.on('match:updateScore', (matchId: string, scoreData: any) => {
        io.to(`match:${matchId}`).emit('match:scoreUpdate', matchId, {
          ...scoreData,
          timestamp: new Date()
        });
      });

      socket.on('match:addWicket', (matchId: string, wicketData: any) => {
        io.to(`match:${matchId}`).emit('match:wicket', matchId, {
          ...wicketData,
          timestamp: new Date()
        });
      });

      socket.on('match:addBoundary', (matchId: string, boundaryData: any) => {
        io.to(`match:${matchId}`).emit('match:boundary', matchId, {
          ...boundaryData,
          timestamp: new Date()
        });
      });

      socket.on('match:completeOver', (matchId: string, overData: any) => {
        io.to(`match:${matchId}`).emit('match:over', matchId, {
          ...overData,
          timestamp: new Date()
        });
      });

      socket.on('match:changeStatus', (matchId: string, status: string) => {
        io.to(`match:${matchId}`).emit('match:statusChange', matchId, status);
      });

      socket.on('commentary:add', (matchId: string, commentary: string) => {
        io.to(`match:${matchId}`).emit('commentary:update', matchId, {
          text: commentary,
          timestamp: new Date(),
          author: socket.data.user.fullName || socket.data.user.username
        });
      });
    }

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.data.user?.email} (${socket.id})`);
      
      // Notify other admins
      if (socket.data.user?.role === 'admin') {
        socket.broadcast.to('admins').emit('admin:userOffline', {
          userId: socket.data.user._id,
          email: socket.data.user.email,
          timestamp: new Date()
        });
      }
    });

    // Notify other admins when a user comes online
    if (socket.data.user?.role === 'admin') {
      socket.broadcast.to('admins').emit('admin:userOnline', {
        userId: socket.data.user._id,
        email: socket.data.user.email,
        timestamp: new Date()
      });
    }
  });

  return io;
};

// Helper functions to emit events from controllers
export const emitMatchUpdate = (io: Server, matchId: string, event: string, data: any) => {
  io.to(`match:${matchId}`).emit(event, matchId, {
    ...data,
    timestamp: new Date()
  });
};

export const emitToAdmins = (io: Server, event: string, data: any) => {
  io.to('admins').emit(event, {
    ...data,
    timestamp: new Date()
  });
};

export const emitToEditors = (io: Server, event: string, data: any) => {
  io.to('editors').emit(event, {
    ...data,
    timestamp: new Date()
  });
};

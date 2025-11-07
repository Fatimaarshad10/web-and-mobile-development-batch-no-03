import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import userRouter from './router/userRoute.js';
import { Server } from 'socket.io';
import cors from 'cors';
import { handleFileUpload } from './helper/fileUpload.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for now
  },
});

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('Socket.io server running...');
});

// Set up static file serving for uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle file uploads
  socket.on('upload_file', async (data) => {
    try {
      const file = await handleFileUpload(data.file);
      
      // Emit the file URL to all users in the room
      io.to(data.roomId).emit('file_uploaded', {
        sender: data.sender,
        fileUrl: `/uploads/${file.filename}`,
        fileName: file.originalname
      });
    } catch (error) {
      socket.emit('upload_error', { message: error.message });
    }
  });

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on('send_message', (data) => {
    const { roomId, message, sender } = data;
    console.log(`Message from ${sender} in room ${roomId}: ${message}`);

    io.to(roomId).emit('receive_message', { sender, message });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


// --- MongoDB connection ---
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

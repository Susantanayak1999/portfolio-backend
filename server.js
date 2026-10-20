const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // 👈 Added
const { Server } = require('socket.io'); // 👈 Added
const emailRoute = require('./routes/email');
require('dotenv').config();

const app = express();
const server = http.createServer(app); // 👈 Changed from app.listen to http.createServer

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: ['https://susanta-portfolio.onrender.com', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT']
  }
});

app.use(cors({
  origin: ['https://susanta-portfolio.onrender.com', 'http://localhost:5173']
}));
app.use('/uploads', express.static('uploads'));
app.use(express.json());

// Make 'io' accessible in your routes
app.set('socketio', io);

// Routes
const publicRoutes = require('./routes/public');
app.use('/api/resume', publicRoutes);
app.use('/api/admin', require('./routes/admin'));
app.use('/api/email', emailRoute); 


app.get('/', (req, res) => {
  res.send('Backend is running successfully!');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    // 👇 Use 'server.listen' instead of 'app.listen'
    server.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.log('❌ MongoDB connection error:', err));
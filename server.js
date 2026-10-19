const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: ['https://susanta-portfolio.onrender.com', 'http://localhost:5173']
}));

// Routes
const publicRoutes = require('./routes/public');
app.use('/api/resume', publicRoutes);

app.use('/api/admin', require('./routes/admin'));

app.get('/', (req, res) => {
  res.send('Backend is running successfully!');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.log('❌ MongoDB connection error:', err));
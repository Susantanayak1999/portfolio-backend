const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio_resumes',
    allowed_formats: ['pdf'],
    resource_type: 'image', // 👈 Changed from 'raw' to 'image'
    format: 'pdf', // 👈 Forces the PDF extension
    public_id: 'Susanta_Resume' 
  }
});

module.exports = multer({ storage: storage });
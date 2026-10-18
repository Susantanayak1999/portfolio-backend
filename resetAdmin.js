const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  // 1. Delete any existing admins
  await Admin.deleteMany({});
  
  // 2. Create your new admin account
  await Admin.create({
    email: 'admin@susanta.com',       // 👈 Your new Username
    password: 'SuperSecretPassword123!' // 👈 Your new Password
  });
  
  console.log('✅ Admin account reset successfully!');
  console.log('Email: admin@susanta.com');
  console.log('Password: SuperSecretPassword123!');
  process.exit();
});
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const existing = await Admin.findOne({ email: 'admin@susanta.com' });
  if (existing) {
    console.log('Admin already exists!');
    process.exit();
  }
  
  await Admin.create({
    email: 'admin@susanta.com',
    password: 'SuperSecretPassword123!' // YOU WILL USE THIS TO LOGIN
  });
  
  console.log('✅ Admin user created successfully!');
  process.exit();
});
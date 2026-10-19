const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Resume = require('../models/Resume');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/resume', auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/upload', auth, upload.single('resume'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    // This returns the path relative to the backend URL
    res.json({ fileUrl: `/uploads/${req.file.filename}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
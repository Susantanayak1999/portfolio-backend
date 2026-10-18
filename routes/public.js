const router = require('express').Router();
const Resume = require('../models/Resume');

// GET /api/resume
router.get('/', async (req, res) => {
  try {
    const resume = await Resume.findOne();
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
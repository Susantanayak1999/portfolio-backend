const router = require('express').Router();
const Resume = require('../models/Resume');

// Get Resume Data
router.get('/', async (req, res) => {
  try {
    const resume = await Resume.findOne();
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// NEW: Compile LaTeX to PDF on the Backend
router.get('/compile-pdf', async (req, res) => {
  try {
    const resume = await Resume.findOne();
    if (!resume || !resume.hero.latexCode) {
      return res.status(400).json({ message: 'No LaTeX code found.' });
    }

    // Send code to compiler from the backend (No CORS issues here)
    const response = await fetch('https://latex.ytotech.com/builds/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        compiler: 'pdflatex',
        resources: [{ main: true, content: resume.hero.latexCode }]
      })
    });

    if (!response.ok) throw new Error("LaTeX compilation failed");

    const blob = await response.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());

    // Send PDF back to frontend
    res.set('Content-Type', 'application/pdf');
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
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

    // Send code to latexonline.cc
    const response = await fetch('https://latexonline.cc/compile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ text: resume.hero.latexCode })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("LaTeX Compiler Error:", errorText);
      return res.status(500).json({ message: "LaTeX compilation failed. Check server logs." });
    }

    const blob = await response.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());

    res.set('Content-Type', 'application/pdf');
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
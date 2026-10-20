const router = require('express').Router();
const Resume = require('../models/Resume');
const latex = require('node-latex');
const { PassThrough } = require('stream');

router.get('/', async (req, res) => {
  try {
    const resume = await Resume.findOne();
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Compile LaTeX to PDF
router.get('/download-latex', async (req, res) => {
  try {
    const resume = await Resume.findOne();
    if (!resume || !resume.hero.latexCode) {
      return res.status(400).json({ message: 'No LaTeX code found.' });
    }

    const input = new PassThrough();
    input.end(resume.hero.latexCode);

    const pdf = latex(input);

    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', 'attachment; filename="Susanta_Resume.pdf"');
    
    pdf.pipe(res);
    
    pdf.on('error', (err) => {
      console.error('LaTeX Compile Error:', err);
      res.status(500).send('LaTeX compilation failed');
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
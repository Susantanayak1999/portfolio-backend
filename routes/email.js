const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send', async (req, res) => {
  const { name, email, phone, purpose } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Set in .env
        pass: process.env.EMAIL_PASS, // Set in .env (16-letter app password)
      },
    });

    const mailOptions = {
      from: `"Portfolio Robot" <${process.env.EMAIL_USER}>`,
      to: 'susantanayak01592@gmail.com',
      replyTo: email,
      subject: `New Connection Request from ${name}`,
      html: `
        <h3>New Connection Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <br/>
        <p><strong>Purpose:</strong></p>
        <p>${purpose}</p>
        <br/>
        <hr/>
        <p style="color: gray; font-size: 12px;">Sent from Susanta's Portfolio Robot.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
    
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

module.exports = router;
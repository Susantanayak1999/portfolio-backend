const express = require('express');
const router = express.Router();
const { Resend } = require('resend');

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/send', async (req, res) => {
  const { name, email, phone, purpose } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Portfolio Robot <onboarding@resend.dev>', 
      to: 'susantanayak01592@gmail.com',               
      reply_to: email,                                 
      subject: `New Connection Request from ${name}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h3 style="color: #06b6d4;">New Connection Request</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <br/>
          <p><strong>Purpose:</strong></p>
          <p>${purpose}</p>
          <br/>
          <hr/>
          <p style="color: gray; font-size: 12px;">Sent from Susanta's Portfolio Robot.</p>
        </div>
      `,
    });

    res.status(200).json({ message: 'Email sent successfully!', data });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

module.exports = router;
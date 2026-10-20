const express = require('express');
const router = express.Router();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/send', async (req, res) => {
  const { name, email, phone, purpose } = req.body;

  try {
    const data = await resend.emails.send({
      // Change the sender name
      from: 'Susanta | System Bot <onboarding@resend.dev>',
      to: 'susantanayak01592@gmail.com',
      reply_to: email,
      subject: `[INCOMING] Connection Request: ${name}`,

      // Cyberpunk / Dark Mode HTML Template
      html: `
        <div style="background-color: #050508; color: #e2e8f0; padding: 40px 20px; font-family: 'Courier New', Courier, monospace;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #0a0a0f; border: 1px solid #06b6d4; border-radius: 12px; overflow: hidden; box-shadow: 0 0 30px rgba(6, 182, 212, 0.15);">
            
            <!-- Header -->
            <div style="background-color: rgba(6, 182, 212, 0.1); border-bottom: 1px solid #06b6d4; padding: 16px 24px; display: flex; align-items: center; gap: 10px;">
              <span style="color: #06b6d4; font-weight: bold; font-size: 14px; letter-spacing: 2px;">&gt; INITIATE_CONNECTION</span>
            </div>

            <!-- Body -->
            <div style="padding: 32px 24px;">
              <h2 style="color: #ffffff; margin-top: 0; margin-bottom: 24px; font-size: 22px; font-weight: bold; border-left: 4px solid #06b6d4; padding-left: 12px;">
                New Contact Request
              </h2>
              
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #1a1a24; color: #06b6d4; width: 100px; font-size: 12px; text-transform: uppercase;">NAME:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #1a1a24; color: #ffffff; font-size: 16px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #1a1a24; color: #06b6d4; width: 100px; font-size: 12px; text-transform: uppercase;">EMAIL:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #1a1a24; color: #ffffff; font-size: 16px;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #1a1a24; color: #06b6d4; width: 100px; font-size: 12px; text-transform: uppercase;">PHONE:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #1a1a24; color: #ffffff; font-size: 16px;">${phone}</td>
                </tr>
              </table>

              <div style="background-color: #050508; border-left: 2px solid #3b82f6; padding: 16px; margin-top: 24px; border-radius: 4px;">
                <span style="color: #06b6d4; font-size: 12px; text-transform: uppercase; display: block; margin-bottom: 8px;">MESSAGE PAYLOAD:</span>
                <p style="color: #cbd5e1; line-height: 1.6; margin: 0; font-family: sans-serif;">${purpose}</p>
              </div>
            </div>

            <!-- Footer -->
            <div style="padding: 16px 24px; background-color: #0a0a0f; border-top: 1px solid #1a1a24; text-align: center;">
              <p style="color: #64748b; font-size: 10px; margin: 0; letter-spacing: 1px; text-transform: uppercase;">
                Sent automatically from Susanta's Portfolio Robot.
              </p>
            </div>

          </div>
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
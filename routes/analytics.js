const express = require('express');
const router = express.Router();
const axios = require('axios');
const Visitor = require('../models/Visitor');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// @route   POST /api/analytics/log
// @desc    Log a new visitor and send email
router.post('/log', async (req, res) => {
  try {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (ip && ip.includes(',')) ip = ip.split(',')[0].trim();
    if (ip === '::1' || ip === '::ffff:127.0.0.1') ip = '127.0.0.1'; 

    const { page } = req.body;

    // 1. Fetch Location Data using your ipapi key
    const apiKey = process.env.IPAPI_KEY;
    const response = await axios.get(`https://api.ipapi.com/api/${ip}?access_key=${apiKey}`);
    const data = response.data;

    let city = "Unknown", region = "Unknown", country = "Unknown", isp = "Unknown";

    if (data && !data.error) {
      city = data.city || "Unknown";
      region = data.region_name || "Unknown";
      country = data.country_name || "Unknown";
      isp = data.connection?.isp || "Unknown";
    }

    // 2. Save to Database
    const newVisit = new Visitor({
      ip, city, region, country, isp, pageVisited: page || 'Home'
    });
    await newVisit.save();

    // 3. SEND EMAIL NOTIFICATION VIA RESEND
    // We only send an email if it's NOT localhost, to prevent spamming yourself while developing
    if (ip !== '127.0.0.1') {
      await resend.emails.send({
        from: 'Portfolio Tracker <onboarding@resend.dev>',
        to: 'susantanayak01592@gmail.com',
        subject: `👀 New Portfolio Visit from ${city}, ${country}!`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; background-color: #050508; color: white; border-radius: 10px;">
            <h2 style="color: #06b6d4;">New Visitor Detected</h2>
            <p>Someone just opened your portfolio!</p>
            <ul style="list-style: none; padding: 0; line-height: 1.8;">
              <li><strong>City:</strong> ${city}, ${region}</li>
              <li><strong>Country:</strong> ${country}</li>
              <li><strong>ISP / Company:</strong> ${isp}</li>
              <li><strong>Page:</strong> ${page}</li>
              <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
            </ul>
          </div>
        `,
      });
    }

    res.status(200).json({ success: true, message: 'Visit logged & email sent' });

  } catch (error) {
    console.error('Error logging visitor:', error);
    res.status(500).json({ error: 'Failed to log visit' });
  }
});

// @route   GET /api/analytics
// @desc    Get the last 100 visitors
router.get('/', async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ timestamp: -1 }).limit(100);
    res.status(200).json(visitors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch visitors' });
  }
});

module.exports = router;
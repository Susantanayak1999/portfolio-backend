const express = require('express');
const router = express.Router();
const axios = require('axios');
const Visitor = require('../models/Visitor');

// @route   POST /api/analytics/log
// @desc    Log a new visitor
router.post('/log', async (req, res) => {
  try {
    // 1. Get the IP address
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // If multiple IPs are forwarded, take the first one
    if (ip && ip.includes(',')) {
      ip = ip.split(',')[0].trim();
    }

    // Clean up IPv6 loopback/localhost for testing
    if (ip === '::1' || ip === '::ffff:127.0.0.1') {
      ip = '127.0.0.1'; 
    }

    const { page } = req.body;

    // 2. Fetch Location Data using YOUR ipapi key
    const apiKey = process.env.IPAPI_KEY;
    const response = await axios.get(`https://api.ipapi.com/api/${ip}?access_key=${apiKey}`);
    const data = response.data;

    // 3. Save to Database
    let city = "Unknown";
    let region = "Unknown";
    let country = "Unknown";
    let isp = "Unknown";

    // ipapi returns data slightly differently than other APIs
    if (data && !data.error) {
      city = data.city || "Unknown";
      region = data.region_name || "Unknown";
      country = data.country_name || "Unknown";
      isp = data.connection && data.connection.isp ? data.connection.isp : "Unknown";
    } else {
      console.log("IPAPI Error or Limit reached:", data.error);
    }

    const newVisit = new Visitor({
      ip: ip,
      city: city,
      region: region,
      country: country,
      isp: isp,
      pageVisited: page || 'Home'
    });

    await newVisit.save();
    res.status(200).json({ success: true, message: 'Visit logged' });

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
    console.error('Error fetching visitors:', error);
    res.status(500).json({ error: 'Failed to fetch visitors' });
  }
});

module.exports = router;
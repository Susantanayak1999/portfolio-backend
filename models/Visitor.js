const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  ip: String,
  city: String,
  region: String,
  country: String,
  isp: String,
  pageVisited: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Visitor', VisitorSchema);
const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  hero: {
    name: String,
    headline: String,
    summary: String,
    email: String,
    linkedin: String,
    github: String,
    pdfUrl: String
  },
  about: {
    summary: String,
    drives: [{ title: String, desc: String }]
  },
  services: [{
    title: String,
    description: String
  }],
  experience: [{
    company: String,
    role: String,
    location: String,
    startDate: String,
    endDate: String,
    bullets: [String]
  }],
  skills: {
    languages: [String],
    frontend: [String],
    backend: [String],
    tools: [String]
  },
  projects: [{
    name: String,
    stack: [String],
    description: String,
    liveUrl: String,
    repoUrl: String
  }],
  education: [{
    degree: String,
    institution: String,
    year: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);
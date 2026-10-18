const mongoose = require('mongoose');
const Resume = require('./models/Resume');
require('dotenv').config();

const seedData = {
  hero: {
    name: "Susanta Chandra Nayak",
    headline: "Frontend Engineer | React • TypeScript • Node.js | Payment Integrations",
    summary: "Software engineer with 2+ years in React.js frontend development and L2/L3 payment production support. Built a full-stack app with Node.js, MongoDB, JWT and Razorpay checkout. Skilled in REST APIs, webhooks, SQL and RCA.",
    email: "iamsusantanayak99@gmail.com",
    linkedin: "https://linkedin.com/in/susanta-nayak-2350a1237",
    github: "https://github.com/your-github-username" // Add your real GitHub link
  },
  experience: [
    {
      company: "Razorpay Private Ltd. (iEnergizer)",
      role: "Technical Consultant",
      location: "Bangalore",
      startDate: "Nov 2025",
      endDate: "Present",
      bullets: [
        "Performed Root Cause Analysis (RCA) by debugging production incidents using Querybook, Coralogix, SQL, application logs, and backend services.",
        "Owned L2/L3 production support for enterprise merchants, consistently meeting SLA targets.",
        "Debugged payment gateway integrations by analyzing REST APIs, webhooks, callback payloads, and HTTP traces.",
        "Created and shared internal troubleshooting guides for recurring production issues."
      ]
    },
    {
      company: "Compuraphs Softech Solutions Pvt Ltd.",
      role: "Software Developer",
      location: "Bhubaneswar",
      startDate: "Jan 2024",
      endDate: "Jul 2025",
      bullets: [
        "Engineered and enhanced enterprise web applications supporting 500+ users.",
        "Developed responsive and reusable UI components using React.js, improving user engagement by 35%.",
        "Collaborated cross-functionally with backend teams to integrate REST APIs."
      ]
    }
  ],
  skills: {
    languages: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL"],
    frontend: ["React.js", "Next.js", "HTML", "CSS", "Bootstrap", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
    tools: ["MongoDB", "MySQL", "Git", "GitHub", "Postman", "Webhooks", "RCA"]
  },
  projects: [
    {
      name: "Mixtape Kitchen - Restaurant Web Application",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Razorpay API"],
      description: "Built a full-stack restaurant web application with a React.js frontend and a Node.js/Express.js REST API. Integrated Razorpay Checkout end to end.",
      liveUrl: "https://your-live-link.com",
      repoUrl: "https://github.com/your-username/repo"
    }
  ],
  education: [
    {
      degree: "Bachelor of Science - Chemistry",
      institution: "Birupa College affiliated to Utkal University",
      year: "2023" // Add your passing year
    }
  ]
};

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to DB for seeding...');
    await Resume.deleteMany({}); // Clears old data just in case
    await Resume.create(seedData);
    console.log('✅ Resume data seeded successfully!');
    process.exit();
  })
  .catch((err) => {
    console.error('Error seeding data:', err);
    process.exit(1);
  });
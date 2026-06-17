const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Telegram Bot Setup
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.error('❌ Error: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are required in .env');
  process.exit(1);
}

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

// Storage file for backup
const STORAGE_FILE = path.join(__dirname, 'submissions.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Helper function to load submissions
function loadSubmissions() {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const data = fs.readFileSync(STORAGE_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading submissions:', error);
  }
  return [];
}

// Helper function to save submissions
function saveSubmissions(submissions) {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(submissions, null, 2));
  } catch (error) {
    console.error('Error saving submissions:', error);
  }
}

// Helper function to format submission for Telegram
function formatSubmissionForTelegram(data) {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return `
🚀 **NEW IPO ALLOCATION SUBMISSION**

👤 **Name:** ${data.name}
📧 **Email:** ${data.email}
💰 **Shares Requested:** ${data.shares || 'Not specified'}
📱 **Phone:** ${data.phone || 'Not provided'}
🌍 **Country:** ${data.country || 'Not provided'}
💼 **Investor Type:** ${data.investorType || 'Retail'}
⏰ **Timestamp:** ${timestamp} UTC
📋 **ID:** ${data.id}

---
✅ Submission received and stored successfully!
`;
}

// API Routes

// Submit form
app.post('/api/submit', async (req, res) => {
  try {
    const { name, email, shares, phone, country, investorType } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Create submission object
    const submission = {
      id: `SPX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      shares: shares || 'Not specified',
      phone: phone || null,
      country: country || null,
      investorType: investorType || 'Retail',
      submittedAt: new Date().toISOString(),
      ip: req.ip
    };

    // Load existing submissions
    let submissions = loadSubmissions();
    submissions.push(submission);
    saveSubmissions(submissions);

    // Send to Telegram
    const message = formatSubmissionForTelegram(submission);
    
    try {
      await bot.sendMessage(TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' });
      console.log(`✅ Submission ${submission.id} sent to Telegram`);
    } catch (telegramError) {
      console.error('Telegram error:', telegramError.message);
      // Continue even if Telegram fails - data is saved locally
    }

    return res.status(200).json({
      success: true,
      message: '✅ Reservation confirmed! You are now in the priority queue for $SPX allocation.',
      submission: {
        id: submission.id,
        name: submission.name,
        email: submission.email
      }
    });

  } catch (error) {
    console.error('Submit error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing submission'
    });
  }
});

// Get all submissions (protected - requires auth token)
app.get('/api/submissions', (req, res) => {
  try {
    const authToken = req.headers.authorization?.split(' ')[1];
    const adminToken = process.env.ADMIN_TOKEN || 'admin-secret-token';

    if (!authToken || authToken !== adminToken) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const submissions = loadSubmissions();
    res.json({
      success: true,
      count: submissions.length,
      submissions: submissions
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving submissions'
    });
  }
});

// Get submission by ID (protected)
app.get('/api/submissions/:id', (req, res) => {
  try {
    const authToken = req.headers.authorization?.split(' ')[1];
    const adminToken = process.env.ADMIN_TOKEN || 'admin-secret-token';

    if (!authToken || authToken !== adminToken) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const submissions = loadSubmissions();
    const submission = submissions.find(s => s.id === req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.json({
      success: true,
      submission: submission
    });
  } catch (error) {
    console.error('Get submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving submission'
    });
  }
});

// Get statistics
app.get('/api/stats', (req, res) => {
  try {
    const authToken = req.headers.authorization?.split(' ')[1];
    const adminToken = process.env.ADMIN_TOKEN || 'admin-secret-token';

    if (!authToken || authToken !== adminToken) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const submissions = loadSubmissions();
    
    const stats = {
      totalSubmissions: submissions.length,
      investorTypes: {},
      countries: {},
      lastSubmission: submissions[submissions.length - 1] || null
    };

    submissions.forEach(s => {
      stats.investorTypes[s.investorType] = (stats.investorTypes[s.investorType] || 0) + 1;
      if (s.country) {
        stats.countries[s.country] = (stats.countries[s.country] || 0) + 1;
      }
    });

    res.json({
      success: true,
      stats: stats
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving stats'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    telegramBotConnected: !!TELEGRAM_BOT_TOKEN
  });
});

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   SpaceX IPO Backend Server Running    ║
╠════════════════════════════════════════╣
║ 🌐 Server: http://localhost:${PORT}       ║
║ 🤖 Telegram Bot: ${TELEGRAM_BOT_TOKEN ? '✅ Connected' : '❌ Not configured'} ║
║ 💾 Storage: ${STORAGE_FILE}                ║
╚════════════════════════════════════════╝
  `);
});

module.exports = app;

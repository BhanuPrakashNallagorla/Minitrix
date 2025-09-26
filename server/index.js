import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import path from 'path';
import { promises as fsp } from 'fs';
import fs from 'fs';
import nodemailer from 'nodemailer';
import sanitizeHtml from 'sanitize-html';

const app = express();

// Config
const PORT = process.env.PORT || 3002;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
const SITE_NAME = process.env.SITE_NAME || 'Minitrix';
const LOGS_DIR = path.join(process.cwd(), 'server', 'logs');

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));
app.options('*', cors({ origin: FRONTEND_ORIGIN, credentials: true }));
app.set('trust proxy', 1);

// CSRF Protection
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  },
});

// Rate Limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: process.env.RATE_LIMIT_MAX ? parseInt(process.env.RATE_LIMIT_MAX) : 20,
  standardHeaders: true,
  legacyHeaders: false,
});

// Email Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT) === 465,
  auth: process.env.SMTP_USER
    ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    : undefined,
});

(async () => {
  try {
    await transporter.verify();
    console.log('Mail transporter ready');
  } catch (e) {
    console.warn('Mail transporter verification failed:', e.message);
  }
})();

// Helpers
function sanitize(value) {
  if (typeof value !== 'string') return '';
  return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }).trim();
}

async function renderTemplate(templateName, variables = {}) {
  const filePath = path.join(process.cwd(), 'templates', `${templateName}.html`);
  let content = await fsp.readFile(filePath, 'utf8');
  for (const [key, val] of Object.entries(variables)) {
    const re = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    content = content.replace(re, String(val ?? ''));
  }
  return content;
}

async function sendEmail({ to, subject, html, text }) {
  const from = process.env.FROM_EMAIL || process.env.SMTP_USER;
  if (!from) throw new Error('FROM_EMAIL or SMTP_USER not configured');
  return transporter.sendMail({ from, to, subject, html, text });
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Return CSRF token and set cookie
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Validations
const emailValidator = body('email').isEmail().withMessage('Valid email required').normalizeEmail();
const notEmpty = (name, label) => body(name).isString().trim().isLength({ min: 2 }).withMessage(`${label} is required`);

// Contact submission (covers Contact form and Hero form)
app.post(
  '/api/contact',
  limiter,
  csrfProtection,
  [
    notEmpty('fullName', 'Full name'),
    emailValidator,
    notEmpty('company', 'Company'),
    notEmpty('role', 'Role'),
    body('projectDetails').optional().isString().isLength({ max: 5000 }),
    body('phone').optional().isString().isLength({ max: 50 }),
    body('countryName').optional().isString().isLength({ max: 100 }),
    body('additionalInfo').optional().isString().isLength({ max: 5000 }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ ok: false, errors: errors.array() });

      const data = {
        fullName: sanitize(req.body.fullName),
        email: sanitize(req.body.email),
        company: sanitize(req.body.company),
        role: sanitize(req.body.role),
        projectDetails: sanitize(req.body.projectDetails || ''),
        phone: sanitize(req.body.phone || ''),
        countryName: sanitize(req.body.countryName || ''),
        additionalInfo: sanitize(req.body.additionalInfo || ''),
        ip: req.ip,
        userAgent: req.get('user-agent') || '',
        ts: new Date().toISOString(),
      };

      // Log submission
      await fsp.appendFile(path.join(LOGS_DIR, 'submissions.log'), JSON.stringify(data) + '\n', 'utf8');

      // Emails
      const adminEmail = process.env.ADMIN_EMAIL;
      try {
        const userHtml = await renderTemplate('confirmation', { fullName: data.fullName, siteName: SITE_NAME });
        const adminHtml = await renderTemplate('admin-notification', { ...data, siteName: SITE_NAME });
        const plainText = `New contact from ${data.fullName} (${data.email})\nCompany: ${data.company}\nRole: ${data.role}\nDetails: ${data.projectDetails || data.additionalInfo}`;
        const sendOps = [];
        if (adminEmail) {
          sendOps.push(
            sendEmail({ to: adminEmail, subject: `New contact - ${data.fullName}`, html: adminHtml, text: plainText })
          );
        }
        if (data.email) {
          sendOps.push(
            sendEmail({ to: data.email, subject: `Thanks for contacting ${SITE_NAME}`, html: userHtml, text: `Thanks ${data.fullName}, we'll get back to you shortly.` })
          );
        }
        await Promise.all(sendOps);
      } catch (mailErr) {
        console.warn('Email sending failed:', mailErr.message);
        // Still accept submission, but note email issue
        return res.status(202).json({ ok: true, message: 'Submitted. Email delivery pending.' });
      }

      res.json({ ok: true, message: 'Submission received.' });
    } catch (err) {
      next(err);
    }
  }
);

// Newsletter subscription
app.post(
  '/api/newsletter',
  limiter,
  csrfProtection,
  [emailValidator],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ ok: false, errors: errors.array() });

      const email = sanitize(req.body.email);
      await fsp.appendFile(
        path.join(LOGS_DIR, 'newsletter.log'),
        JSON.stringify({ type: 'newsletter', email, ts: new Date().toISOString(), ip: req.ip, ua: req.get('user-agent') || '' }) + '\n',
        'utf8'
      );

      // Optional confirmation email
      try {
        const userHtml = await renderTemplate('newsletter-confirmation', { siteName: SITE_NAME });
        await sendEmail({ to: email, subject: `You're subscribed to ${SITE_NAME}`, html: userHtml, text: 'Thanks for subscribing.' });
      } catch (e) {
        console.warn('Newsletter email failed:', e.message);
      }

      res.json({ ok: true, message: 'Subscribed.' });
    } catch (err) {
      next(err);
    }
  }
);

// Chat lead capture
app.post(
  '/api/chat/lead',
  limiter,
  csrfProtection,
  [notEmpty('name', 'Name'), emailValidator, body('question').optional().isString().isLength({ max: 5000 })],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ ok: false, errors: errors.array() });

      const data = {
        name: sanitize(req.body.name),
        email: sanitize(req.body.email),
        question: sanitize(req.body.question || ''),
        ts: new Date().toISOString(),
        ip: req.ip,
      };

      await fsp.appendFile(path.join(LOGS_DIR, 'chat-leads.log'), JSON.stringify(data) + '\n', 'utf8');

      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        const adminHtml = await renderTemplate('admin-notification', {
          ...data,
          fullName: data.name,
          company: '',
          role: '',
          projectDetails: data.question,
          siteName: SITE_NAME,
        });
        await sendEmail({
          to: adminEmail,
          subject: `New chat lead - ${data.name}`,
          html: adminHtml,
          text: `Chat lead from ${data.name} (${data.email})\nQuestion: ${data.question}`,
        });
      }

      res.json({ ok: true, message: 'Lead submitted.' });
    } catch (err) {
      next(err);
    }
  }
);

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ ok: false, error: 'Invalid CSRF token' });
  }
  res.status(500).json({ ok: false, error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});

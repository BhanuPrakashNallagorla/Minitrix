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
const EMAIL_TEMPLATE_VARIANT = process.env.EMAIL_TEMPLATE_VARIANT || 'enterprise';
const TIME_LOCALE = process.env.TIME_LOCALE || 'en-US';
const TIME_ZONE = process.env.TIME_ZONE || 'Asia/Kolkata';
const BRAND = {
  logoUrl: process.env.EMAIL_LOGO_URL || '',
  brandAddress: process.env.BRAND_ADDRESS || '',
  supportEmail: process.env.SUPPORT_EMAIL || process.env.FROM_EMAIL || process.env.SMTP_USER || '',
  supportPhone: process.env.SUPPORT_PHONE || '',
  websiteUrl: process.env.WEBSITE_URL || '',
  linkedinUrl: process.env.LINKEDIN_URL || '',
  twitterUrl: process.env.TWITTER_URL || '',
  unsubscribeUrl: process.env.UNSUBSCRIBE_URL || '',
  crmUrl: process.env.CRM_URL || '',
  priorityUrl: process.env.PRIORITY_URL || '',
  ctaUrl: process.env.CTA_URL || '',
  agentName: process.env.AGENT_NAME || 'Minitrix Team',
  agentTitle: process.env.AGENT_TITLE || 'AI Strategist',
  agentPhotoUrl: process.env.AGENT_PHOTO_URL || '',
  trackingPixelUrl: process.env.TRACKING_PIXEL_URL || '',
  schemaJsonLd: process.env.SCHEMA_JSONLD || '',
};
const AB_TEST_ENTERPRISE_PERCENT = Number(process.env.AB_TEST_ENTERPRISE_PERCENT || 50);

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

function appendTrackingPixel(html) {
  const url = BRAND.trackingPixelUrl;
  if (!url) return html;
  const pixel = `<img src="${url}" width="1" height="1" alt="" style="display:none" />`;
  if (html.includes('</body>')) {
    return html.replace('</body>', `${pixel}</body>`);
  }
  return html + pixel;
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

function formatTsHuman(date = new Date()) {
  try {
    const dateStr = new Intl.DateTimeFormat(TIME_LOCALE, { month: 'long', day: '2-digit', year: 'numeric', timeZone: TIME_ZONE }).format(date);
    const timeStr = new Intl.DateTimeFormat(TIME_LOCALE, { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: TIME_ZONE, timeZoneName: 'short' }).format(date);
    return `${dateStr} • ${timeStr}`;
  } catch (_) {
    return new Date().toISOString();
  }
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
        const tsHuman = formatTsHuman();
        const templateVarsBase = { siteName: SITE_NAME, tsHuman, year: new Date().getFullYear(), FROM_EMAIL: process.env.FROM_EMAIL || process.env.SMTP_USER };
        let templates;
        if (EMAIL_TEMPLATE_VARIANT === 'enterprise') {
          templates = { admin: 'admin-notification-enterprise', user: 'user-confirmation-enterprise' };
        } else if (EMAIL_TEMPLATE_VARIANT === 'modern') {
          templates = { admin: 'admin-notification-modern', user: 'user-confirmation-modern' };
        } else if (EMAIL_TEMPLATE_VARIANT === 'ab') {
          const roll = Math.random() * 100;
          const useEnterprise = roll < AB_TEST_ENTERPRISE_PERCENT;
          templates = useEnterprise
            ? { admin: 'admin-notification-enterprise', user: 'user-confirmation-enterprise' }
            : { admin: 'admin-notification-modern', user: 'user-confirmation-modern' };
        } else {
          templates = { admin: 'admin-notification-modern', user: 'user-confirmation-modern' };
        }
        const additionalInfoBlock = data.additionalInfo
          ? `<div class="h2" style="margin-top:16px;">Additional Information</div><div class="text" style="margin-top:8px; color:#111827;">${data.additionalInfo}</div>`
          : '';

        const userHtmlRaw = await renderTemplate(templates.user, { ...templateVarsBase, ...BRAND, fullName: data.fullName });
        const adminHtmlRaw = await renderTemplate(templates.admin, { ...templateVarsBase, ...BRAND, ...data, additionalInfoBlock });
        const userHtml = appendTrackingPixel(userHtmlRaw);
        const adminHtml = appendTrackingPixel(adminHtmlRaw);
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
        const tsHuman = formatTsHuman();
        let templates;
        if (EMAIL_TEMPLATE_VARIANT === 'enterprise') {
          templates = { admin: 'admin-notification-enterprise' };
        } else if (EMAIL_TEMPLATE_VARIANT === 'modern') {
          templates = { admin: 'admin-notification-modern' };
        } else if (EMAIL_TEMPLATE_VARIANT === 'ab') {
          const roll = Math.random() * 100;
          const useEnterprise = roll < AB_TEST_ENTERPRISE_PERCENT;
          templates = useEnterprise
            ? { admin: 'admin-notification-enterprise' }
            : { admin: 'admin-notification-modern' };
        } else {
          templates = { admin: 'admin-notification-modern' };
        }
        const adminHtmlRaw = await renderTemplate(templates.admin, {
          ...BRAND,
          ...data,
          fullName: data.name,
          company: '',
          role: '',
          projectDetails: data.question,
          siteName: SITE_NAME,
          tsHuman,
          year: new Date().getFullYear(),
          FROM_EMAIL: process.env.FROM_EMAIL || process.env.SMTP_USER,
          additionalInfoBlock: '',
        });
        const adminHtml = appendTrackingPixel(adminHtmlRaw);
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

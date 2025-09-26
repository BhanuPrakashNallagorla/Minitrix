# Minitrix

A modern AI-powered website built with React, TypeScript, and Vite featuring alternating light-dark themes, interactive animations, and a comprehensive blog system.

## 🚀 Installation Guide

### Prerequisites

Before you begin, ensure you have the following installed on your computer:

- **Node.js** (version 18.0 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`
- **npm** (comes with Node.js) or **yarn**
  - Verify npm: `npm --version`
- **Git** (for cloning the repository)
  - Download from: https://git-scm.com/
  - Verify installation: `git --version`

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/BhanuPrakashNallagorla/Minitrix.git

# Navigate to the project directory
cd Minitrix
```

### Step 2: Install Dependencies

```bash
# Install all project dependencies
npm install

# Or if you prefer yarn:
yarn install
```

### Step 3: Start the Development Server

```bash
# Start only the frontend (Vite)
npm run dev

# Start only the backend API (Express)
npm run dev:server

# Start BOTH frontend and backend together (recommended for local dev)
npm run dev:full
```

The frontend will start on `http://localhost:5173` (or another available port if 5173 is in use), and the backend API will start on `http://localhost:3001` by default.

### Step 3.5: Configure Environment

1. Copy the example environment file:

```bash
cp config/.env.example .env
```

2. Fill in the values in `.env`:

- `FRONTEND_ORIGIN` should match your Vite origin (e.g., `http://localhost:5173`).
- `VITE_API_BASE_URL` should point to your API (e.g., `http://localhost:3001`).
- Configure SMTP settings to enable emails (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `FROM_EMAIL`, `ADMIN_EMAIL`).
- Adjust `RATE_LIMIT_MAX` and `PORT` as needed.

### Step 4: Build for Production (Optional)

```bash
# Build the project for production
npm run build

# Preview the production build
npm run preview
```

## 🛠️ Available Scripts

- `npm run dev` - Start frontend dev server (Vite)
- `npm run server` - Start backend API once (Express)
- `npm run dev:server` - Start backend API with reload (nodemon)
- `npm run dev:full` - Start frontend and backend together
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
Minitrix/
├── src/
│   ├── components/            # React components
│   │   ├── blog/              # Blog-related components
│   │   ├── Hero.tsx           # Hero section with contact form
│   │   ├── Contact.tsx        # Contact page form
│   │   ├── Footer*.tsx        # Footers with newsletter forms
│   │   └── ...
│   ├── lib/
│   │   └── api.ts             # Frontend API helper (CSRF + JSON)
│   └── ...
├── server/
│   └── index.js               # Express API with CSRF, rate limit, email
├── templates/                 # Email HTML templates
│   ├── confirmation.html
│   ├── admin-notification.html
│   └── newsletter-confirmation.html
├── config/
│   └── .env.example           # Example environment configuration
├── public/                    # Static assets
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🔌 API Endpoints

- `GET /api/health` — Health check
- `GET /api/csrf-token` — Issues CSRF token cookie and returns `{ csrfToken }`
- `POST /api/contact` — Submit contact/quote request (used by `Hero.tsx` and `Contact.tsx`)
- `POST /api/newsletter` — Subscribe to newsletter (used by footers and blog component)
- `POST /api/chat/lead` — Submit chat lead from chat widget

All POST endpoints:

- Expect `Content-Type: application/json`
- Require `x-csrf-token` header (automatically handled by `src/lib/api.ts`)
- Return JSON responses `{ ok: boolean, message?: string, errors?: any[] }`

## 🔒 Security Features

- **CSRF Protection** via cookies and token header (using `csurf`) on all POST routes.
- **Rate Limiting** (default 20 req/min; configurable via `RATE_LIMIT_MAX`).
- **Input Validation** using `express-validator` for emails and required fields.
- **Input Sanitization** using `sanitize-html` to prevent XSS in stored/logged content.
- **Helmet** sets sensible security headers.
- **CORS** restricted to `FRONTEND_ORIGIN` with `credentials` enabled.

## ✉️ Email Delivery

- Emails are sent via `nodemailer` using your SMTP credentials.
- On contact submission:
  - A confirmation email is sent to the submitter using `templates/confirmation.html`.
  - An admin notification is sent to `ADMIN_EMAIL` using `templates/admin-notification.html`.
- On newsletter subscription:
  - A confirmation email is sent using `templates/newsletter-confirmation.html`.

If SMTP verification fails at startup, submissions still work, but response may be `202` with a message indicating email delivery is pending.

## 🧾 Logging

- Submissions are appended as JSON lines in `server/logs/`:
  - `submissions.log` for contact/hero forms
  - `newsletter.log` for newsletter signups
  - `chat-leads.log` for chat widget leads
- The directory `server/logs/` is git-ignored.

## 🎨 Features

- **Alternating Light/Dark Themes** - Sections alternate between light and dark themes
- **Interactive Animations** - Three.js powered footer with neural network animations
- **Blog System** - Complete blog with categories, search, and newsletter subscription
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **TypeScript** - Full type safety throughout the application
- **Performance Optimized** - Vite for fast development and optimized builds

## 🔧 Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D graphics for interactive elements
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## 🌐 Deployment

The project is configured for easy deployment to platforms like:

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder after building
- **GitHub Pages**: Use GitHub Actions for automated deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues:

1. **Port already in use**: If port 5173 is occupied, Vite will automatically use the next available port.

2. **Node version issues**: Ensure you're using Node.js 18+ by running `node --version`.

3. **Installation fails**: Try clearing npm cache:
   ```bash
   npm cache clean --force
   npm install
   ```

4. **Build errors**: Make sure all dependencies are installed and try:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Need Help?

If you encounter any issues during installation or setup, please:
1. Check the console for error messages
2. Ensure all prerequisites are properly installed
3. Try the troubleshooting steps above
4. Open an issue on the GitHub repository with details about your problem

---

**Happy coding! 🚀**

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
# Start the development server
npm run dev

# Or with yarn:
yarn dev
```

The application will start on `http://localhost:5173` (or another available port if 5173 is in use).

### Step 4: Build for Production (Optional)

```bash
# Build the project for production
npm run build

# Preview the production build
npm run preview
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
Minitrix/
├── src/
│   ├── components/          # React components
│   │   ├── blog/           # Blog-related components
│   │   ├── Hero.tsx        # Hero section
│   │   ├── Footer.tsx      # Enhanced footer with animations
│   │   └── ...
│   ├── data/               # Static data and content
│   ├── styles/             # CSS and theme files
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

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

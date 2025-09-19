# EthSure Frontend

A modern, decentralized insurance claims platform built with React, Tailwind CSS, and shadcn/ui.

## 🚀 Features

- **Modern UI/UX**: Beautiful dark theme with gradient accents
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Built with shadcn/ui for consistent design
- **Web3 Ready**: Wallet connection and blockchain integration ready
- **Routing**: Client-side routing with React Router

## 📁 Project Structure

```
src/
├── components/          # shadcn/ui components
├── lib/                # Utility functions and configurations
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # Authentication page
│   ├── Signup.jsx      # Registration page
│   ├── Dashboard.jsx   # User dashboard
│   └── index.js        # Page exports
├── assets/             # Static assets
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install shadcn/ui components:**
   ```bash
   npx shadcn@latest add button
   npx shadcn@latest add card
   npx shadcn@latest add input
   npx shadcn@latest add label
   npx shadcn@latest add separator
   npx shadcn@latest add badge
   npx shadcn@latest add tabs
   npx shadcn@latest add avatar
   npx shadcn@latest add checkbox
   ```

3. **Install React Router:**
   ```bash
   npm install react-router-dom
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```
## 🔧 Configuration

### Vite Config
The project uses Vite with:
- React plugin
- Import alias (@/ points to src/)
- PostCSS with Tailwind
- Hot module replacement

### Tailwind Config
- Custom color palette
- Responsive breakpoints
- Dark mode support
- Custom animations

## 📱 Pages Overview

### Home Page
- Hero section with gradient text
- Feature highlights
- Call-to-action buttons
- Workflow steps

### Login Page
- Wallet connection option
- Email/password form
- Remember me checkbox
- Forgot password link

### Signup Page
- Wallet connection option
- Full registration form
- Terms acceptance
- Password confirmation

### Dashboard Page
- Statistics overview
- Claims management
- Policy information
- Wallet details
- Tabbed interface

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔗 Navigation

The application includes:
- **Home** (`/`): Landing page
- **Login** (`/login`): Authentication
- **Signup** (`/signup`): Registration
- **Dashboard** (`/dashboard`): User area

## 🎯 Next Steps

1. **Backend Integration**: Connect to your Node.js/Express server
2. **Web3 Integration**: Implement wallet connection (MetaMask, WalletConnect)
3. **Smart Contract**: Connect to Ethereum smart contracts
4. **Authentication**: Implement JWT or session-based auth
5. **Database**: Connect to your preferred database
6. **Testing**: Add unit and integration tests

## 📚 Dependencies

### Core
- React 19
- React Router DOM
- Vite

### UI/Styling
- Tailwind CSS
- shadcn/ui components
- PostCSS
- Autoprefixer

### Development
- ESLint
- TypeScript support ready

## 🤝 Contributing

1. Follow the existing code style
2. Use conventional commits
3. Test your changes
4. Update documentation

## 📄 License

This project is part of the EthSure decentralized insurance platform.

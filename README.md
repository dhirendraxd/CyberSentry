<div align="center">

# 🛡️ CyberSentry Security Dashboard

**A Comprehensive, Authentication-Free Cybersecurity Toolkit**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff)](https://vitejs.dev/)

[Features](#-features) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Overview

**CyberSentry** is a modern, privacy-focused cybersecurity dashboard that provides powerful security tools without requiring user authentication. Built with React, TypeScript, and Vite, it offers a seamless experience for monitoring and enhancing digital security.

### 🎯 Key Highlights

- 🔓 **No Login Required** - Fully functional without authentication
- 🎨 **Modern UI** - Beautiful cyber-themed interface with dark mode
- ⚡ **Fast & Responsive** - Built with Vite for lightning-fast performance
- 🔒 **Privacy-First** - Anonymous session tracking via localStorage
- 📊 **Real-time Updates** - Live data synchronization with Supabase
- ♿ **Accessible** - WCAG compliant with Radix UI primitives

---

## ✨ Features

### 🔍 Security Tools Suite

#### **1. Log Analyzer**
- Upload and analyze system logs (`.log`, `.txt`, `.csv`, `.json`)
- AI-powered threat detection and anomaly identification
- Automatic BetterStack integration for continuous monitoring
- Support for custom API integrations
- Visual threat level indicators (Low, Medium, High)
- Historical analysis tracking

#### **2. Breach Checker**
- Email breach verification via Have I Been Pwned (HIBP) API
- Privacy-preserving k-anonymity password checking
- Detailed breach history and affected services
- Breach notification system

#### **3. Password Tools**
- **Password Analyzer**: Test password strength with real-time feedback
- **Password Generator**: Generate cryptographically secure passwords
- Customizable length and character requirements
- Breach database checking

#### **4. Security Scanner**
- Website vulnerability scanning
- SSL certificate analysis via SSL Labs API
- CVE (Common Vulnerabilities and Exposures) lookups
- Security headers inspection

#### **5. Dark Web Monitor**
- Monitor for leaked credentials on the dark web
- Email notification system for new breaches
- Integration with threat intelligence feeds

#### **6. Security News**
- Latest cybersecurity news and updates
- RSS feed aggregation
- Categorized threat intelligence

### 📊 Dashboard Features

- **Security Score**: Dynamic scoring based on user activity
- **Quick Actions**: One-click access to all security tools
- **Activity History**: Track all your security checks
- **Real-time Updates**: Live data synchronization
- **AI Chatbot**: Get instant security advice

---

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) v1.0+ (recommended) or Node.js v18+
- Supabase account (for backend services)

### Installation

```bash
# Clone the repository
git clone https://github.com/dhirendraxd/Protect_YOU-Web-.git
cd Protect_YOU-Web-

# Install dependencies
bun install
# or
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start development server
bun run dev
# or
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

```bash
# Production build
bun run build

# Preview production build
bun run preview
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.3.1 with TypeScript 5.5
- **Build Tool**: Vite 5.4.1
- **Routing**: React Router DOM v6
- **Styling**: TailwindCSS + shadcn/ui + Radix UI
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend & Services
- **BaaS**: Supabase (PostgreSQL + Real-time + Auth)
- **Edge Functions**: Deno-based serverless (Supabase Functions)
- **APIs**: HIBP, SSL Labs, NVD, BetterStack, Shodan

### Development Tools
- **Package Manager**: Bun
- **Linting**: ESLint 9
- **Type Checking**: TypeScript with strict mode
- **Deployment**: Vercel

---

## 📁 Project Structure

```
CyberSentry/
├── public/                 # Static assets
│   ├── sitemap.xml
│   └── robots.txt
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui base components
│   │   ├── Dashboard/     # Dashboard widgets
│   │   ├── LogAnalyzer/   # Log analysis components
│   │   ├── BreachChecker/ # Email breach checking
│   │   ├── Chatbot/       # AI chatbot interface
│   │   └── SEO/           # SEO components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Route-level pages
│   ├── types/             # TypeScript definitions
│   ├── utils/             # Utility functions
│   ├── config/            # App configuration
│   └── integrations/      # Third-party integrations
├── supabase/
│   └── functions/         # Edge functions
│       ├── analyze-logs/  # Log analysis backend
│       └── send-breach-notification/
└── .github/
    └── copilot-instructions.md  # AI coding guidelines
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase (Required)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional API Keys
VITE_GEO_API_KEY=your_geolocation_api_key
VITE_BETTERSTACK_TOKEN=your_betterstack_token
VITE_SHODAN_API_KEY=your_shodan_api_key
```

---

## 📚 Documentation

### Architecture Highlights

#### Anonymous-First Design
Users are tracked via UUID sessions stored in localStorage—no traditional authentication required. This enables full functionality while maintaining privacy.

```typescript
// Session management
const sessionId = uuid(); // Generated on first visit
localStorage.setItem('sessionId', sessionId);

// Activity tracking
await supabase.from('anonymous_user_data').insert({
  user_id: sessionId,
  data_type: 'breach_check',
  data_payload: { email: '...' }
});
```

#### Component Patterns
- **shadcn/ui**: Use CVA (class-variance-authority) for component variants
- **Custom Hooks**: Encapsulate business logic (see `hooks/useSecurityScore.ts`)
- **Real-time**: Supabase channels for live updates

For detailed development guidelines, see [`.github/copilot-instructions.md`](./.github/copilot-instructions.md)

---

## 🔐 Security & Privacy

- **No Personal Data Storage**: Anonymous sessions only
- **Client-side Password Hashing**: SHA-1 for HIBP k-anonymity
- **HTTPS Only**: Secure communication with all APIs
- **No Tracking**: No analytics or third-party trackers
- **Open Source**: Fully transparent codebase

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Use existing component patterns (shadcn/ui)
- Add types in `src/types/` directory
- Update SEO config when adding new pages
- Test with both light and dark themes

---

## 🗺️ Roadmap

- [ ] Multi-language support (i18n)
- [ ] Export/import user data
- [ ] Scheduled security scans
- [ ] Progressive Web App (PWA) support
- [ ] Email notification system
- [ ] Advanced threat intelligence dashboard
- [ ] API rate limiting and caching
- [ ] Comprehensive test suite

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Supabase](https://supabase.com/) - Backend infrastructure
- [Have I Been Pwned](https://haveibeenpwned.com/) - Breach data
- [SSL Labs](https://www.ssllabs.com/) - SSL analysis
- [BetterStack](https://betterstack.com/) - Log monitoring

---

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/dhirendraxd/Protect_YOU-Web-/issues)
- **Discussions**: [GitHub Discussions](https://github.com/dhirendraxd/Protect_YOU-Web-/discussions)

---

<div align="center">

**Built with ❤️ for a more secure internet**

[⬆ Back to Top](#-cybersentry-security-dashboard)

</div>

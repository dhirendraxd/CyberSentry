
import { 
  Home, 
  Search,
  FileText,
  Settings,
  Shield,
  Lock,
  Key,
  Bell,
  Globe,
  Info,
  HelpCircle,
  MessageCircle,
  RefreshCw
} from 'lucide-react';

// Navigation structure for TopNavbar
export const navGroups = [
  {
    name: "Dashboard",
    path: "/",
    icon: Home,
    description: "Overview of your security status"
  },
  {
    name: "Tools",
    path: "/tools",
    icon: Search,
    description: "Browse all security tools"
  },
  {
    name: "System Analysis",
    icon: Search,
    description: "Analyze your system for threats",
    items: [
      {
        name: "Security Scanner",
        path: "/security-scanner",
        icon: Search,
        description: "Scan for vulnerabilities and threats"
      },
      {
        name: "Log Analyzer",
        path: "/log-analyzer",
        icon: FileText,
        description: "Analyze logs for security threats"
      },
      {
        name: "Breach Checker",
        path: "/breach-checker",
        icon: Shield,
        description: "Check if your email was breached"
      },
      {
        name: "Password Analyzer",
        path: "/password-analyzer",
        icon: Lock,
        description: "Test password strength"
      },
      {
        name: "Password Generator",
        path: "/password-generator",
        icon: Key,
        description: "Generate secure passwords"
      }
    ]
  },
  {
    name: "Intelligence",
    icon: Bell,
    description: "Security intelligence and monitoring",
    items: [
      {
        name: "Security News",
        path: "/security-news",
        icon: Bell,
        description: "Latest cybersecurity updates"
      },
      {
        name: "Dark Web Monitor",
        path: "/dark-web",
        icon: Globe,
        description: "Monitor for leaked credentials"
      }
    ]
  },
  {
    name: "Information",
    icon: Info,
    description: "Learn more about our platform",
    items: [
      {
        name: "About",
        path: "/about",
        icon: Info,
        description: "Learn about our platform"
      },
      {
        name: "Help",
        path: "/help",
        icon: HelpCircle,
        description: "Documentation and guides"
      },
      {
        name: "Explore",
        path: "/explore",
        icon: RefreshCw,
        description: "Discover new tools"
      },
      {
        name: "Feedback",
        path: "/feedback",
        icon: MessageCircle,
        description: "Share your feedback"
      },
      {
        name: "FAQ",
        path: "/faq",
        icon: HelpCircle,
        description: "Frequently asked questions"
      },
      {
        name: "Contact",
        path: "/contact",
        icon: MessageCircle,
        description: "Get in touch with us"
      }
    ]
  }
];

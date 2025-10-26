
import { 
  Home,
  Shield, 
  Lock, 
  Mail, 
  Key, 
  Bell, 
  RefreshCw, 
  FileText,
  Search,
  Globe,
  Scan,
  Info,
  HelpCircle,
  MessageCircle
} from 'lucide-react';
import { NavItem, NavGroup } from '@/types/navigation';

export const navLinks: NavItem[] = [
  { path: '/', name: 'Home', icon: Home, description: 'Overview of your security status' },
  { path: '/tools', name: 'Tools', icon: Search, description: 'Browse all security tools' },
  { path: '/explore', name: 'Explore', icon: RefreshCw, description: 'Discover new tools and features' },
  { path: '/about', name: 'About', icon: Info, description: 'Learn about our platform' },
  { path: '/log-analyzer', name: 'Log Analyzer', icon: FileText, description: 'Analyze security logs for threats' },
  { path: '/breach-checker', name: 'Breach Checker', icon: Shield, description: 'Check if your email was breached' },
  { path: '/password-analyzer', name: 'Password Analyzer', icon: Lock, description: 'Test password strength' },
  { path: '/password-generator', name: 'Password Generator', icon: Key, description: 'Generate secure passwords' },
  { path: '/security-scanner', name: 'Security Scanner', icon: Search, description: 'Scan websites for vulnerabilities' },
  { path: '/security-news', name: 'Security News', icon: Bell, description: 'Latest cybersecurity updates' },
  { path: '/dark-web', name: 'Dark Web Monitor', icon: Globe, description: 'Monitor for leaked credentials' },
  { path: '/help', name: 'Help', icon: HelpCircle, description: 'Documentation and guides' },
  { path: '/feedback', name: 'Feedback', icon: MessageCircle, description: 'Share your thoughts with us' },
  { path: '/faq', name: 'FAQ', icon: HelpCircle, description: 'Frequently asked questions' },
  { path: '/contact', name: 'Contact', icon: MessageCircle, description: 'Get in touch with us' }
];

export const navigationGroups = [
  {
    label: 'Security Tools',
    items: [
      { path: '/log-analyzer', name: 'Log Analyzer', icon: FileText, description: 'Analyze security logs for threats' },
      { path: '/breach-checker', name: 'Breach Checker', icon: Shield, description: 'Check if your email was breached' },
      { path: '/password-analyzer', name: 'Password Analyzer', icon: Lock, description: 'Test password strength' },
      { path: '/password-generator', name: 'Password Generator', icon: Key, description: 'Generate secure passwords' },
      { path: '/security-scanner', name: 'Security Scanner', icon: Search, description: 'Scan websites for vulnerabilities' },
    ]
  },
  {
    label: 'Intelligence',
    items: [
      { path: '/security-news', name: 'Security News', icon: Bell, description: 'Latest cybersecurity updates' },
      { path: '/dark-web', name: 'Dark Web Monitor', icon: Globe, description: 'Monitor for leaked credentials' },
    ]
  },
  {
    label: 'Information',
    items: [
      { path: '/about', name: 'About', icon: Info, description: 'Learn about our platform' },
      { path: '/faq', name: 'FAQ', icon: HelpCircle, description: 'Frequently asked questions' },
      { path: '/contact', name: 'Contact', icon: MessageCircle, description: 'Get in touch with us' }
    ]
  }
];

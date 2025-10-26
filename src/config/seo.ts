
export const seoConfig = {
  defaultTitle: "CyberSentry - Free Security Analytics & Breach Detection",
  titleTemplate: "%s | CyberSentry",
  defaultDescription: "Protect your digital identity with CyberSentry's free cybersecurity tools. Check for data breaches, analyze passwords, and get real-time security alerts - no sign-up required.",
  siteUrl: (typeof window !== 'undefined' && window.location.origin) || 
           'https://cybersentry.vercel.app',
  siteName: "CyberSentry",
  twitterHandle: "@cybersentry",
  
  pages: {
    home: {
      title: "Free Security Analytics & Breach Detection - No Sign Up Required",
      description: "Comprehensive cybersecurity platform for breach detection, password analysis, vulnerability scanning, and security monitoring. Instant access to professional security tools.",
      keywords: "free cybersecurity tools, breach detection, password analyzer, security monitoring, vulnerability scanner, no registration"
    },
    about: {
      title: "About CyberSentry - Free Cybersecurity for Everyone",
      description: "Learn about CyberSentry's mission to provide free, accessible cybersecurity tools. Professional-grade security analysis without barriers or sign-ups.",
      keywords: "about cybersentry, free security tools, cybersecurity platform, open access security"
    },
    breachChecker: {
      title: "Free Data Breach Checker - Instant Email Security Check",
      description: "Instantly check if your email address has been involved in any known data breaches. Free security check with no registration required.",
      keywords: "free data breach checker, email breach, security breach, compromised accounts, no signup"
    },
    passwordAnalyzer: {
      title: "Free Password Strength Analyzer - Test Password Security",
      description: "Analyze your password strength and get recommendations for creating stronger, more secure passwords. Free tool with instant results.",
      keywords: "free password analyzer, password strength, secure passwords, password security, instant check"
    },
    passwordGenerator: {
      title: "Free Secure Password Generator - Create Strong Passwords",
      description: "Generate cryptographically secure passwords with customizable options. Create strong, unique passwords instantly - no account needed.",
      keywords: "free password generator, secure passwords, random password, strong password, no registration"
    },
    securityNews: {
      title: "Latest Cybersecurity News & Threat Intelligence - Free Access",
      description: "Stay updated with the latest cybersecurity news, threat intelligence, and security advisories. Free access to security insights.",
      keywords: "free cybersecurity news, threat intelligence, security advisories, cyber threats, security updates"
    },
    darkWeb: {
      title: "Free Dark Web Monitoring - Check for Leaked Credentials",
      description: "Monitor the dark web for your compromised credentials and personal information. Free dark web scanning service.",
      keywords: "free dark web monitoring, credential monitoring, data leak detection, identity theft protection"
    },
    securityScanner: {
      title: "Free Vulnerability Scanner - Website & Network Security Testing",
      description: "Comprehensive security scanning for websites and networks. Free vulnerability assessment with instant results.",
      keywords: "free vulnerability scanner, security testing, malware detection, network security, website scanner"
    },
    logAnalyzer: {
      title: "Free Log Analyzer - Security Log Analysis & Threat Detection",
      description: "Advanced log analysis tools for detecting security threats and anomalies. Upload and analyze system logs for free.",
      keywords: "free log analyzer, security logs, threat detection, log analysis, SIEM, instant analysis"
    },
    faq: {
      title: "FAQ - CyberSentry Free Cybersecurity Tools Help",
      description: "Get answers to common questions about CyberSentry's free cybersecurity tools. Learn how to use our security analyzers effectively.",
      keywords: "cybersentry faq, security tools help, free cybersecurity questions, how to use security tools"
    },
    contact: {
      title: "Contact CyberSentry - Get Security Support & Feedback",
      description: "Contact CyberSentry for support, feature requests, or security questions. We're here to help you with our free cybersecurity tools.",
      keywords: "contact cybersentry, security support, cybersecurity help, feature requests, free support"
    }
  },
  
  structuredData: {
    organization: {
      name: "CyberSentry",
      description: "Free cybersecurity platform providing professional-grade security tools without barriers",
      logo: "/logo.png",
      contactEmail: "hello@cybersentry.com",
      socialProfiles: [
        "https://twitter.com/cybersentry",
        "https://linkedin.com/company/cybersentry"
      ]
    }
  }
};

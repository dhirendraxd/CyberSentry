
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'WebSite' | 'Organization' | 'BreadcrumbList' | 'FAQPage' | 'HowTo' | 'SoftwareApplication';
  data: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const getStructuredData = () => {
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_SITE_URL || 'https://cybersentry.vercel.app';

    switch (type) {
      case 'WebSite':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "CyberSentry",
          "description": "Advanced Security Analytics & Breach Detection Platform",
          "url": baseUrl,
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${baseUrl}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          },
          "sameAs": [
            "https://twitter.com/cybersentry",
            "https://linkedin.com/company/cybersentry"
          ]
        };

      case 'Organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "CyberSentry",
          "description": "Leading cybersecurity platform for breach detection and security analytics",
          "url": baseUrl,
          "logo": `${baseUrl}/logo.png`,
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "support@cybersentry.com"
          },
          "sameAs": [
            "https://twitter.com/cybersentry",
            "https://linkedin.com/company/cybersentry"
          ]
        };

      case 'SoftwareApplication':
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "CyberSentry Security Platform",
          "description": "Comprehensive cybersecurity platform for breach detection, password analysis, and security monitoring",
          "url": baseUrl,
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "creator": {
            "@type": "Organization",
            "name": "CyberSentry"
          }
        };

      case 'BreadcrumbList':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.items?.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": `${baseUrl}${item.url}`
          })) || []
        };

      case 'FAQPage':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.questions?.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          })) || []
        };

      case 'HowTo':
        return {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": data.name,
          "description": data.description,
          "step": data.steps?.map((step: any, index: number) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.name,
            "text": step.text
          })) || []
        };

      default:
        return data;
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>
    </Helmet>
  );
};

export default StructuredData;

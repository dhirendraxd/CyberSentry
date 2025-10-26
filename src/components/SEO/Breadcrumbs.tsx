
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import StructuredData from './StructuredData';

interface BreadcrumbItem {
  name: string;
  url: string;
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getBreadcrumbName = (path: string): string => {
    const nameMap: { [key: string]: string } = {
      'breach-checker': 'Breach Checker',
      'password-analyzer': 'Password Analyzer',
      'password-generator': 'Password Generator',
      'security-news': 'Security News',
      'dark-web': 'Dark Web Monitoring',
      'security-scanner': 'Security Scanner',
      'log-analyzer': 'Log Analyzer',
      'settings': 'Settings',
      'auth': 'Authentication'
    };
    return nameMap[path] || path.charAt(0).toUpperCase() + path.slice(1);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    ...pathnames.map((pathname, index) => {
      const url = '/' + pathnames.slice(0, index + 1).join('/');
      return {
        name: getBreadcrumbName(pathname),
        url
      };
    })
  ];

  // Don't show breadcrumbs on homepage
  if (location.pathname === '/') {
    return null;
  }

  return (
    <>
      <StructuredData 
        type="BreadcrumbList" 
        data={{ items: breadcrumbs }} 
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-400">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.url} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-white font-medium" aria-current="page">
                  {breadcrumb.name}
                </span>
              ) : (
                <Link
                  to={breadcrumb.url}
                  className="hover:text-cyber-purple transition-colors flex items-center gap-1"
                >
                  {index === 0 && <Home className="h-4 w-4" />}
                  {breadcrumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;

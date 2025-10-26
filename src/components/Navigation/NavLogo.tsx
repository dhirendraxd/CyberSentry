
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const NavLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <div className="p-1.5 rounded-lg bg-cyber-purple/20 border border-cyber-purple/30">
        <Shield className="h-5 w-5 text-cyber-purple" />
      </div>
      <h1 className="text-lg font-bold text-white tracking-tight hidden sm:block">CyberSentry</h1>
    </Link>
  );
};

export default NavLogo;

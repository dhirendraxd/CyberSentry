
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlobalSearch from './GlobalSearch';
import { ThemeToggle } from './ThemeToggle';
import NavLogo from './Navigation/NavLogo';
import NavGroups from './Navigation/NavGroups';
import MobileNavGroups from './Navigation/MobileNavGroups';

const TopNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-cyber-dark-purple/80 backdrop-blur-md border-b border-cyber-purple/20 py-3 sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <NavLogo />
          </div>

          {/* Desktop Navigation */}
          <NavGroups />

          {/* Search & Actions */}
          <div className="flex items-center gap-2">
            {/* Search - Shown on larger screens */}
            <div className="hidden md:block w-60">
              <GlobalSearch />
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-300 hover:bg-cyber-purple/10 hover:text-cyber-purple"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu - Only shown when mobileMenuOpen is true */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-3 border-t border-cyber-purple/20">
            <MobileNavGroups onNavigate={closeMobileMenu} />
            
            <div className="mt-4 pt-3 border-t border-cyber-purple/20">
              <GlobalSearch />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNavbar;

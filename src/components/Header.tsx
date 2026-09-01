import React, { useState } from 'react';
import { Shield, Globe, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Left */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Shield className="w-6 h-6 text-accent-blue" />
            <span className="font-bold text-lg md:text-xl text-white tracking-tight">
              Census Confidence Hub
            </span>
          </div>

          {/* Center / Journey Progress Tracker - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <a href="#stage-1" className="hover:text-white transition-colors duration-200">
              Stage 1: Safety
            </a>
            <span className="text-gray-600">|</span>
            <a href="#stage-2" className="hover:text-white transition-colors duration-200">
              Stage 2: Understand
            </a>
            <span className="text-gray-600">|</span>
            <a href="#stage-3" className="hover:text-white transition-colors duration-200">
              Stage 3: Get Ready
            </a>
          </div>

          {/* Right / Language Toggle */}
          <div className="hidden md:flex items-center gap-2 text-sm font-medium">
            <Globe className="w-4 h-4 text-gray-400" />
            <button className="text-white bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-colors">
              English
            </button>
            <span className="text-gray-600">/</span>
            <button className="text-gray-400 hover:text-white transition-colors">
              हिंदी
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy/95 border-b border-white/10 px-4 pt-2 pb-4 space-y-4">
          <div className="flex flex-col space-y-3 text-sm text-gray-300">
            <a href="#stage-1" onClick={() => setIsMobileMenuOpen(false)}>Stage 1: Safety</a>
            <a href="#stage-2" onClick={() => setIsMobileMenuOpen(false)}>Stage 2: Understand</a>
            <a href="#stage-3" onClick={() => setIsMobileMenuOpen(false)}>Stage 3: Get Ready</a>
          </div>
          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <Globe className="w-4 h-4 text-gray-400" />
            <span className="text-white font-medium text-sm">EN</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400 text-sm">HI</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

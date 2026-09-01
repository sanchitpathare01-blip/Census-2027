import React, { useState } from 'react';
import { Shield, Sparkles, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Left */}
          <a href="#" className="flex items-center gap-2 flex-shrink-0 hover:opacity-90 transition-opacity">
            <Shield className="w-6 h-6 text-accent-blue" />
            <span className="font-bold text-lg md:text-xl text-white tracking-tight">
              Census Confidence Hub
            </span>
          </a>

          {/* Center / Journey Progress Tracker */}
          <div className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-400">
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
            <span className="text-gray-600">|</span>
            <a
              href="#ask-census-hub"
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200 flex items-center gap-1.5 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ask AI
            </a>
          </div>

          {/* Right / Official Badge */}
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
            <span>✓ Verified Census Data</span>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
              aria-label="Toggle Navigation Menu"
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
            <a href="#ask-census-hub" onClick={() => setIsMobileMenuOpen(false)} className="text-purple-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Ask AI Assistant
            </a>
          </div>
          <div className="flex items-center gap-2 pt-3 border-t border-white/10 text-xs text-emerald-400 font-semibold">
            <span>✓ Verified Census 2027 Data</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

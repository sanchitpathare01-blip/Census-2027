import React, { useState } from 'react';
import { Shield, Sparkles, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-md border-b border-white/10" aria-label="Site Header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Left */}
          <a href="#" className="flex items-center gap-2 flex-shrink-0 hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg p-1" aria-label="Census Confidence Hub Home">
            <Shield className="w-6 h-6 text-accent-blue" aria-hidden="true" />
            <span className="font-bold text-lg md:text-xl text-white tracking-tight">
              Census Confidence Hub
            </span>
          </a>

          {/* Center / Journey Progress Tracker Navigation */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-400">
            <a href="#stage-1" className="hover:text-white transition-colors duration-200 focus-visible:text-white">
              Stage 1: Safety
            </a>
            <span className="text-gray-600" aria-hidden="true">|</span>
            <a href="#stage-2" className="hover:text-white transition-colors duration-200 focus-visible:text-white">
              Stage 2: Understand
            </a>
            <span className="text-gray-600" aria-hidden="true">|</span>
            <a href="#stage-3" className="hover:text-white transition-colors duration-200 focus-visible:text-white">
              Stage 3: Get Ready
            </a>
            <span className="text-gray-600" aria-hidden="true">|</span>
            <a
              href="#ask-census-hub"
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200 flex items-center gap-1.5 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20"
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              Ask AI
            </a>
          </nav>

          {/* Right / Official Badge */}
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full" role="status">
            <span>✓ Verified Census Data</span>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile Navigation" className="md:hidden bg-navy/95 border-b border-white/10 px-4 pt-2 pb-4 space-y-4">
          <div className="flex flex-col space-y-3 text-sm text-gray-300">
            <a href="#stage-1" onClick={() => setIsMobileMenuOpen(false)}>Stage 1: Safety</a>
            <a href="#stage-2" onClick={() => setIsMobileMenuOpen(false)}>Stage 2: Understand</a>
            <a href="#stage-3" onClick={() => setIsMobileMenuOpen(false)}>Stage 3: Get Ready</a>
            <a href="#ask-census-hub" onClick={() => setIsMobileMenuOpen(false)} className="text-purple-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" aria-hidden="true" /> Ask AI Assistant
            </a>
          </div>
          <div className="flex items-center gap-2 pt-3 border-t border-white/10 text-xs text-emerald-400 font-semibold" role="status">
            <span>✓ Verified Census 2027 Data</span>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;

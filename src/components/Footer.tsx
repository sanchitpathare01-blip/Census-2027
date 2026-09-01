import React from 'react';
import { Shield, ExternalLink, Lock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-navy/90 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent-blue" />
              <span className="font-bold text-white text-lg">Census Confidence Hub</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              A GenAI-powered public awareness platform for Census 2027. Building trust, combating scam patterns, and simplifying official information.
            </p>
          </div>

          {/* Official Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Official Portals & Sources</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <a
                  href="https://censusindia.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Office of Registrar General & Census Commissioner <ExternalLink className="w-3 h-3 text-indigo-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://se.census.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Official Self-Enumeration Portal (se.census.gov.in) <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://cybercrime.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  National Cyber Crime Reporting Portal (1930) <ExternalLink className="w-3 h-3 text-amber-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Privacy Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-purple-400" /> Legal Confidentiality Guarantee
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Under Section 15 of the Census Act, 1948, individual Census responses are strictly confidential and inadmissible in any court or government department.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Census Confidence Hub — Hackathon Submission Project</p>
          <p className="flex items-center gap-2">
            <span>Powered by Google Gemini</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">100% Deterministic Evidence Engine</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

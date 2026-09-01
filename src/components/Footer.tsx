import React from 'react';
import { Shield, ExternalLink, Lock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-navy/90 py-12 px-4 sm:px-6 lg:px-8" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-400" aria-hidden="true" />
              <span className="font-bold text-white text-lg">Census Confidence Hub</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              A GenAI-powered public awareness platform for Census 2027. Building trust, combating scam patterns, and simplifying official information.
            </p>
          </div>

          {/* Official Portals */}
          <div className="space-y-3" role="region" aria-label="Official Portals & Sources">
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">Official Portals & Sources</h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <a
                  href="https://censusindia.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5 focus-visible:ring-1 focus-visible:ring-purple-400"
                  aria-label="Office of Registrar General & Census Commissioner website (opens in new tab)"
                >
                  Office of Registrar General & Census Commissioner <ExternalLink className="w-3 h-3 text-indigo-300" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://se.census.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5 focus-visible:ring-1 focus-visible:ring-purple-400"
                  aria-label="Official Self-Enumeration Portal se.census.gov.in (opens in new tab)"
                >
                  Official Self-Enumeration Portal (se.census.gov.in) <ExternalLink className="w-3 h-3 text-emerald-400" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://cybercrime.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5 focus-visible:ring-1 focus-visible:ring-purple-400"
                  aria-label="National Cyber Crime Reporting Portal cybercrime.gov.in Helpline 1930 (opens in new tab)"
                >
                  National Cyber Crime Reporting Portal (1930) <ExternalLink className="w-3 h-3 text-amber-400" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Privacy Disclaimer */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" /> Legal Confidentiality Guarantee
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Under Section 15 of the Census Act, 1948, individual Census responses are strictly confidential and inadmissible in any court or government department.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 Census Confidence Hub — Hackathon Submission Project</p>
          <p className="flex items-center gap-2">
            <span>Powered by Google Gemini</span>
            <span aria-hidden="true">•</span>
            <span className="text-emerald-400 font-semibold">100% Deterministic Evidence Engine</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

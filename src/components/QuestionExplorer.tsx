import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Shield, AlertCircle, FileText, CheckCircle, Info } from 'lucide-react';
import { getAppData } from '../utils/data-loader';
import { QuestionCategory } from '../data/types';

const QuestionExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'phase1' | 'phase2'>('phase1');
  const [searchQuery, setSearchQuery] = useState('');
  
  const appData = getAppData();
  const phase1Questions = appData.phase1Questions;

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: QuestionCategory.HOUSEHOLD, label: 'Household & Structure' },
    { id: QuestionCategory.DEMOGRAPHICS, label: 'Demographics' },
    { id: QuestionCategory.SOCIAL, label: 'Social & Amenities' },
  ];

  const filteredQuestions = phase1Questions.filter((q) => {
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesSearch = q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) || q.questionNumber.toString().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 w-full" aria-labelledby="question-explorer-title">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <HelpCircle className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h3 id="question-explorer-title" className="text-xl font-bold text-white">Census Questionnaire Explorer</h3>
            <p className="text-sm text-gray-300">Browse official verified questions asked by enumerators</p>
          </div>
        </div>

        {/* Phase selector tabs */}
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 self-start md:self-auto" role="tablist" aria-label="Questionnaire Phase Selection">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'phase1'}
            aria-controls="phase-1-panel"
            id="phase-1-tab"
            onClick={() => setActiveTab('phase1')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-purple-400 ${
              activeTab === 'phase1'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
            Phase 1: Houselisting ({phase1Questions.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'phase2'}
            aria-controls="phase-2-panel"
            id="phase-2-tab"
            onClick={() => setActiveTab('phase2')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-purple-400 ${
              activeTab === 'phase2'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" aria-hidden="true" />
            Phase 2: Population (Pending)
          </button>
        </div>
      </div>

      {activeTab === 'phase1' ? (
        <div id="phase-1-panel" role="tabpanel" aria-labelledby="phase-1-tab" className="space-y-4">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <label htmlFor="question-search-input" className="sr-only">
                Search questions by keyword or number
              </label>
              <input
                id="question-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. 'drinking water', 'material')..."
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0" role="group" aria-label="Filter questions by category">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  aria-pressed={selectedCategory === cat.id}
                  className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors border focus-visible:ring-2 focus-visible:ring-purple-400 ${
                    selectedCategory === cat.id
                      ? 'bg-purple-500/20 border-purple-500/50 text-purple-200 font-bold'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1" role="region" aria-label="Official Houselisting Questions">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q) => (
                <motion.div
                  key={q.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-purple-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/30">
                        Q{q.questionNumber}
                      </span>
                      {q.isSensitive && (
                        <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/40 flex items-center gap-1">
                          <Shield className="w-3 h-3" aria-hidden="true" /> Sensitive Data
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-100 font-medium leading-snug">{q.questionText}</p>
                  </div>

                  {q.dataProtectionNote && (
                    <div className="mt-3 pt-2 border-t border-white/5 text-[11px] text-amber-200 flex items-start gap-1">
                      <Info className="w-3 h-3 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{q.dataProtectionNote}</span>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-gray-300 text-sm">
                No questions match your search query.
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Phase 2 pending view */
        <div id="phase-2-panel" role="tabpanel" aria-labelledby="phase-2-tab" className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-8 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-purple-400 mx-auto mb-3" aria-hidden="true" />
          <h4 className="text-lg font-bold text-white">Phase 2 Population Enumeration Questionnaire</h4>
          <p className="text-sm text-gray-200 max-w-xl mx-auto">
            Exact official question list for Phase 2 is pending official publication by the Office of the Registrar General & Census Commissioner, India.
          </p>
          <div className="inline-flex items-center gap-2 bg-black/40 border border-white/10 px-4 py-2 rounded-lg text-xs text-gray-300" role="note">
            <Shield className="w-4 h-4 text-purple-400" aria-hidden="true" />
            <span>Strict Truth Guarantee: We do not fabricate Census questions before official publication.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionExplorer;

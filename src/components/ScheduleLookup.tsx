import React, { useState } from 'react';
import { Calendar, MapPin, ExternalLink, CheckSquare, Square } from 'lucide-react';
import { getAppData } from '../utils/data-loader';

const ScheduleLookup: React.FC = () => {
  const appData = getAppData();
  const schedules = appData.schedules;
  const [selectedStateCode, setSelectedStateCode] = useState<string>('DL'); // Default Delhi
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    step1: true,
    step2: false,
    step3: false,
    step4: false
  });

  const selectedSchedule = schedules.find((s) => s.statecode === selectedStateCode) || schedules[0];

  const toggleCheck = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const steps = [
    { key: 'step1', title: 'Verify official Self-Enumeration portal', desc: 'Visit se.census.gov.in — never click unverified links received via SMS/WhatsApp.' },
    { key: 'step2', title: 'Log in using your registered mobile number', desc: 'An official OTP will be sent to your mobile strictly for portal login.' },
    { key: 'step3', title: 'Complete Houselisting form online', desc: 'Answer the 33 household and housing amenity questions at your convenience.' },
    { key: 'step4', title: 'Save your unique Self-Enumeration ID (SE ID)', desc: 'Show your SE ID code to the official enumerator when they visit your home.' },
  ];

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 w-full space-y-8" aria-labelledby="schedule-lookup-title">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Calendar className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h3 id="schedule-lookup-title" className="text-xl font-bold text-white">State/UT Census Schedule & Portal</h3>
            <p className="text-sm text-gray-300">Check officially published timelines for your region</p>
          </div>
        </div>

        {/* Dropdown */}
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
          <label htmlFor="state-schedule-select" className="sr-only">
            Select State or Union Territory to view schedule
          </label>
          <select
            id="state-schedule-select"
            value={selectedStateCode}
            onChange={(e) => setSelectedStateCode(e.target.value)}
            className="bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            {schedules.map((s) => (
              <option key={s.statecode} value={s.statecode} className="bg-gray-900 text-white">
                {s.state} ({s.statecode})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected State Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="region" aria-label={`Census timeline for ${selectedSchedule.state}`}>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <span className="text-xs text-gray-300 uppercase font-semibold">Phase 1 National Window</span>
          <p className="text-base font-bold text-white mt-1">April 1 – Sept 30, 2026</p>
          <p className="text-xs text-emerald-400 mt-1">Houselisting & Housing Census</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <span className="text-xs text-gray-300 uppercase font-semibold">Phase 2 National Schedule</span>
          <p className="text-base font-bold text-white mt-1">February 2027</p>
          <p className="text-xs text-purple-300 mt-1">Population Enumeration</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <span className="text-xs text-gray-300 uppercase font-semibold">State-Specific 30-Day Window</span>
          <p className="text-base font-bold text-amber-300 mt-1">TBD per State Notification</p>
          <p className="text-xs text-gray-300 mt-1">{selectedSchedule.notes || 'Specific state window to be notified.'}</p>
        </div>
      </div>

      {/* Self-Enumeration Portal Card */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            Official Self-Enumeration Portal
          </h4>
          <p className="text-xs text-gray-200 mt-1">
            Fill out your Houselisting details digitally 15 days prior to door-to-door enumeration.
          </p>
        </div>
        <a
          href="https://se.census.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-400"
          aria-label="Visit se.census.gov.in official portal (opens in new tab)"
        >
          Visit se.census.gov.in
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>

      {/* Self-Enumeration Checklist */}
      <div role="region" aria-label="Self-Enumeration Preparedness Checklist">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          Self-Enumeration Preparedness Checklist
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3" role="group">
          {steps.map((st) => {
            const checked = checklist[st.key];
            return (
              <button
                key={st.key}
                type="button"
                role="checkbox"
                aria-checked={checked}
                onClick={() => toggleCheck(st.key)}
                className={`text-left p-4 rounded-xl border transition-all flex items-start gap-3 w-full focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  checked
                    ? 'bg-emerald-500/10 border-emerald-500/40'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                {checked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                ) : (
                  <Square className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" aria-hidden="true" />
                )}
                <div>
                  <h5 className={`text-sm font-semibold ${checked ? 'text-emerald-300' : 'text-gray-100'}`}>
                    {st.title}
                  </h5>
                  <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">{st.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScheduleLookup;

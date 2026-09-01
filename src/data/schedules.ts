import type { StateSchedule } from './types';
import { OFFICIAL_SOURCES } from './official-sources';

// National Houselisting Phase window is April 1 to Sept 30, 2026.
// Exact state-wise 30-day windows and 15-day SE windows are state-dependent and partially TBD officially per state.
// We encode the national boundary here, while keeping specific exact dates null where TBD.
const defaultSchedule = {
  selfEnumerationStart: null, // TBD per state
  selfEnumerationEnd: null,   // TBD per state
  houseListingStart: '2026-04-01', // National start boundary
  houseListingEnd: '2026-09-30',   // National end boundary
  populationEnumerationDate: '2027-02-01', // National start (except snow-bound)
  notes: 'Exact state-level 30-day HLO and 15-day SE window is TBD.',
  officialSource: OFFICIAL_SOURCES.find(s => s.id === 'census-india-main')!
};

export const SCHEDULES: StateSchedule[] = [
  // 28 States
  { state: 'Andhra Pradesh', statecode: 'AP', ...defaultSchedule },
  { state: 'Arunachal Pradesh', statecode: 'AR', ...defaultSchedule },
  { state: 'Assam', statecode: 'AS', ...defaultSchedule },
  { state: 'Bihar', statecode: 'BR', ...defaultSchedule },
  { state: 'Chhattisgarh', statecode: 'CG', ...defaultSchedule },
  { state: 'Goa', statecode: 'GA', ...defaultSchedule },
  { state: 'Gujarat', statecode: 'GJ', ...defaultSchedule },
  { state: 'Haryana', statecode: 'HR', ...defaultSchedule },
  { state: 'Himachal Pradesh', statecode: 'HP', ...defaultSchedule, notes: 'Snow-bound areas enumeration in Sept 2026. Exact dates TBD.' },
  { state: 'Jharkhand', statecode: 'JH', ...defaultSchedule },
  { state: 'Karnataka', statecode: 'KA', ...defaultSchedule },
  { state: 'Kerala', statecode: 'KL', ...defaultSchedule },
  { state: 'Madhya Pradesh', statecode: 'MP', ...defaultSchedule },
  { state: 'Maharashtra', statecode: 'MH', ...defaultSchedule },
  { state: 'Manipur', statecode: 'MN', ...defaultSchedule },
  { state: 'Meghalaya', statecode: 'ML', ...defaultSchedule },
  { state: 'Mizoram', statecode: 'MZ', ...defaultSchedule },
  { state: 'Nagaland', statecode: 'NL', ...defaultSchedule },
  { state: 'Odisha', statecode: 'OR', ...defaultSchedule },
  { state: 'Punjab', statecode: 'PB', ...defaultSchedule },
  { state: 'Rajasthan', statecode: 'RJ', ...defaultSchedule },
  { state: 'Sikkim', statecode: 'SK', ...defaultSchedule },
  { state: 'Tamil Nadu', statecode: 'TN', ...defaultSchedule },
  { state: 'Telangana', statecode: 'TG', ...defaultSchedule },
  { state: 'Tripura', statecode: 'TR', ...defaultSchedule },
  { state: 'Uttar Pradesh', statecode: 'UP', ...defaultSchedule },
  { state: 'Uttarakhand', statecode: 'UK', ...defaultSchedule, notes: 'Snow-bound areas enumeration in Sept 2026. Exact dates TBD.' },
  { state: 'West Bengal', statecode: 'WB', ...defaultSchedule },
  
  // 8 Union Territories
  { state: 'Andaman and Nicobar Islands', statecode: 'AN', ...defaultSchedule },
  { state: 'Chandigarh', statecode: 'CH', ...defaultSchedule },
  { state: 'Dadra and Nagar Haveli and Daman and Diu', statecode: 'DN', ...defaultSchedule },
  { state: 'Delhi', statecode: 'DL', ...defaultSchedule },
  { state: 'Jammu and Kashmir', statecode: 'JK', ...defaultSchedule, notes: 'Snow-bound areas enumeration in Sept 2026. Exact dates TBD.' },
  { state: 'Ladakh', statecode: 'LA', ...defaultSchedule, notes: 'Snow-bound areas enumeration in Sept 2026. Exact dates TBD.' },
  { state: 'Lakshadweep', statecode: 'LD', ...defaultSchedule },
  { state: 'Puducherry', statecode: 'PY', ...defaultSchedule }
];

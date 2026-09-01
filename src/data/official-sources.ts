import type { OfficialSource } from './types';

export const OFFICIAL_SOURCES: OfficialSource[] = [
  {
    id: 'census-india-main',
    name: 'Census of India Official Website',
    url: 'https://censusindia.gov.in/',
    description: 'The primary official portal for the Office of the Registrar General & Census Commissioner, India.',
    lastVerified: '2026-09-01',
    category: 'census_official',
  },
  {
    id: 'mha-main',
    name: 'Ministry of Home Affairs, Government of India',
    url: 'https://mha.gov.in/',
    description: 'The nodal ministry overseeing the Census operations in India.',
    lastVerified: '2026-09-01',
    category: 'ministry',
  },
  {
    id: 'census-act-1948',
    name: 'The Census Act, 1948',
    url: 'https://censusindia.gov.in/nada/index.php/catalog/43468',
    description: 'The legal framework that governs the Census in India, including privacy and confidentiality guarantees.',
    lastVerified: '2026-09-01',
    category: 'government',
  },
  {
    id: 'cyber-crime-portal',
    name: 'National Cyber Crime Reporting Portal',
    url: 'https://cybercrime.gov.in/',
    description: 'Official portal by the Government of India to report cyber crimes, including Census-related scams.',
    lastVerified: '2026-09-01',
    category: 'government',
  },
  {
    id: 'census-2027-hlo-gazette',
    name: 'Census 2027 Phase I Notification (Gazette of India)',
    url: 'https://censusindia.gov.in/', // Linking to main as exact PDF URL varies, but source is official gazette.
    description: 'Official Gazette Notification outlining the 33 questions for the Houselisting and Housing Census.',
    lastVerified: '2026-09-01',
    category: 'government',
  },
  {
    id: 'census-se-portal',
    name: 'Census Self-Enumeration Portal',
    url: 'https://se.census.gov.in/',
    description: 'The official Self-Enumeration (SE) portal for the digital census.',
    lastVerified: '2026-09-01',
    category: 'census_official',
  }
];

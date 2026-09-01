import type { CensusPhase } from './types';
import { OFFICIAL_SOURCES } from './official-sources';

export const CENSUS_PHASES: CensusPhase[] = [
  {
    id: 'phase-1-house-listing',
    name: 'Houselisting and Housing Census',
    description: 'The first phase of the Census, focusing on listing all structures, houses, and collecting data on housing conditions and amenities.',
    timelineStart: '2026-04-01',
    timelineEnd: '2026-09-30',
    activities: [
      'Numbering of buildings and census houses',
      'Listing of households',
      'Collection of information on housing conditions',
      'Collection of information on household amenities and assets',
      'Self-enumeration via web portal (15 days prior to enumerator visit)'
    ],
    dataCollected: [
      'Predominant material of floor, wall, and roof',
      'Use of census house',
      'Condition of the census house',
      'Household amenities (water, electricity, toilet)',
      'Assets (vehicles, electronics)',
      'Head of household demographic details'
    ],
    purpose: 'To create a comprehensive frame of all buildings, houses, and households across the country for the second phase, and to assess housing conditions.',
    plainLanguageExplanation: 'In this first step, enumerators visit every neighborhood to count and list all buildings and houses. They also ask basic questions about the condition of the house and the facilities available, like drinking water and electricity.',
    officialSource: OFFICIAL_SOURCES.find(s => s.id === 'census-2027-hlo-gazette')!
  },
  {
    id: 'phase-2-population-enumeration',
    name: 'Population Enumeration',
    description: 'The second phase involving the actual counting of the population and collection of demographic, socio-economic, and cultural data.',
    timelineStart: '2027-02-01',
    timelineEnd: '2027-02-28',
    activities: [
      'Door-to-door enumeration by official enumerators',
      'Revisional round to update births and deaths',
      'Early enumeration in snow-bound areas (September 2026)'
    ],
    dataCollected: [
      'Name and relationship to head',
      'Sex, age, marital status',
      'Religion, SC/ST status',
      'Mother tongue and other languages known',
      'Literacy and education status',
      'Economic activity and occupation',
      'Migration status'
    ],
    purpose: 'To collect detailed demographic and socio-economic information of every individual residing in the country at a specific point in time.',
    plainLanguageExplanation: 'This is the main counting phase. An official will visit your home to ask detailed questions about everyone living there, such as their age, education, and occupation.',
    officialSource: OFFICIAL_SOURCES.find(s => s.id === 'census-india-main')!
  }
];

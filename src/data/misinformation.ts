import { MisinformationVerdict } from './types';
import type { MisinformationClaim } from './types';
import { OFFICIAL_SOURCES } from './official-sources';

export const MISINFORMATION_CLAIMS: MisinformationClaim[] = [
  {
    id: 'misinfo-1',
    claim: 'Census officials will ask for my bank account details and PIN.',
    verdict: MisinformationVerdict.MISINFORMATION,
    officialFact: 'The Census NEVER asks for bank details, PINs, passwords, or financial information.',
    explanation: 'Scammers may pose as Census officials to steal your money. Genuine enumerators will only ask questions from the official Census schedule. If someone asks for financial details, it is a scam.',
    sources: [OFFICIAL_SOURCES.find(s => s.id === 'census-india-main')!]
  },
  {
    id: 'misinfo-2',
    claim: 'I will lose my citizenship if I am not counted in the Census.',
    verdict: MisinformationVerdict.MISINFORMATION,
    officialFact: 'The Census is a statistical exercise to count the population, not a citizenship verification process.',
    explanation: 'Being counted in the Census does not grant or revoke citizenship. It is purely for planning, resource allocation, and understanding demographics.',
    sources: [OFFICIAL_SOURCES.find(s => s.id === 'mha-main')!]
  },
  {
    id: 'misinfo-3',
    claim: 'I have to pay a fee to register for the Census online.',
    verdict: MisinformationVerdict.MISINFORMATION,
    officialFact: 'Census enumeration is completely FREE for all residents of India.',
    explanation: 'There is no fee for self-enumeration or manual enumeration. Anyone asking for payment to complete your Census form is attempting to defraud you.',
    sources: [OFFICIAL_SOURCES.find(s => s.id === 'census-india-main')!]
  },
  {
    id: 'misinfo-4',
    claim: 'I must show my property papers to the enumerator during House Listing.',
    verdict: MisinformationVerdict.MISINFORMATION,
    officialFact: 'No property documents or ownership proofs are required during the House Listing phase.',
    explanation: 'The enumerator only asks questions about the physical structure of the house and amenities. They do not verify legal ownership.',
    sources: [OFFICIAL_SOURCES.find(s => s.id === 'census-india-main')!]
  },
  {
    id: 'misinfo-5',
    claim: 'Census officials will send me an OTP to verify my identity on a phone call.',
    verdict: MisinformationVerdict.MISINFORMATION,
    officialFact: 'Census officials do not verify your identity over phone calls using OTPs.',
    explanation: 'Never share OTPs (One Time Passwords) over the phone. This is a common tactic used by scammers to gain access to your accounts.',
    sources: [OFFICIAL_SOURCES.find(s => s.id === 'cyber-crime-portal')!]
  },
  {
    id: 'misinfo-6',
    claim: 'Census data will be used by the income tax department to check my wealth.',
    verdict: MisinformationVerdict.MISINFORMATION,
    officialFact: 'Individual Census data cannot be accessed by any other government department, including income tax authorities.',
    explanation: 'Under the Census Act 1948, your individual answers are completely confidential and cannot be used against you in any court or by any other agency.',
    sources: [OFFICIAL_SOURCES.find(s => s.id === 'census-act-1948')!]
  }
];

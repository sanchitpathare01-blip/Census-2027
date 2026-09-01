import { ScamPattern, ScamRiskLevel } from './types';

export const SCAM_PATTERNS: ScamPattern[] = [
  {
    id: 'scam-1-aadhaar-phishing',
    name: 'Aadhaar / OTP Phishing Call',
    description: 'Scammers call pretending to be Census officials and ask for your Aadhaar number or an OTP to "verify your identity" or "link your record".',
    indicators: [
      'Caller asks for OTP',
      'Caller threatens exclusion if Aadhaar is not provided over phone',
      'Sense of urgency'
    ],
    riskLevel: ScamRiskLevel.HIGH,
    recommendedAction: 'Disconnect the call immediately. Do not share any OTP. The Census does not conduct phone verification requiring OTPs.',
    reportingChannel: 'National Cyber Crime Reporting Portal (cybercrime.gov.in) or call 1930.',
    example: '"Hello, I am calling from the Census department. Please tell me the OTP sent to your phone to confirm your registration."'
  },
  {
    id: 'scam-2-fake-enumerator',
    name: 'Fake Enumerator at Door',
    description: 'Individuals arriving at your home claiming to be enumerators but failing to produce an official ID card.',
    indicators: [
      'No official Government ID badge',
      'Asks for money',
      'Asks to see property ownership documents or bank statements'
    ],
    riskLevel: ScamRiskLevel.HIGH,
    recommendedAction: 'Ask to see their official Census ID card. If they cannot produce one, refuse to answer questions and notify local police.',
    reportingChannel: 'Local Police Station (112)'
  },
  {
    id: 'scam-3-payment-demand',
    name: 'Demand for Payment',
    description: 'Scammers claiming that you must pay a fee to be counted in the Census or to receive a "Census certificate".',
    indicators: [
      'Demand for cash',
      'Sending UPI payment requests',
      'Claims that the Census is a paid service'
    ],
    riskLevel: ScamRiskLevel.HIGH,
    recommendedAction: 'Do not pay. The Census is completely free. Block the number and report the UPI ID.',
    reportingChannel: 'National Cyber Crime Reporting Portal'
  },
  {
    id: 'scam-4-malicious-link',
    name: 'Fake Self-Enumeration Link (SMS/WhatsApp)',
    description: 'Receiving an SMS or WhatsApp message with a link claiming to be the official self-enumeration portal, but it leads to a fake website designed to steal data.',
    indicators: [
      'Link does not end in .gov.in or .nic.in',
      'Message contains spelling errors',
      'Message threatens penalties for not clicking immediately'
    ],
    riskLevel: ScamRiskLevel.HIGH,
    recommendedAction: 'Do not click the link. Only access the self-enumeration portal by typing the official address directly into your browser.',
    reportingChannel: 'Report the message as spam in WhatsApp/SMS app.'
  },
  {
    id: 'scam-5-document-confiscation',
    name: 'Threat to Confiscate Documents',
    description: 'Scammers threaten that your documents (passport, ration card) will be invalidated if you do not hand them over for "Census verification".',
    indicators: [
      'Request to hand over physical original documents',
      'Aggressive threats regarding legal status'
    ],
    riskLevel: ScamRiskLevel.MEDIUM,
    recommendedAction: 'Refuse to hand over any original documents. Enumerators may only ask to see documents if you choose to refer to them, they never take them away.',
    reportingChannel: 'Local Police Station'
  },
  {
    id: 'scam-6-fake-job-offer',
    name: 'Fake Census Employment Offer',
    description: 'Scammers post fake job listings for "Census Enumerators" and ask for a "processing fee" or "training fee" from applicants.',
    indicators: [
      'Job offer requires upfront payment',
      'Offer letter sent from a public email domain (like Gmail/Yahoo)',
      'No official notification on government websites'
    ],
    riskLevel: ScamRiskLevel.MEDIUM,
    recommendedAction: 'Ignore the offer. Government recruitment does not require payment of bribes or unstructured training fees. Check official ministry websites for real recruitment.',
    reportingChannel: 'National Cyber Crime Reporting Portal'
  }
];

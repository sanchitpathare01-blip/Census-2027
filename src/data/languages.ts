import { LanguageCode, SupportedLanguage } from './types';

export const LANGUAGES: SupportedLanguage[] = [
  {
    code: LanguageCode.EN,
    englishName: 'English',
    nativeName: 'English',
    isRTL: false,
    isActive: true,
    fallbackLanguage: LanguageCode.EN
  },
  {
    code: LanguageCode.HI,
    englishName: 'Hindi',
    nativeName: 'हिन्दी',
    nativeNameDevanagari: 'हिन्दी',
    isRTL: false,
    isActive: true,
    fallbackLanguage: LanguageCode.EN
  },
  {
    code: LanguageCode.MR,
    englishName: 'Marathi',
    nativeName: 'मराठी',
    nativeNameDevanagari: 'मराठी',
    isRTL: false,
    isActive: false,
    fallbackLanguage: LanguageCode.EN
  },
  {
    code: LanguageCode.BN,
    englishName: 'Bengali',
    nativeName: 'বাংলা',
    isRTL: false,
    isActive: false,
    fallbackLanguage: LanguageCode.EN
  },
  {
    code: LanguageCode.TA,
    englishName: 'Tamil',
    nativeName: 'தமிழ்',
    isRTL: false,
    isActive: false,
    fallbackLanguage: LanguageCode.EN
  },
  {
    code: LanguageCode.TE,
    englishName: 'Telugu',
    nativeName: 'తెలుగు',
    isRTL: false,
    isActive: false,
    fallbackLanguage: LanguageCode.EN
  },
  {
    code: LanguageCode.GU,
    englishName: 'Gujarati',
    nativeName: 'ગુજરાતી',
    isRTL: false,
    isActive: false,
    fallbackLanguage: LanguageCode.EN
  },
  {
    code: LanguageCode.KN,
    englishName: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    isRTL: false,
    isActive: false,
    fallbackLanguage: LanguageCode.EN
  },
  {
    code: LanguageCode.ML,
    englishName: 'Malayalam',
    nativeName: 'മലയാളം',
    isRTL: false,
    isActive: false,
    fallbackLanguage: LanguageCode.EN
  },
  {
    code: LanguageCode.PA,
    englishName: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    isRTL: false,
    isActive: false,
    fallbackLanguage: LanguageCode.EN
  }
];

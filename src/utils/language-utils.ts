import { LanguageCode } from '../data/types';
import type { SupportedLanguage } from '../data/types';
import { LANGUAGES } from '../data/languages';
import { UI_TRANSLATIONS } from '../data/translations';

export function getLanguageConfig(code: LanguageCode): SupportedLanguage | undefined {
  return LANGUAGES.find(lang => lang.code === code);
}

export function isLanguageActive(code: LanguageCode): boolean {
  const config = getLanguageConfig(code);
  return config ? config.isActive : false;
}

export function getTextDirection(code: LanguageCode): 'ltr' | 'rtl' {
  const config = getLanguageConfig(code);
  return config && config.isRTL ? 'rtl' : 'ltr';
}

export function getTranslation(key: string, targetLanguage: LanguageCode): string {
  const translationEntry = UI_TRANSLATIONS[key];
  if (!translationEntry) {
    return key;
  }

  // 1. Try requested language
  if (translationEntry[targetLanguage] !== undefined) {
    return translationEntry[targetLanguage] as string;
  }

  // 2. Try fallback language
  const config = getLanguageConfig(targetLanguage);
  if (config && config.fallbackLanguage) {
    if (translationEntry[config.fallbackLanguage] !== undefined) {
      return translationEntry[config.fallbackLanguage] as string;
    }
  }

  // 3. Fallback to English
  if (translationEntry[LanguageCode.EN] !== undefined) {
    return translationEntry[LanguageCode.EN] as string;
  }

  // 4. Return key
  return key;
}

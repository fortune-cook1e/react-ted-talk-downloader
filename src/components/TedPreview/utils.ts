import { LanguageCode, TedTalkData } from '@/types/ted';

/**
 * @description 格式化transcript transcript分为交叉和顺序存放
 * @date 2023-06-12 20:36:33
 * @return {string[]}
 */
export const formatTranslations = (
  translations: TedTalkData['translations'] = [],
  translationMode: 'cross' | 'sequence ' = 'cross',
  languages: LanguageCode[] = [LanguageCode.English]
): string[] => {
  if (!translations) return [];
  const filterTranslations = translations
    .filter(item => languages.includes(item.languageCode))
    .map(i => i.cues);
  const maxCount = filterTranslations[0].length;

  let _translations: string[] = [];

  if (translationMode === 'sequence ') {
    filterTranslations.forEach(t => {
      _translations.push(...t);
    });
  } else {
    for (let i = 0; i < maxCount; i++) {
      for (let j = 0; j < filterTranslations.length; j++) {
        _translations.push(filterTranslations[j][i]);
      }
    }
  }

  return _translations;
};

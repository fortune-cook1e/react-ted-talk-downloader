import { LanguageCode, TedTalkData } from '@/types/ted';

/**
 * @description 格式化transcript transcript分为交叉和顺序存放
 * @date 2023-06-12 20:36:33
 * @return {string[]}
 */
export const formatTranslations = (
  data?: TedTalkData,
  translationMode: 'cross' | 'sequence ' = 'cross',
  languages: LanguageCode[] = [LanguageCode.English]
): string[] => {
  if (!data?.transcript.length) return [];

  const { transcript = [], translations = [] } = data;

  // 将多个国家语言transcript 组装为一个数组 [['a','b'],['好','的']]
  const filterTranscript = translations
    .filter(item => languages.includes(item.language.code))
    .map(i => i.transcript);

  filterTranscript.unshift(transcript);

  const maxCount = transcript.length;

  let _translations: string[] = [];

  if (translationMode === 'sequence ') {
    filterTranscript.forEach(t => {
      _translations.push(...t);
    });
  } else {
    for (let i = 0; i < maxCount; i++) {
      for (let j = 0; j < filterTranscript.length; j++) {
        _translations.push(filterTranscript[j][i]);
      }
    }
  }

  return _translations;
};

export const getDetailByLanguage = (
  data?: TedTalkData,
  language: LanguageCode = LanguageCode.English
) => {
  if (!data) return;
  if (language === LanguageCode.English) return data;
  return data.translations.find(d => d.language.code === language);
};

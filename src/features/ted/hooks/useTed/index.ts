import { LanguageCode, TedTalkData, TedTalkTranslationItem } from '@/types/ted';

export interface Props {
  data?: TedTalkData;
}

export const useTed = ({ data }: Props) => {
  const getDetailByLanguage = (
    talkData = data,
    lang: LanguageCode = LanguageCode.English
  ): TedTalkData | TedTalkTranslationItem | undefined => {
    if (!data) return void 0;
    if (data.language.code === lang) return data;
    return data.translations.find(d => d.language.code === lang);
  };

  const getTranscriptByLang = (lang: LanguageCode): string[] => {
    if (!data) return [];
    if (data?.language.code === lang) return data.transcript;
    const item = data.translations.find(d => d.language.code === lang);
    return item?.transcript ?? [];
  };

  const hasLanguage = (lang: LanguageCode, tedTalkData = data): boolean => {
    if (!tedTalkData) return false;
    if (tedTalkData.language.code === lang) return true;
    return tedTalkData.translations.some(d => d.language.code === lang);
  };

  const primaryLanguageCode = data?.language.code;

  /**
   * @description 格式化transcript transcript分为交叉和顺序存放
   * @date 2023-06-12 20:36:33
   * @return {string[]}
   */
  const formatTranscripts = (
    data?: TedTalkData,
    translationMode: 'cross' | 'sequence ' = 'cross',
    languages: LanguageCode[] = [LanguageCode.English]
  ): string[] => {
    if (!data?.transcript.length) return [];

    const { transcript = [], translations = [] } = data;

    // 将多个国家语言transcript 组装为一个数组 [['a','b'],['好','的']]
    const transcripts = languages
      .map(l => {
        const transcript = getTranscriptByLang(l);
        return transcript;
      })
      .filter(i => Boolean(i));

    const maxCount = transcript.length;

    let _translations: string[] = [];

    // transcript 处理
    // sequence 则按顺序添加
    // cross 则是交叉添加
    if (translationMode === 'sequence ') {
      transcripts.forEach(t => {
        _translations.push(...t);
      });
    } else {
      for (let i = 0; i < maxCount; i++) {
        for (let j = 0; j < transcripts.length; j++) {
          _translations.push(transcripts[j][i]);
        }
      }
    }

    return _translations;
  };

  return {
    getTranscriptByLang,
    hasLanguage,
    primaryLanguageCode,
    formatTranscripts,
    getDetailByLanguage,
  };
};

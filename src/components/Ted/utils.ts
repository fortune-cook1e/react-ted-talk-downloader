import { TedTranslationData } from '@/types/ted';

export const formatOriginTranslationData = (origin: any): TedTranslationData[] => {
  if (!origin) return [];
  const { paragraphs = [] } = origin;

  return paragraphs.map((p: any) => {
    const { cues = [] } = p;
    const translation = cues.map((c: any) => c.text.replace('\n', '')).join(' ');
    return {
      type: 'paragraph',
      translation,
    };
  });
};

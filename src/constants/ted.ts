import { LanguageCode } from '@/types/ted';
import toLower from 'lodash/toLower';

export const TOPICS = ['Technology', 'Entertainment', 'Business', 'Science'];

export const TOPICS_OPTIONS = TOPICS.map(t => {
  return {
    label: t,
    value: t,
  };
});

export const LANGUAGE_OPTIONS = [
  {
    label: '英语',
    value: LanguageCode.English,
  },
  {
    label: '中文',
    value: LanguageCode.Chinese,
  },
];

export const SORT_OPTIONS = [
  {
    label: 'Newest',
    value: 'newest',
  },
  {
    label: 'Oldest',
    value: 'oldest',
  },
  {
    label: 'Most viewed',
    value: 'popular',
  },
];

export const TRANSCRIPT_LANGS_OPTIONS = [
  {
    label: '英文',
    value: LanguageCode.English,
  },
  {
    label: '中文',
    value: LanguageCode.Chinese,
  },
];

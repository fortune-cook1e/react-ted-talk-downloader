export interface TedRequest {
  url: string;
}

export enum TedTalkEnum {
  Preset = 1,
  Custom = 2,
}

export enum LanguageCode {
  English = 'en',
  Chinese = 'zh-cn',
}

export interface TranslationItem {
  endonym: string;
  englishName: string;
  languageCode: LanguageCode;
  cues: string[];
}

export interface TedTalkData {
  id: string;
  title: string;
  name: string;
  slug: string;
  speaker: string;
  thumb: string;
  canonical: string;
  recordedOn: string;
  translations: TranslationItem[];
  description: string;
  duration: number;
  resources: any;
  type: TedTalkEnum;
}

export interface PresetTedListRequest {
  page?: number;
  page_size?: number;
  type?: string;
}

export interface PresetTedListResponse {
  list: TedTalkData[];
  page: number;
  page_size: number;
  total: number;
}

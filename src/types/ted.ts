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

export interface LanguageItem {
  endonym: string;
  name: string;
  code: LanguageCode;
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
  translations: Pick<TedTalkData, 'title' | 'name' | 'speaker' | 'transcript' | 'language'>[];
  transcript: string[];
  language: LanguageItem;
  description: string;
  duration: number;
  resources: any;
  type: TedTalkEnum;
  supportLangs: LanguageItem[];
}

export enum TedSortEnum {
  Newsest = 'newsest',
  Popular = 'popular',
}

export interface PresetTedListRequest {
  page?: number;
  page_size?: number;
  type?: string;
}

export interface TedCrawlerRequest {
  page?: number;
  language?: LanguageCode;
  sort?: TedSortEnum;
  topics?: string;
  keyword?: string;
  transcript_langs?: LanguageCode[];
}

export interface PresetTedListResponse {
  list: TedTalkData[];
  page: number;
  page_size: number;
  total: number;
}

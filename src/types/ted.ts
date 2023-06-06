export interface TedVideoData {
  id: string;
  presenterDisplayName: string;
  recordedOn: string;
  slug: string;
  title: string;
  description: string;
  primaryImageSet: {
    url: string;
  }[];
  playerData: string;
}

export interface TedTranslationData {
  type: 'paragraph';
  translation: string;
}

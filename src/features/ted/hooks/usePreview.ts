import { TedPreviewRefHandler } from '@/components/TedPreview';
import { TedTalkData } from '@/types/ted';
import { useRef, useState } from 'react';

export const usePreview = () => {
  const [previewData, setPreviewData] = useState<TedTalkData | undefined>();
  const previewRef = useRef<TedPreviewRefHandler>(null);

  return {
    previewData,
    setPreviewData,
    previewRef,
  };
};

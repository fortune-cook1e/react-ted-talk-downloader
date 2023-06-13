import { LanguageCode, TedTalkData } from '@/types/ted';
import { CSSProperties, FC, useMemo, useRef } from 'react';
import { Card } from 'antd';
import { ExpandOutlined, DownloadOutlined } from '@ant-design/icons';
import TedPreview, { TedPreviewRefHandler } from '../TedPreview';
import { Space } from 'antd';

const { Meta } = Card;

export interface Props {
  data: TedTalkData;
  style?: CSSProperties;
}

const TedCard: FC<Props> = ({ data }) => {
  const { thumb, description, title, speaker, recordedOn } = data;
  const previewRef = useRef<TedPreviewRefHandler>(null);

  const preview = () => {
    previewRef.current?.open();
  };

  const actions = [
    <ExpandOutlined key="preview" onClick={preview} />,
    <DownloadOutlined key="download" />,
  ];

  const dualLanguage = useMemo(() => {
    let languages = [LanguageCode.Chinese, LanguageCode.English];
    data.translations.forEach(item => {
      if (item.languageCode === LanguageCode.English) {
        languages = languages.filter(l => l === LanguageCode.English);
      }
      if (item.languageCode === LanguageCode.Chinese) {
        languages = languages.filter(l => l === LanguageCode.Chinese);
      }
    });
    return languages.length === 0;
  }, [data]);

  return (
    <>
      {/* <Card
        hoverable
        cover={<img src={thumb} alt={title} />}
        actions={[<ExpandOutlined key="preview" onClick={preview} />]}
      >
        <Meta
          title={title}
          description={<span className="line-clamp-2">{description}</span>}
        ></Meta>
      </Card> */}

      <div className="w-full rounded-md cursor-pointer border-[1px] border-slate-200 transition-all hover:shadow-lg divide-y divide-slate-200">
        <div className="mt-[-1px]">
          <img src={thumb} alt={title} className="block rounded-t-md" />
        </div>
        <div className="p-2  border-gray-200">
          <div className="flex justify-between italic mb-1 text-slate-500">
            <span>{speaker}</span>
          </div>
          <p className="font-bold text-base mb-1 line-clamp-3">
            <span className="mr-2">{title}</span>
            {dualLanguage && (
              <span className="inline-block w-6 h-6 text-center bg-cyan-200 rounded-full">D</span>
            )}
          </p>
          <p className="text-slate-500">
            <span className="font-bold">Posted </span>
            <span>{recordedOn}</span>
          </p>
        </div>

        <div className="flex items-center">
          {actions.map((action, index, self) => {
            return (
              <div
                key={index}
                className={
                  'text-lg text-slate-400	py-3 flex-1 flex items-center justify-center ' +
                  (index !== self.length - 1 ? 'border-e-2 border-gray-200' : '')
                }
              >
                {action}
              </div>
            );
          })}
        </div>
      </div>

      <TedPreview ref={previewRef} data={data} />
    </>
  );
};

export default TedCard;

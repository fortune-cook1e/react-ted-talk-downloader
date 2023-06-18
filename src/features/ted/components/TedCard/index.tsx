import { LanguageCode, TedTalkData } from '@/types/ted';
import { CSSProperties, FC, useMemo, useRef } from 'react';
import { ExpandOutlined, DownloadOutlined, MenuOutlined } from '@ant-design/icons';
import TedPreview, { TedPreviewRefHandler } from '../TedPreview';
import { Tag, Tooltip, Dropdown, message } from 'antd';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PreviewDocument from '../TedPreview/PreviewDocument';
import { useTed } from '../../hooks/useTed';
import type { MenuProps } from 'antd';
import { saveAsPreset, deleteTed } from '@/apis/ted';
import { useRequest } from 'ahooks';

export interface Props {
  data: TedTalkData;
  style?: CSSProperties;
}

const TedCard: FC<Props> = ({ data }) => {
  const { thumb, description, title, speaker, recordedOn } = data;
  const previewRef = useRef<TedPreviewRefHandler>(null);

  const { getTranscriptByLang, hasLanguage } = useTed({ data });

  const preview = () => {
    previewRef.current?.open();
  };

  const { run: saveAsPresetRunner } = useRequest(() => saveAsPreset(data), {
    manual: true,
    onSuccess() {
      message.success('保存成功');
    },
  });

  const items: MenuProps['items'] = [
    {
      label: 'Delete',
      key: 'delete',
      onClick() {},
    },
    {
      label: 'Save as preset',
      key: 'save',
      onClick: saveAsPresetRunner,
    },
  ];

  const actions = [
    <ExpandOutlined
      key="preview"
      onClick={preview}
      className="cursor-pointer hover:text-sky-400"
    />,

    <PDFDownloadLink
      key="download"
      style={{ marginLeft: '8px' }}
      document={<PreviewDocument data={data} />}
      fileName={`${data?.slug}.pdf`}
    >
      <DownloadOutlined key="download" className="cursor-pointer hover:text-sky-400" />
    </PDFDownloadLink>,
  ];

  const supportLangs = data.supportLangs.map(l => l.endonym).join(',');
  const transcriptLangs = [data.language.endonym]
    .concat(...data.translations.map(t => t.language.endonym))
    .join(',');
  const hasCn = hasLanguage(LanguageCode.Chinese);

  // 中英文字幕对的上
  // Tip: 因为存在中英文翻译对不上的情况 所以通过判断transcript长度
  const cn2EnCorrect =
    getTranscriptByLang(LanguageCode.Chinese).length ===
    getTranscriptByLang(LanguageCode.English).length;

  return (
    <>
      <div className="w-full rounded-md cursor-pointer border-[1px] border-slate-200 transition-all hover:shadow-lg divide-y divide-slate-200">
        <div className="mt-[-1px] relative">
          <Dropdown className="absolute top-4 right-4" menu={{ items }}>
            <MenuOutlined className="text-sky-500 text-lg" />
          </Dropdown>
          <img src={thumb} alt={title} className="block rounded-t-md" />
        </div>
        <div className="p-2  border-gray-200">
          <div className="flex justify-between italic mb-1 text-slate-500">
            <span>{speaker}</span>
          </div>
          <p className="font-bold text-base mb-1 line-clamp-3">
            <span className="mr-2">{title}</span>
          </p>
          <div className="text-slate-500 mb-1">
            <span className="font-bold">Posted </span>
            <span>{recordedOn}</span>
          </div>

          <div className="flex items-center">
            <Tooltip title={supportLangs}>
              <Tag color="magenta">Support</Tag>
            </Tooltip>
            <Tooltip title={transcriptLangs}>
              <Tag color="orange">Transcript</Tag>
            </Tooltip>
            {hasCn && <Tag color="green">Cn</Tag>}
            {cn2EnCorrect && <Tag color="blue">Cn2English</Tag>}
          </div>
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

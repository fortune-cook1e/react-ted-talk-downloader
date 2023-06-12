import { LanguageCode, TedTalkData } from '@/types/ted';
import { forwardRef, useImperativeHandle, useMemo } from 'react';
import { Button, Modal } from 'antd';
import { useBoolean } from 'ahooks';
import { formatTranslations } from './utils';
import PreviewDocument from './PreviewDocument';

import { PDFViewer, PDFDownloadLink, usePDF } from '@react-pdf/renderer';

interface Props {
  data?: TedTalkData;
  languages?: LanguageCode[];
  translationMode?: 'cross' | 'sequence';
}

export interface TedPreviewRefHandler {
  open: () => void;
}

const TedPreview = forwardRef<TedPreviewRefHandler, Props>(
  ({ data, languages = [LanguageCode.English], translationMode = 'cross' }, ref) => {
    const [isOpen, { toggle, setTrue, setFalse }] = useBoolean(false);

    const [instance, methods] = usePDF({
      document: <PreviewDocument data={data} />,
    });

    useImperativeHandle(ref, () => {
      return {
        open: () => setTrue(),
      };
    });

    const onCancel = () => setFalse();

    const transcript = useMemo(() => {
      return formatTranslations(data?.translations, 'cross', [
        LanguageCode.English,
        LanguageCode.Chinese,
      ]);
    }, [data]);

    return (
      <Modal
        open={isOpen}
        title={data?.title}
        onCancel={setFalse}
        width="1000px"
        centered={false}
        bodyStyle={{ height: '500px' }}
        footer={[
          <Button key="cancel" onClick={setFalse}>
            取消
          </Button>,
          <Button
            key="download"
            type="primary"
            loading={instance.loading}
            href={instance.url || ''}
            download={`${data?.slug}.pdf`}
          >
            {instance.loading ? '下载中' : '下载'}
          </Button>,
        ]}
      >
        <PDFViewer style={{ height: '100%', width: '100%' }}>
          <PreviewDocument data={data} />
        </PDFViewer>
      </Modal>
    );
  }
);

TedPreview.displayName = 'TedPreview';

export default TedPreview;

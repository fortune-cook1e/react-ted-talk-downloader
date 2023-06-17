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

    useImperativeHandle(ref, () => {
      return {
        open: () => setTrue(),
      };
    });

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

          <PDFDownloadLink
            key="download"
            style={{ marginLeft: '8px' }}
            document={<PreviewDocument data={data} />}
            fileName={`${data?.slug}.pdf`}
          >
            {({ loading }) => (
              <Button loading={loading} type="primary">
                {loading ? '下载中' : '下载'}
              </Button>
            )}
          </PDFDownloadLink>,
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

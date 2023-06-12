import { TedTalkData } from '@/types/ted';
import { FC, useRef } from 'react';
import { Card } from 'antd';
import { ExpandOutlined } from '@ant-design/icons';
import TedPreview, { TedPreviewRefHandler } from '../TedPreview';

const { Meta } = Card;

export interface Props {
  data: TedTalkData;
}

const TedCard: FC<Props> = ({ data }) => {
  const { thumb, description, title } = data;
  const previewRef = useRef<TedPreviewRefHandler>(null);

  const preview = () => {
    previewRef.current?.open();
  };

  return (
    <>
      <Card
        hoverable
        cover={<img src={thumb} alt={title} />}
        actions={[<ExpandOutlined key="preview" onClick={preview} />]}
      >
        <Meta
          title={title}
          description={<span className="line-clamp-2">{description}</span>}
        ></Meta>
      </Card>

      <TedPreview ref={previewRef} data={data} />
    </>
  );
};

export default TedCard;

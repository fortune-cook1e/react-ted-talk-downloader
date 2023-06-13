import { TedTalkData } from '@/types/ted';
import { Row, Col, Pagination } from 'antd';
import { FC } from 'react';
import TedCard from '@/components/TedCard';

export interface Props {
  data?: TedTalkData[];
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number, pageSize: number) => void;
}

const CardLayout: FC<Props> = ({ data = [], page, pageSize, total, onPageChange }) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        {data.map(d => {
          return (
            <Col key={d.id} span={8}>
              <TedCard key={d.id} data={d}></TedCard>
            </Col>
          );
        })}
      </Row>

      <div className="flex justify-end">
        <Pagination
          total={total}
          current={page}
          pageSize={pageSize}
          onChange={(_page, _pageSize) => {
            if (_page !== page || _pageSize !== pageSize) {
              onPageChange(_page, _pageSize);
            }
          }}
        />
      </div>
    </>
  );
};

export default CardLayout;

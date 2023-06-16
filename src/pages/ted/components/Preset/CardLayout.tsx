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

const CardLayout: FC<Props> = ({ data = [], page = 1, pageSize = 10, total = 0, onPageChange }) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        {data.map(d => {
          return (
            <Col key={d.id} md={12} xs={24} lg={8}>
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

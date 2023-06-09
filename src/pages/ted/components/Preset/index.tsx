import { FC, useState } from 'react';
import { Spin, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { useRequest } from 'ahooks';
import { getPresetTedList } from '@/apis/ted';
import { TedTalkData } from '@/types/ted';
import EmptyWrapper from '@/components/EmptyWrapper';
import TedCardLayout from '@/features/ted/components/TedCardLayout';

export enum LayoutType {
  Table = 'table',
  Card = 'card',
}

const Preset: FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [layout, setLayout] = useState<LayoutType>(LayoutType.Card);

  const { loading, data } = useRequest(
    () =>
      getPresetTedList({
        page,
        page_size: pageSize,
      }),
    {
      refreshDeps: [page, pageSize],
      onSuccess(data) {
        if (!data) return;
        setTotal(data.total);
      },
    }
  );

  const columns: ColumnsType<TedTalkData> = [
    {
      title: '序号',
      dataIndex: 'key',
      rowScope: 'row',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
  ];

  return (
    <EmptyWrapper loading={loading} isEmpty={data?.list.length === 0}>
      <div>
        <div className="flex flex-row-reverse"></div>
        <div>
          {layout === LayoutType.Table ? (
            <Table<TedTalkData>
              columns={columns}
              rowKey="id"
              loading={loading}
              dataSource={data?.list}
              pagination={{
                total,
                pageSize,
                current: page,
                showQuickJumper: true,
                onChange(_page, _pageSize) {
                  if (page !== _page || pageSize !== _pageSize) {
                    setPage(_page);
                    setPageSize(_pageSize);
                  }
                },
              }}
            ></Table>
          ) : (
            <Spin spinning={loading}>
              <TedCardLayout
                data={data?.list}
                total={total}
                page={page}
                pageSize={pageSize}
                onPageChange={(page, pageSize) => {
                  setPage(page);
                  setPageSize(pageSize);
                }}
              />
            </Spin>
          )}
        </div>
      </div>
    </EmptyWrapper>
  );
};

export default Preset;

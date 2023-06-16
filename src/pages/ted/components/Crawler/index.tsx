import { useRequest } from 'ahooks';
import CrawlerForm from './CrawlerForm';
import { getCrawlerTedList } from '@/apis/ted';
import { TedCrawlerRequest } from '@/types/ted';
import { Spin } from 'antd';
import EmptyWrapper from '@/components/EmptyWrapper';
import TedCardLayout from '@/features/ted/components/TedCardLayout';

const Crawler = () => {
  const {
    loading,
    run: getCrawlerTedListRunner,
    data,
  } = useRequest((data?: TedCrawlerRequest) => getCrawlerTedList(data), {
    manual: true,
  });

  const onSearch = (values: Omit<TedCrawlerRequest, 'page'>) => {
    getCrawlerTedListRunner(values);
  };

  return (
    <div>
      <CrawlerForm onSearch={onSearch} />
      <EmptyWrapper isEmpty={!data?.list.length}>
        <Spin spinning={loading}>
          <TedCardLayout className="py-8" data={data?.list} renderPagination={false} />
        </Spin>
      </EmptyWrapper>
    </div>
  );
};

export default Crawler;

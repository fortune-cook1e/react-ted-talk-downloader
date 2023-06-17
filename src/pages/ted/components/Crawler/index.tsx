import { useRequest } from 'ahooks';
import CrawlerForm from './CrawlerForm';
import { getCrawlerTedList } from '@/apis/ted';
import { TedCrawlerRequest } from '@/types/ted';
import EmptyWrapper from '@/components/EmptyWrapper';
import TedCardLayout from '@/features/ted/components/TedCardLayout';

const Crawler = () => {
  const {
    loading,
    run: getCrawlerTedListRunner,
    data,
    cancel,
  } = useRequest((data?: TedCrawlerRequest) => getCrawlerTedList(data), {
    manual: true,
  });

  const onSearch = (values: Omit<TedCrawlerRequest, 'page'>) => {
    getCrawlerTedListRunner(values);
  };

  return (
    <div>
      <CrawlerForm loading={loading} onSearch={onSearch} onCancel={cancel} />
      <EmptyWrapper loading={loading} isEmpty={!data?.list.length}>
        <TedCardLayout className="py-8" data={data?.list} renderPagination={false} />
      </EmptyWrapper>
    </div>
  );
};

export default Crawler;

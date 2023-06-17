import { EmptyProps } from 'antd/lib/empty';
import { FC, ReactNode } from 'react';
import { Empty, Spin } from 'antd';

interface EmptyWrapperProps extends EmptyProps {
  isEmpty: boolean;
  loading?: boolean;
}

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="w-full min-h-[400px] flex items-center justify-center">{children}</div>;
};

const EmptyWrapper: FC<EmptyWrapperProps> = ({ isEmpty, loading = false, children }) => {
  const renderContent = () => {
    if (loading)
      return (
        <Container>
          <Spin />
        </Container>
      );
    return isEmpty ? (
      <Container>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
      </Container>
    ) : (
      children
    );
  };
  return renderContent();
};

export default EmptyWrapper;

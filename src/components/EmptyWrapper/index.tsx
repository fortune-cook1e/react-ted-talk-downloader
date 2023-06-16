import { EmptyProps } from 'antd/lib/empty';
import { FC } from 'react';
import { Empty } from 'antd';

interface EmptyWrapperProps extends EmptyProps {
  isEmpty: boolean;
}

const EmptyWrapper: FC<EmptyWrapperProps> = ({ isEmpty, children }) => {
  return <>{isEmpty ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty> : children}</>;
};

export default EmptyWrapper;

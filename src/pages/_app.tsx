import '@/styles/index.css';
import type { AppProps } from 'next/app';
import dayjs from 'dayjs';
import { StyleProvider } from '@ant-design/cssinjs';
import 'dayjs/locale/zh-cn';

import zhCN from 'antd/locale/zh_CN';
dayjs.locale('zh-cn');

import { ConfigProvider } from 'antd';
import AppLayout from '@/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <ConfigProvider locale={zhCN}>
        <StyleProvider hashPriority="high">
          <Component {...pageProps} />
        </StyleProvider>
      </ConfigProvider>
    </AppLayout>
  );
}

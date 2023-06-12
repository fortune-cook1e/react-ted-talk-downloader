import { FC, useMemo, useState } from 'react';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';

import Preset from './components/Preset';

export enum Type {
  Preset = 'preset',
  Search = 'search',
}

const Ted: FC = () => {
  const [type, setType] = useState<Type>(Type.Preset);

  const items: TabsProps['items'] = useMemo(() => {
    return [
      {
        key: Type.Preset,
        children: <Preset />,
        label: '预设模块',
      },
      {
        label: '单篇搜索',
        key: Type.Search,
        children: 'gaga',
      },
    ];
  }, []);

  const onTabChange = (t: string) => {
    setType(t as Type);
  };

  return (
    <main>
      <Tabs activeKey={type} items={items} onChange={onTabChange} destroyInactiveTabPane></Tabs>
    </main>
  );
};

export default Ted;

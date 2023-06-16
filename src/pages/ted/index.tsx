import { FC, useMemo, useState } from 'react';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';

import Preset from './components/Preset';
import Crawler from './components/Crawler';

export enum Type {
  Preset = 'preset',
  Crawler = 'crawler',
}

const Ted: FC = () => {
  const [type, setType] = useState<Type>(Type.Crawler);

  const items: TabsProps['items'] = useMemo(() => {
    return [
      {
        key: Type.Preset,
        children: <Preset />,
        label: 'Preset',
      },
      {
        label: 'Crawler',
        key: Type.Crawler,
        children: <Crawler />,
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

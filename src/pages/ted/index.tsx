import { FC, useMemo, useState } from 'react';
import { Radio, RadioGroup, Box, Stack } from '@chakra-ui/react';
import Preset from './components/Preset';

export enum Type {
  Preset = 'preset',
  Search = 'search',
}

const RADIO_OPTIONS = [
  {
    label: '预设Ted Talk',
    value: Type.Preset,
    component: Preset,
  },
  {
    label: '单篇搜索',
    value: Type.Search,
    component: Preset,
  },
];

const Ted: FC = () => {
  const [type, setType] = useState<Type>(Type.Preset);

  const RenderComponent: any = useMemo(() => {
    if (!type) return null;
    return RADIO_OPTIONS.find(r => r.value === type)?.component;
  }, [type]);

  return (
    <Box p={6}>
      <RadioGroup onChange={v => setType(v as Type)} value={type}>
        <Stack direction="row">
          {RADIO_OPTIONS.map(r => {
            return (
              <Radio key={r.value} value={r.value}>
                {r.label}
              </Radio>
            );
          })}
        </Stack>
      </RadioGroup>

      <Box>
        <RenderComponent></RenderComponent>
      </Box>
    </Box>
  );
};

export default Ted;

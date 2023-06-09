import { Form, Select, Input, Button, Space } from 'antd';
import { CSSProperties, FC } from 'react';
import {
  LANGUAGE_OPTIONS,
  SORT_OPTIONS,
  TOPICS_OPTIONS,
  TRANSCRIPT_LANGS_OPTIONS,
} from '@/constants/ted';
import { LanguageCode, TedCrawlerRequest } from '@/types/ted';

interface CrawlerFormProps {
  loading: boolean;
  onCancel: () => void;
  onSearch: (values: Omit<TedCrawlerRequest, 'page'>) => void;
}

const formItemStyles: CSSProperties = {
  width: '150px',
};

const { Item } = Form;

const CrawlerForm: FC<CrawlerFormProps> = ({ onSearch, loading, onCancel }) => {
  const [form] = Form.useForm<Omit<TedCrawlerRequest, 'page'>>();

  const handleSearch = () => {
    onSearch(form.getFieldsValue());
  };

  return (
    <Form
      layout="inline"
      form={form}
      initialValues={{
        transcript_langs: [LanguageCode.Chinese, LanguageCode.English],
        language: LanguageCode.Chinese,
      }}
    >
      <Item name="topics">
        <Select
          style={formItemStyles}
          options={TOPICS_OPTIONS}
          placeholder="请选择主题类型"
          allowClear
        ></Select>
      </Item>
      <Item name="language">
        <Select
          style={formItemStyles}
          options={LANGUAGE_OPTIONS}
          placeholder="请选择语言"
          allowClear
        ></Select>
      </Item>
      <Item name="sort">
        <Select
          style={formItemStyles}
          options={SORT_OPTIONS}
          placeholder="请选择分类"
          allowClear
        ></Select>
      </Item>

      <Item name="keyword">
        <Input style={formItemStyles} placeholder="请输入关键词" allowClear></Input>
      </Item>

      <Item name="transcript_langs">
        <Select
          mode="multiple"
          style={formItemStyles}
          options={TRANSCRIPT_LANGS_OPTIONS}
          placeholder="请选择翻译语言"
          allowClear
        ></Select>
      </Item>

      <Item>
        <Space>
          <Button type="primary" loading={loading} onClick={handleSearch}>
            Search
          </Button>
          <Button type="default" onClick={onCancel}>
            Cancel
          </Button>
        </Space>
      </Item>
    </Form>
  );
};

export default CrawlerForm;

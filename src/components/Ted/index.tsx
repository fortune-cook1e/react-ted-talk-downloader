import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import { useRequest } from 'ahooks';
import { getTedHtml } from '@/apis/ted';
import { useEffect, useState } from 'react';
import cheerio from 'cheerio';
import { TedTranslationData, TedVideoData } from '@/types/ted';
import { formatOriginTranslationData } from './utils';
import Preview from './components/Preview';

interface FormValues {
  url: string;
}

const Ted = () => {
  const [videoData, setVideoData] = useState<TedVideoData>({
    id: '',
    presenterName: '',
    recordedOn: '',
    slug: '',
    title: '',
    description: '',
  });

  const [translation, setTranslation] = useState<TedTranslationData[]>([]);

  const [done, setDone] = useState(false);
  const [preview, setPreview] = useState(false);

  const initialValues: FormValues = {
    url: 'https://www.ted.com/talks/hanako_sawada_test_yourself_can_you_tell_the_difference_between_music_and_noise/transcript',
  };

  // 解析ted html 获取ted相关信息
  const parseTedHtml = (html: string) => {
    const $ = cheerio.load(html);
    const scriptData = $('script#__NEXT_DATA__').html();
    if (!scriptData) return;
    const jsonData = JSON.parse(scriptData);
    setVideoData(jsonData.props.pageProps.videoData);

    const translation = formatOriginTranslationData(
      jsonData.props.pageProps.transcriptData.translation
    );
    setTranslation(translation);

    setDone(true);

    console.log({ translation });
  };

  const {
    data,
    loading,
    run: getTranscriptByYtbVideoIdRunner,
  } = useRequest((url: string) => getTedHtml(url), {
    manual: true,
    onSuccess(data: string) {
      if (!data) return;
      parseTedHtml(data);
    },
  });

  const onSubmit = (values: FormValues) => {
    getTranscriptByYtbVideoIdRunner(values.url);
  };

  const onPreview = () => setPreview(true);

  return (
    <>
      <Flex bg="gray.100" align="center" justify="center" h="100vh">
        <Box bg="white" p={6} rounded="md" w={64}>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl isInvalid={!!errors.url && touched.url}>
                    <FormLabel htmlFor="url">Ted Talk Url</FormLabel>
                    <Field
                      as={Input}
                      id="url"
                      name="url"
                      variant="filled"
                      validate={(value: string) => {
                        let error;

                        if (!value) {
                          error = 'Youtube url should not be empty';
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.url}</FormErrorMessage>
                  </FormControl>
                  <Button type="submit" colorScheme="purple" width="full" isLoading={loading}>
                    Submit
                  </Button>
                  {done && <Button onClick={onPreview}>Preview</Button>}
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
      </Flex>

      {done && (
        <Preview
          isOpen={preview}
          videoData={videoData}
          translation={translation}
          onClose={() => setPreview(false)}
        />
      )}
    </>
  );
};

export default Ted;

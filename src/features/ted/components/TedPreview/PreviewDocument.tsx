import { FC, useMemo } from 'react';

import { Page, Text, View, Document, StyleSheet, Font, Image, Link } from '@react-pdf/renderer';
import { LanguageCode, TedTalkData } from '@/types/ted';
import { useTed } from '../../hooks/useTed';

interface Props {
  data?: TedTalkData;
}

Font.register({
  family: 'Yahei',
  src: '//db.onlinewebfonts.com/t/e63653407669814f5b0eb9bbdc175f77.ttf',
});

Font.register({
  family: 'Times',
  src: 'https://fonts.cdnfonts.com/s/57197/times.woff',
});

Font.register({
  family: 'Times bold',
  src: 'https://fonts.cdnfonts.com/s/18465/TTimesb.woff',
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 10,
  },
  header: {
    padding: '2 0',
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #000',
    borderBottom: '1px solid #000',
  },
  header_left: {
    flex: 3,
    paddingLeft: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Yahei',
    fontSize: 14,
  },
  header_right: {
    flex: 1,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1px solod #000',
  },
  content: {
    flex: 3,
  },
  ted: {
    fontSize: 72,
    fontFamily: 'Times bold',
    color: '#e62b1e',
    paddingLeft: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Yahei',
    padding: '0 10',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Yahei',
    padding: '0 10',
    marginBottom: 10,
    textAlign: 'center',
  },
  transcript: {
    padding: '0 10 10 10',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'justify',
    fontFamily: 'Yahei',
    lineHeight: 2,
  },
  summary: {
    flex: 1,
    borderLeft: '1px solid #000',
  },
});

Font.registerHyphenationCallback((word: string) => {
  // FixBug: 处理中文换行问题Bug
  const reg = /[\u4e00-\u9fa5]/gm;

  if (!word.match(reg)) {
    return [word];
  }

  if (word.length === 1) {
    return [word];
  }

  return Array.from(word)
    .map(char => [char, ''])
    .reduce((arr, current) => {
      arr.push(...current);
      return arr;
    }, []);
});

const PreviewDocument: FC<Props> = ({ data }) => {
  const { formatTranscripts, getDetailByLanguage } = useTed({ data });

  const transcript = useMemo(() => {
    return formatTranscripts(data, 'cross', [LanguageCode.English, LanguageCode.Chinese]);
  }, [data]);

  const cnDetail = getDetailByLanguage(data, LanguageCode.Chinese);
  const enDetail = getDetailByLanguage(data, LanguageCode.English);

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <View style={styles.header_left}>
            <Text>Day.</Text>
            <Text>Date.</Text>
          </View>
          <View style={styles.header_right}></View>
        </View>

        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.ted}>
              <Text>TED</Text>
            </View>
            {cnDetail && (
              <View style={styles.title}>
                <Text>{cnDetail?.title}</Text>
              </View>
            )}
            <View style={styles.subtitle}>
              <Text>{enDetail?.title}</Text>
            </View>

            <View style={styles.transcript}>
              {transcript.map((t, index) => {
                return (
                  <Text style={styles.text} key={index}>
                    {t}
                  </Text>
                );
              })}
            </View>
          </View>

          <View style={styles.summary}></View>
        </View>
      </Page>
    </Document>
  );
};

export default PreviewDocument;

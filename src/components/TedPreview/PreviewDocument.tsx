import { FC, useMemo } from 'react';

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  PDFViewer,
  Image,
  Link,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import { LanguageCode, TedTalkData } from '@/types/ted';
import { formatTranslations } from './utils';

interface Props {
  data?: TedTalkData;
}

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

Font.register({
  family: 'Open Sans',
  src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
});

Font.register({
  family: 'Lato',
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

Font.register({
  family: 'Lato Italic',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
});

Font.register({
  family: 'Lato Bold',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transcript: {
    flex: 3,
    padding: 10,
  },
  summary: {
    flex: 1,
    borderLeft: '1px solid #000',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#000',
    textDecoration: 'none',
    fontFamily: 'Lato Bold',
  },
  author: {
    fontSize: 16,
    textAlign: 'center',
    margin: '8 0 12',
  },
  url: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Lato',
  },
  text: {
    marginTop: 16,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },

  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
});

const PreviewDocument: FC<Props> = ({ data }) => {
  const transcript = useMemo(() => {
    return formatTranslations(data?.translations, 'cross', [
      LanguageCode.English,
      LanguageCode.Chinese,
    ]);
  }, [data]);
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.transcript}>
          <Link style={styles.title} src={data?.canonical || ''}>
            {data?.title}
          </Link>
          <Text style={styles.author}>Author: {data?.speaker}</Text>

          <Image src={data?.thumb}></Image>

          {transcript.map(t => {
            return (
              <Text style={styles.text} key={t}>
                {t}
              </Text>
            );
          })}
        </View>

        <View style={styles.summary}>Summary</View>
      </Page>
    </Document>
  );
};

export default PreviewDocument;
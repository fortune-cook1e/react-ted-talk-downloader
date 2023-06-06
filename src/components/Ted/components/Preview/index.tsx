import { TedTranslationData, TedVideoData } from '@/types/ted';
import { FC } from 'react';
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
} from '@react-pdf/renderer';
import { Modal, ModalBody, ModalOverlay, ModalContent } from '@chakra-ui/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  videoData: TedVideoData;
  translation: TedTranslationData[];
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
    // paddingBottom: 65,
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

const Preview: FC<Props> = ({ isOpen = false, videoData, translation, onClose }) => {
  let playerData = JSON.parse(videoData.playerData);
  console.log({ videoData, translation, playerData });
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent className="h-full">
        <PDFViewer style={{ height: '100%' }}>
          <Document>
            <Page style={styles.body}>
              <View style={styles.transcript}>
                <Link style={styles.title} src={playerData.canonical}>
                  {videoData.title}
                </Link>
                <Text style={styles.author}>Author: {videoData.presenterDisplayName}</Text>

                <Image src={videoData.primaryImageSet[0].url}></Image>

                {translation.map(t => {
                  return (
                    <Text style={styles.text} key={t.translation}>
                      {t.translation}
                    </Text>
                  );
                })}
              </View>

              <View style={styles.summary}>Summary</View>
            </Page>
          </Document>
        </PDFViewer>
      </ModalContent>
    </Modal>
  );
};

export default Preview;

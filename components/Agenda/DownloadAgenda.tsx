'use client';
import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  PDFDownloadLink,
  PDFViewer,
} from '@react-pdf/renderer';
import Button from '../Buttons/button';

Font.register({
  family: 'Open Sans',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf',
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf',
      fontWeight: 600,
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-800.ttf',
      fontWeight: 800,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#1B1130',
    padding: 40,
    color: '#fff',
    fontFamily: 'Open Sans',
  },
  logo: {
    width: 90,
    marginBottom: 10,
    alignSelf: 'center',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 800,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#E74694',
  },
  date: {
    textAlign: 'center',
    fontSize: 13,
    marginTop: 6,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E74694',
    paddingBottom: 6,
    marginTop: 12,
  },
  headerText: {
    fontSize: 12,
    fontWeight: 600,
    color: '#E74694',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#666',
    paddingVertical: 8,
  },
  
  timeCol: { width: '17%', fontSize: 12, paddingRight: 6 },
  sessionCol: { width: '50%', paddingHorizontal: 10 },
  speakerCol: { width: '33%', fontSize: 12, paddingLeft: 6 },
  sessionTitle: { fontSize: 13, fontWeight: 600, color: '#fff' },
  sessionType: { fontSize: 10, color: '#bbb' },
  speakerName: { fontSize: 12, fontWeight: 600, color: '#fff' },
  speakerTitle: { fontSize: 10, color: '#ccc' },
 
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#aaa',
  },
});


const cleanAgenda = (agenda: any[]) => {
  let tz: string | null = null;
  const processed = agenda.map((item) => {
    const tzMatch = item.time.match(/\b(?!AM|PM)([A-Z]{2,4})\b/g);
    if (tzMatch && !tz) tz = tzMatch[0];
    return { ...item, time: item.time.replace(/\b(?!AM|PM)([A-Z]{2,4})\b/g, '') };
  });
  return { processed, tz };
};

const AgendaPDF = ({ city }: { city: any }) => {
  const { processed, tz } = cleanAgenda(city.agenda);
  return (
    <Document>
      <Page style={styles.page}>
        
        <View style={styles.header}>
          <Image src="/img/logos/2025-logo.png" style={styles.logo} />
          <Text style={styles.title}>
            {city.name}, {city.country}
          </Text>
          <Text style={styles.subtitle}>Conference Agenda</Text>
          <Text style={styles.date}>
            {city.date} {tz && `(${tz})`}
          </Text>
        </View>
        
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, { width: '17%' }]}>Time</Text>
          <Text style={[styles.headerText, { width: '50%' }]}>Session</Text>
          <Text style={[styles.headerText, { width: '33%' }]}>Speaker</Text>
        </View>
     
        {processed.map((item, i) => (
          <View style={styles.row} key={i} wrap={false}>
            <Text style={styles.timeCol}>{item.time}</Text>
            <View style={styles.sessionCol}>
              <Text style={styles.sessionTitle}>{item.session}</Text>
              <Text style={styles.sessionType}>{item.type}</Text>
            </View>
            <View style={styles.speakerCol}>
              {Array.isArray(item.speaker)
                ? item.speaker.map((id: any, j: React.Key | null | undefined) => {
                    const sp = city.speakers.find((s: any) => s.id === id);
                    return (
                      <View key={j}>
                        <Text style={styles.speakerName}>{sp?.name}</Text>
                        <Text style={styles.speakerTitle}>{sp?.title}</Text>
                      </View>
                    );
                  })
                : (() => {
                    const sp = city.speakers.find(
                      (s: any) => s.id === item.speaker
                    );
                    return (
                      <>
                        <Text style={styles.speakerName}>{sp?.name}</Text>
                        <Text style={styles.speakerTitle}>{sp?.title}</Text>
                      </>
                    );
                  })()}
            </View>
          </View>
        ))}
     
        <Text style={styles.footer}>
        AsyncAPI Conference © {new Date().getFullYear()}
        </Text>
      </Page>
    </Document>
  );
};

export const PdfViewer = ({ city }: { city: any }) => (
  <div className="w-full flex justify-center h-full">
    <PDFViewer className="w-[85%] h-[90vh]">
      <AgendaPDF city={city} />
    </PDFViewer>
  </div>
);

export const PdfDownloadButton = ({ city }: { city: any }) => (
  <div className="w-full flex justify-center mt-6">
    <PDFDownloadLink
      document={<AgendaPDF city={city} />}
      fileName={`${city.name}-Agenda.pdf`}
      style={{ textDecoration: 'none', width: '100%', maxWidth: '220px' }}
    >
      {({ loading }) => (
        <Button
          type="button"
          className="w-full md:w-[200px] px-10 py-3"
          disabled={loading}
        >
          {loading ? 'Preparing PDF…' : 'Download PDF'}
        </Button>
      )}
    </PDFDownloadLink>
  </div>
);

export default AgendaPDF;

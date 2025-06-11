import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import Button from '../Buttons/button';

Font.register({
  family: 'Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-800.ttf', fontWeight: 800 },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    position: 'relative',
    color: '#fff',
    backgroundColor: '#1B1130',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 100,
    marginBottom: 10,
  },
  header: {
    fontSize: 28,
    fontFamily: 'Sans',
    fontWeight: 800,
    textAlign: 'center',
    color: '#fff',
  },
  subheader: {
    fontSize: 20,
    fontFamily: 'Sans',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
  },
  date: {
    fontSize: 16,
    fontFamily: 'Sans',
    fontWeight: 600,
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    width: '100%',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#fff',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  timeColumn: {
    width: '20%',
    fontSize: 14,
    color: '#fff',
  },
  detailsColumn: {
    width: '55%',
    paddingLeft: 10,
  },
  speakerColumn: {
    width: '25%',
    textAlign: 'left',
    color: '#fff',
    paddingLeft: 10,
  },
  sessionTitle: {
    fontSize: 14,
    fontFamily: 'Sans',
    fontWeight: 600,
    color: '#e74694',
    marginBottom: 2,
  },
  speakerTitle: {
    fontSize: 14,
    fontFamily: 'Sans',
    fontWeight: 600,
    color: '#fff',
    marginBottom: 2,
  },
  sessionType: {
    fontSize: 10,
    paddingBottom: 5,
    fontWeight: 400,
    color: '#dedede',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#fff',
  },
});

const cleanAgenda = (agenda) => {
  let timeZone = null;

  const processedAgenda = agenda.map(item => {
    const timeZoneMatch = item.time.match(/\b(?!AM|PM)([A-Z]{2,4})\b/g);
    
    if (timeZoneMatch && !timeZone) {
      timeZone = timeZoneMatch[0];
    }

    return {
      ...item,
      time: item.time.replace(/\b(?!AM|PM)([A-Z]{2,4})\b/g, ''), 
    };
  });

  return { processedAgenda, timeZone };
};

const PdfDocument = ({ city }) => {
  const { processedAgenda, timeZone } = cleanAgenda(city.agenda);
  
  const agendaPages = [];
  let currentPage = [];
  let currentHeight = 0;
  const MAX_HEIGHT = 800; 
  processedAgenda.forEach((item, index) => {
    const rowHeight = 40; 

    if (currentHeight + rowHeight > MAX_HEIGHT) {
      agendaPages.push([...currentPage]); 
      currentPage = [item]; 
      currentHeight = rowHeight;
    } else {
      currentPage.push(item);
      currentHeight += rowHeight;
    }
  });

  if (currentPage.length) {
    agendaPages.push(currentPage);
  }

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.headerContainer}>
          <Image style={styles.logo} src="/img/logo.png" alt="no image" />
          <Text style={styles.header}>{city.name}, {city.country}</Text>
          <Text style={styles.subheader}>Agenda</Text>
        </View>

        <Text style={styles.date}>{city.date} {timeZone}</Text>

        <View style={styles.table}>
          {agendaPages[0].map((item, index) => (
            <View style={styles.tableRow} key={index} wrap={false}>
              <Text style={styles.timeColumn}>{item.time}</Text>
              <View style={styles.detailsColumn}>
                <Text style={styles.sessionTitle}>{item.session}</Text>
                <Text style={styles.sessionType}>{item.type}</Text>
              </View>
              <View style={styles.speakerColumn}>
                {Array.isArray(item.speaker) ? (
                  item.speaker.map((speakerId, idx) => {
                    const speaker = city.speakers[speakerId - 1];
                    return (
                      <View key={idx}>
                        <Text style={styles.speakerTitle}>{speaker?.name}</Text>
                        <Text style={styles.sessionType}>{speaker?.title}</Text>
                      </View>
                    );
                  })
                ) : (
                  (() => {
                    const speaker = city.speakers[item.speaker - 1];
                    return (
                      <>
                        <Text style={styles.speakerTitle}>{speaker?.name}</Text>
                        <Text style={styles.sessionType}>{speaker?.title}</Text>
                      </>
                    );
                  })()
                )}
              </View>

            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export const PdfEditor = ({ city }) => {
  console.log(city)
  return (
    <div className='w-full flex justify-center h-full'>
      <PDFViewer className='w-[85%] h-full'>
        <PdfDocument city={city} />
      </PDFViewer>
    </div>
  );
};

export const PdfDownloader = ({ city }) => {
  console.log("test")
  return (
    <div className='w-full flex justify-center'>
      <PDFDownloadLink
        document={<PdfDocument city={city} />}
        fileName={`${city.name}-Agenda.pdf`}
      >
        <Button className='w-full md:w-[200px] mt-4 px-10'>
					Download PDF
				</Button>
      </PDFDownloadLink>
    </div>
  );
};

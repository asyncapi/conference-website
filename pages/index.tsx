/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Head from 'next/head';
import { useMediaQuery } from 'react-responsive';
import Header from '../components/Header/header';
import Sponsors from '../components/Sponsors/sponsors';
import About from '../components/About/about';
import Tickets from '../components/Tickets/tickets';
import Heading from '../components/Typography/heading';
import Paragraph from '../components/Typography/paragraph';
import Subscription from '../components/Form/subscription';
import Speaker from '../components/Speaker/speaker';
import cities from '../config/city-lists.json';
import speakers from '../config/speakers.json';
import Link from 'next/link';
import Button from '../components/Buttons/button';
import Dropdown from '../components/Dropdown/dropdown';
import { City } from '../types/types';
import Popup from '../components/Popup/popup';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  const { t } = useTranslation('common');
  const isTablet = useMediaQuery({ maxWidth: '1118px' });
  const [speakersList, setSpeakersList] = useState(speakers);
  const [currentCity, setCurrentCity] = useState<Partial<City>>({
    name: 'All',
  });

  const handleSpeakers = (city: string) => {
    if (city && city !== 'all') {
      const citySpeaker = speakers.filter((speaker) =>
        speaker.city.includes(city)
      );
      setSpeakersList(citySpeaker);
    } else if (city === 'all') {
      setSpeakersList(speakers);
    } else {
      setSpeakersList([]);
    }
  };
  return (
    <div>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img
        src="/img/illustra.png"
        className="color-effect"
        alt="background-illustration"
      />
      <Header />
      <Popup />
      <div id="about" className="mt-20">
        <About />
      </div>
      <div id="register" className="container mt-20 lg:mt-0">
        <div className="flex items-center flex-col justify-center">
          <div
            id="speakers"
            className="relative flex flex-col items-center justify-center pt-20 lg:pt-8"
          >
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div className="text-lg sm:text-sm text-white font-semi-bold border-b-2 border-blue-400 mb-1">
                  {t('speakers.sectionTitle')}
                </div>
              </div>
            </div>
            <Heading
              typeStyle="heading-md"
              className="text-gradient text-center lg:mt-10"
            >
              {t('speakers.title')}
            </Heading>
            <div className="max-w-3xl sm:w-full text-center">
              <Paragraph
                typeStyle="body-lg"
                className="mt-6"
                textColor="text-gray-200"
              >
                {t('speakers.description')}
              </Paragraph>
            </div>
            <div className="lg:py-20 w-[1130px] lg:w-full">
              <div className="mt-[64px] lg:mt-0">
                {isTablet ? (
                  <div className="w-full">
                    <Dropdown
                      city={currentCity}
                      cities={cities}
                      setCity={setCurrentCity}
                      handleSpeakers={handleSpeakers}
                    />
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <div className="space-x-4 lg:w-full flex justify-between">
                                              <Button
                          type="button"
                          onClick={() => {
                            handleSpeakers('all');
                            setCurrentCity({ name: 'All' });
                          }}
                          className={`w-[120px] ${
                            currentCity.name === 'All'
                              ? 'gradient-bg'
                              : 'border border-gray btn relative  overflow-hidden  transition-all  rounded  group py-1.5 px-2.5'
                          }`}
                          overlay={true}
                        >
                          <span className="transparent-bg "></span>
                          <span className="relative w-full  rounded transition-colors duration-300 ease-in-out group-hover:text-white">
                            {t('speakers.all')}
                          </span>
                        </Button>
                      {cities.map((city) => {
                        // Temporary condition and should be removed next year
                        if (city.name === 'California') {
                          return null;
                        }
                        return (
                          <div
                            key={city.name}
                            onClick={() => {
                              setCurrentCity(city);
                              handleSpeakers(city.name);
                            }}
                          >
                            <Button
                              type="button"
                              className={`w-[120px] ${
                                typeof currentCity !== 'string' &&
                                currentCity.name === city.name
                                  ? 'gradient-bg'
                                  : 'border border-gray btn relative  overflow-hidden  transition-all  rounded  group py-1.5 px-2.5'
                              }`}
                              overlay={true}
                            >
                              {currentCity.name !== city.name && (
                                <>
                                  <span className="transparent-bg "></span>
                                  <span className="relative w-full  rounded transition-colors duration-300 ease-in-out group-hover:text-white">
                                    {city.name}
                                  </span>
                                </>
                              )}
                              {typeof currentCity !== 'string' &&
                                currentCity.name === city.name && (
                                  <span className="relative w-full  rounded transition-colors duration-300 ease-in-out group-hover:text-white">
                                    {city.name}
                                  </span>
                                )}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-[64px] pb-[181px] lg:pb-[80px]">
                {speakersList.length > 0 ? (
                  <div className="w-full grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4">
                    {speakersList.map((speaker) => {
                      return (
                        <Speaker
                          key={speaker.id}
                          details={speaker}
                          location={
                            currentCity.name !== 'All'
                              ? `${currentCity.name}, ${currentCity.country}`
                              : speaker.city[1]
                                ? `${speaker.city[0]} & ${speaker.city[1]}`
                                : `${speaker.city[0]}`
                          }
                          className="mt-10"
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-[64px] pb-[181px] flex items-center justify-center text-center">
                    <div className="w-[720px] lg:w-full">
                      {typeof currentCity !== 'string' && currentCity.cfp ? (
                        <div>
                          <Paragraph className="text-gray-200">
                            {t('speakers.noSpeakers')}
                          </Paragraph>
                          <Link legacyBehavior href={currentCity.cfp}>
                            <a className="flex justify-center" target="_blank">
                              <Button
                                type="button"
                                className="mt-[80px] w-[244px] border border-gray"
                              >
                                {t('index.applyAsSpeaker')}
                              </Button>
                            </a>
                          </Link>
                        </div>
                      ) : (
                        <div>
                          <Heading
                            typeStyle="heading-md-semibold"
                            className="text-gray-200"
                          >
                            {typeof currentCity !== 'string' &&
                              currentCity.name}{' '}
                            {t('index.speakersComingSoon')}
                          </Heading>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            id="tickets"
            className="flex items-center flex-col justify-center pt-20 lg:pt-0"
          >
            <div className="text-lg sm:text-sm text-white font-semi-bold border-b-2 border-blue-400 mb-1">
              {t('tickets.sectionTitle')}
            </div>
            <div
              data-test="ticket-section"
              className="flex flex-col items-center "
            >
              <Heading
                typeStyle="heading-md"
                className="text-gradient text-center lg:mt-10"
              >
                {t('index.getTickets')}
              </Heading>
              <div className="max-w-3xl sm:w-full text-center">
                <Paragraph
                  typeStyle="body-lg"
                  className="mt-6"
                  textColor="text-gray-200"
                >
                  {t('index.ticketsDescription')}
                </Paragraph>
              </div>
            </div>
            <div className="w-full mt-12">
              <Tickets />
            </div>
          </div>
        </div>
      </div>
      <div id="sponsors" className="mt-20">
        <Sponsors
          eventSponsors={[
            {
              image: '/img/logos/apidays.png',
              websiteUrl: 'https://www.apidays.global/',
            },
            {
              image: '/img/logos/APICONF-LOGO-White.png',
              websiteUrl: 'https://apiconf.net/',
            },
          ]}
          financialSponsor={[
            {
              image: '/img/logos/IBM.png',
              websiteUrl: 'https://www.ibm.com/',
            },
            {
              image: '/img/logos/graviteeio-logo.webp',
              websiteUrl: 'https://www.gravitee.io/',
            },
          ]}
        />
      </div>
      <div className="mt-5">
        <Subscription />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

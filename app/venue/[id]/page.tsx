/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next';
import React from 'react';
import Button from '../../../components/Buttons/button';
import Heading from '../../../components/Typography/heading';
import Paragraph from '../../../components/Typography/paragraph';
import Sponsors from '../../../components/Sponsors/sponsors';
import {
  Agenda as AgendaType,
  ConferenceStatus,
  ExtendedCity,
  Speaker as SpeakerType,
} from '../../../types/types';
import { getEventStatus } from '../../../utils/status';
import agenda from '../../../config/agenda.json';
import speakers from '../../../config/speakers.json';
import cities from '../../../config/city-lists.json';
import tickets from '../../../config/tickets.json';
import Agenda from '../../../components/Agenda/agenda';
import Guidelines from '../../../components/Speaker/guideline';
import CFPdata from '../../../config/cfp-data.json';

// Replaces getStaticPaths
export function generateStaticParams() {
  return cities.map((city) => ({
    id: city.name,
  }));
}

// Replaces <Head> with dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const city = cities.find((c) => c.name === id);
  if (!city) {
    return { title: 'Venue Not Found' };
  }
  return {
    title: `${city.name}, ${city.country}`,
    description: city.description,
  };
}

// Helper: replaces getStaticProps logic
function getCityData(cityName: string): ExtendedCity {
  const city = cities.find((c) => c.name === cityName);
  if (!city) {
    throw new Error(`City not found: ${cityName}`);
  }
  const citySpeakers = speakers.filter((speaker: SpeakerType) =>
    speaker.city.includes(cityName)
  );
  const cityAgenda = agenda.filter((a: AgendaType) => a.city === cityName);
  const cityTicket = tickets.filter((ticket) =>
    ticket.type.includes(cityName)
  );
  return {
    ...city,
    speakers: citySpeakers,
    agenda: cityAgenda,
    ticket: cityTicket[0],
  } as ExtendedCity;
}

export default async function VenuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const city = getCityData(id);
  const eventStatus = getEventStatus(city.date);
  const textColor: string =
    eventStatus === ConferenceStatus.ENDED ? 'text-gray-400' : 'text-white';

  return (
    <div data-test={`venue-${city.name}`}>
      <div
        style={{
          backgroundImage: city.name == 'Online' ? '' : `url(${city.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat',
        }}
        className={`w-full h-[500px] sm:h-[auto] ${city.name == 'Online' ? 'bg-online' : ''}`}
      >
        <div className="w-full h-full kinda-dark items-center flex flex-col justify-between">
          <div className="mt-[68px] container text-center flex flex-col items-center w-[1100px] lg:w-full sm:text-center">
            {city.name == 'Online' ? (
              <Heading className={textColor}>
                {city.name} {city.country}
              </Heading>
            ) : (
              <Heading typeStyle="heading-lg" className={`${textColor}`}>
                {city.name}, {city.country}
              </Heading>
            )}

            <Paragraph className="mt-[24px]" textColor={textColor}>
              {city.description}
            </Paragraph>

            <Paragraph
              typeStyle="body-md"
              className={`${textColor} mt-[24px] underline font-bold`}
            >
              <a href={city.mapUrl} target="_blank" rel="noreferrer">
                {city.address}
              </a>
            </Paragraph>
            <Paragraph
              typeStyle="body-lg"
              className={`${textColor} mt-[24px] font-bold`}
            >
              {city.date}
            </Paragraph>
            {eventStatus === ConferenceStatus.ENDED ? (
              city.playlist && (
                <a href="#recordings">
                  <Button
                    type="button"
                    className="w-[250px] h-[50px] m-8"
                    text="Watch Recordings"
                  />
                </a>
              )
            ) : (
              <div className="m-[30px]">
                {city.ticket && city.ticket.url && (
                  <a href={city.ticket.url} target="_blank" rel="noreferrer">
                    <Button
                      type="button"
                      className="px-8 m-2 w-[250px]"
                      text={
                        city.ticket.price
                          ? 'Get Your Free Ticket'
                          : 'Register Now'
                      }
                    />
                  </a>
                )}
                {city.cfp && (
                  <a
                    href={
                      city.name === 'online'
                        ? '/venue/online/register'
                        : city.cfp
                    }
                    target={city.name == 'Online' ? '' : '_blank'}
                    rel="noreferrer"
                  >
                    <Button
                      type="submit"
                      className="px-8 m-2 w-[250px]"
                      text="Apply to be a speaker"
                    />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        id="agenda"
        className="border border-x-0 border-b-0 border-t-[#333] py-28 container flex flex-col justify-center items-center "
      >
        {city.cfp ? (
          <div className="w-[1090px] lg:w-full">
            <Guidelines
              talkDeadLine={
                (city.name == 'Online' && CFPdata.CallEndDate) || city.cfpDate
              }
              virtual={city.name == 'Online'}
              name={city.name}
              cfp={city.cfp}
            />
          </div>
        ) : (
          <div className="w-[1130px] lg:w-full">
            <Agenda city={city} />
          </div>
        )}
      </div>
      <div id="recordings" className="flex justify-center">
        {eventStatus === ConferenceStatus.ENDED ? (
          city.playlist && (
            <div className="pt-10 mb-24 container flex justify-center flex-col items-center">
              <h1 className="text-white font-bold text-5xl mb-10">
                Recordings
              </h1>
              <div className="w-full max-w-4xl aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={city.playlist}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          )
        ) : (
          <div></div>
        )}
      </div>
      <div id="sponsors">
        <Sponsors eventSponsors={city.sponsors.eventSponsors} />
      </div>
    </div>
  );
}

'use client';
import React from 'react';
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';
import { Agenda as AgendaType, ExtendedCity } from '../../types/types';
import Image from 'next/image';
import { PdfDownloadButton } from './DownloadAgenda';

interface IAgenda {
  city: ExtendedCity;
}

function Agenda({ city }: IAgenda) {
  const hasAgenda = city.agenda && city.agenda.length > 0;

  return (
    <div data-test="agenda-com" className="flex flex-col items-center">
      {!hasAgenda ? (
        <div className="w-[720px] lg:w-full mt-[10px] text-center">
          <Heading typeStyle="heading-md" className="text-white">
            Agenda Coming Soon - Stay Tuned!
          </Heading>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <Heading className="text-[30px] text-white text-center mb-[40px]">
            Agenda
          </Heading>
          <Heading typeStyle="heading-md" className="text-gradient" level="h3">
            {city.date}
          </Heading>

          <div className="mt-[40px] w-[90%] lg:w-full">
            {city.agenda.map((talk: AgendaType) => {
              const getSpeaker = city.speakers.filter((speaker) => {
                if (typeof talk.speaker === 'object') {
                  return talk.speaker.includes(speaker.id);
                }
                return speaker.id === talk.speaker;
              });

              return (
                <div
                  key={talk.time}
                  className={`flex sm:flex-col justify-between mt-[50px] ${
                    !talk.speaker && 'countdown-text-gradient'
                  }`}
                >
                  <Paragraph typeStyle="body-md">{talk.time}</Paragraph>
                  <div className="flex justify-between lg:flex-col w-[75%] lg:w-full">
                    <div className="w-[50%] lg:w-full">
                      <Paragraph typeStyle="body-sm">{talk.type}</Paragraph>
                      <Heading
                        level="h3"
                        typeStyle="heading-md-semibold"
                        className="mt-[23px] text-white text-[20px] sm:text-[18px]"
                      >
                        {talk.session}
                      </Heading>
                    </div>

                    {/* Single Speaker */}
                    {talk.speaker && typeof talk.speaker === 'number' && (
                      <div className="flex items-center lg:mt-4">
                        <div className="w-[94px] h-[94px]">
                          <Image
                            src={getSpeaker[0].img}
                            alt={getSpeaker[0].name}
                            width={94}
                            height={94}
                            className="object-cover rounded-full"
                          />
                        </div>
                        <div className="ml-4 w-[300px] sm:w-[250px]">
                          <Heading
                            typeStyle="heading-sm-semibold"
                            className="text-white"
                          >
                            {getSpeaker[0].name}
                          </Heading>
                          <Paragraph typeStyle="body-sm" className="mt-2">
                            {getSpeaker[0].title}
                          </Paragraph>
                        </div>
                      </div>
                    )}

                    {/* Multiple Speakers */}
                    {Array.isArray(talk.speaker) && (
                      <div className="flex flex-col">
                        {getSpeaker.map((speaker, i) => (
                          <div key={i} className="flex items-center mt-6">
                            <div className="w-[94px] h-[94px]">
                              <Image
                                src={speaker.img}
                                alt={speaker.name}
                                width={94}
                                height={94}
                                className="object-cover rounded-full"
                              />
                            </div>
                            <div className="ml-4 w-[300px] sm:w-[250px]">
                              <Heading
                                typeStyle="heading-sm-semibold"
                                className="text-white"
                              >
                                {speaker.name}
                              </Heading>
                              <Paragraph typeStyle="body-sm" className="mt-2">
                                {speaker.title}
                              </Paragraph>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ✅ Download PDF Button */}
          <div className="mt-[60px]">
            <PdfDownloadButton city={city} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Agenda;

import React, { JSX } from 'react';
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';
import { Agenda as AgendaType, ExtendedCity } from '../../types/types';
import Image from 'next/image';

interface IAgenda {
  city: ExtendedCity;
}

function Agenda({ city }: IAgenda): JSX.Element {
  const hasMultiDayAgenda = city.agenda.some((talk) => talk.day);
  const agendaByDay = hasMultiDayAgenda
    ? city.agenda.reduce<Record<string, AgendaType[]>>((acc, talk) => {
        const dayKey = talk.day ?? 'Agenda';
        (acc[dayKey] ||= []).push(talk);
        return acc;
      }, {})
    : { Agenda: city.agenda };

  if (city.agenda.length < 1) {
    return (
      <div
        data-test="agenda-com"
        className="flex flex-col justify-center items-center"
      >
        <div className="w-full max-w-3xl mt-2.5 text-center">
          <Heading typeStyle="heading-md" className="text-white">
            Agenda Coming Soon - Stay Tuned!
          </Heading>
        </div>
      </div>
    );
  }

  return (
    <div
      data-test="agenda-com"
      className="flex flex-col justify-center items-center"
    >
      <div className="w-full">
        <Heading className="text-3xl text-white text-center mb-10">
          Agenda
        </Heading>
        {Object.entries(agendaByDay).map(([day, talks]) => (
          <div key={day} className="mb-20">
            {hasMultiDayAgenda && (
              <Heading
                typeStyle="heading-md"
                level="h3"
                className="text-gradient mb-8"
              >
                {day}
              </Heading>
            )}
            {talks.map((talk: AgendaType) => {
              const getSpeaker = city.speakers.filter((speaker) =>
                Array.isArray(talk.speaker)
                  ? talk.speaker.includes(speaker.id)
                  : speaker.id === talk.speaker
              );

              return (
                <div
                  key={talk.time}
                  className={`flex sm:flex-col justify-between mt-12 ${!talk.speaker ? 'countdown-text-gradient' : ''}`}
                >
                  <Paragraph typeStyle="body-md">{talk.time}</Paragraph>
                  <div className="flex justify-between lg:flex-col w-3/4 lg:w-full">
                    <div className="w-1/2 lg:w-full">
                      <Paragraph typeStyle="body-sm">{talk.type}</Paragraph>
                      <Heading
                        level="h3"
                        typeStyle="heading-md-semibold"
                        className="mt-6 text-white text-xl sm:text-lg"
                      >
                        {talk.session}
                      </Heading>
                    </div>
                    {/* Single speaker */}
                    {typeof talk.speaker === 'number' && getSpeaker[0] && (
                      <div className="flex items-center lg:mt-4">
                        <div className="w-24 h-24">
                          <Image
                            src={getSpeaker[0].img}
                            alt={getSpeaker[0].name}
                            width={0}
                            height={0}
                            className="object-cover rounded-full w-full h-full"
                          />
                        </div>
                        <div className="ml-4 w-72 sm:w-64">
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
                    {/* Multiple speakers */}
                    {Array.isArray(talk.speaker) && getSpeaker.length > 0 && (
                      <div className="flex flex-col">
                        {getSpeaker.map((speaker, i) => (
                          <div key={i} className="mt-6">
                            <div className="flex items-center lg:mt-4">
                              <div className="w-24 h-24">
                                <Image
                                  src={speaker.img}
                                  alt={speaker.name}
                                  width={0}
                                  height={0}
                                  className="object-cover rounded-full w-full h-full"
                                />
                              </div>
                              <div className="ml-4 w-72 sm:w-64">
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
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Agenda;

import React from "react";
import Heading from "../Typography/heading";
import Paragraph from "../Typography/paragraph";
import Image from "next/image";

function Agenda({ city }: any) {
  return (
    <div data-test="agenda-com">
      <div className="flex flex-col justify-center items-center">
        {!city.agenda ? (
          <div className="w-[720px] lg:w-full mt-[10px] text-center">
            <Heading typeStyle="heading-sm" className="text-white text-[30px]">
              Agenda Coming Soon - Stay Tuned!
            </Heading>
          </div>
        ) : (
          <Heading className="text-[30px] text-white">Agenda</Heading>
        )}
      </div>

      {city.agenda && (
        <div className="mt-[40px]">
          <Heading
            typeStyle="heading-md"
            className="text-gradient text-2xl"
            level="h3"
          >
            {city.date}
          </Heading>

          <div className="mt-[40px]">
            {city.agenda.map((talk : any) => (
              <div
                key={talk.time}
                className={`flex sm:flex-col justify-between mt-[50px] ${
                  !talk.speaker && "countdown-text-gradient"
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

                  {typeof talk.speaker === "number" && city.speakers[talk.speaker - 1] && (
                    <div className="flex items-center lg:mt-4">
                      <div className="w-[94px] h-[94px]">
                        <Image
                          src={city.speakers[talk.speaker - 1].img}
                          alt={city.speakers[talk.speaker - 1].name}
                          width={94}
                          height={94}
                          className="object-cover rounded-full"
                        />
                      </div>
                      <div className="ml-4 w-[300px] sm:w-[250px]">
                        <Heading typeStyle="heading-sm-semibold" className="text-white">
                          {city.speakers[talk.speaker - 1].name}
                        </Heading>
                        <Paragraph typeStyle="body-sm" className="mt-2">
                          {city.speakers[talk.speaker - 1].title}
                        </Paragraph>
                      </div>
                    </div>
                  )}

                  {Array.isArray(talk.speaker) && (
                    <div className="flex flex-col">
                      {talk.speaker.map((speak : any, i : any) => {
                        const speaker = city.speakers[speak - 1];
                        if (!speaker) return null;

                        return (
                          <div key={i} className="mt-6">
                            <div className="flex items-center lg:mt-4">
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
                                <Heading typeStyle="heading-sm-semibold" className="text-white">
                                  {speaker.name}
                                </Heading>
                                <Paragraph typeStyle="body-sm" className="mt-2">
                                  {speaker.title}
                                </Paragraph>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Agenda;

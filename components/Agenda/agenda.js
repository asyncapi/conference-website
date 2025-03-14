import React, { useState, useEffect } from 'react';
import Heading from "../Typography/heading";
import Paragraph from "../Typography/paragraph";
import Image from "next/image";

function Agenda({ city }) {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [filteredSpeakers, setFilteredSpeakers] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]);
  
  useEffect(() => {
    if (!city.agenda) return;

    if (selectedType) {
      const speakersForType = city.agenda
        .filter((talk) => 
          talk.type === selectedType && talk.speaker !== undefined
        )
        .flatMap((talk) => (Array.isArray(talk.speaker) ? talk.speaker : [talk.speaker]));
      const uniqueSpeakers = [...new Set(speakersForType)];
      setFilteredSpeakers(uniqueSpeakers);
    } else {
      setFilteredSpeakers(city.speakers.map((s, index) => index + 1));
    }

    if (selectedSpeaker) {
      const typesForSpeaker = city.agenda
        .filter((talk) =>
          Array.isArray(talk.speaker) ? talk.speaker.includes(selectedSpeaker) : talk.speaker === selectedSpeaker
        )
        .map((talk) => talk.type);

      setFilteredTypes([...new Set(typesForSpeaker)]);
    } else {
      setFilteredTypes([...new Set(city.agenda.map((talk) => talk.type))]);
    }
  }, [selectedSpeaker, selectedType, city.agenda, city.speakers]);

  if (!city.agenda) {
    return (
      <div className="" data-test="agenda-com">
        <div className="flex flex-col justify-center items-center">
          <div className="w-[720px] lg:w-full mt-[10px] text-center">
            <Heading typeStyle="lg" className="text-white text-[30px]">
              Agenda Coming Soon - Stay Tuned!
            </Heading>
          </div>
        </div>
      </div>
    );
  }

  const filteredAgenda = city.agenda.filter((talk) => {
    const matchesSpeaker = selectedSpeaker
      ? Array.isArray(talk.speaker) ? talk.speaker.includes(selectedSpeaker) : talk.speaker === selectedSpeaker : true;
    const matchesType = selectedType ? talk.type === selectedType : true;
    return matchesSpeaker && matchesType;
  });
  
  return (
    <div className="" data-test="agenda-com">
      <div className="flex flex-col justify-center items-center">
        <Heading className="text-[30px] text-white">Agenda</Heading>   
      </div>
      
      {/* filters */}
      <div className="flex justify-center mt-6 gap-4">
        {/* Speaker Filter Dropdown */}
        <select
          className="p-2 rounded-md bg-transparent border border-white text-white"
          onChange={(e) => setSelectedSpeaker(e.target.value ? parseInt(e.target.value) : null)}
          value={selectedSpeaker || ""}
        >
          <option value=""  className='bg-[#1B1130]'>All Speakers</option>
          {filteredSpeakers.map((speakerId) => (
            <option key={speakerId} value={speakerId}  className='bg-[#1B1130]'>
              {city.speakers[speakerId - 1].name}
            </option>
          ))}
        </select>

        {/* Session Type Filter Dropdown */}
        <select
          className="p-2 rounded-md bg-transparent border border-white text-white"
          onChange={(e) => setSelectedType(e.target.value)}
          value={selectedType}
        >
          <option value="" className='bg-[#1B1130]'>All Session Types</option>
          {filteredTypes.map((type, index) => (
            <option key={index} value={type} className='bg-[#1B1130]'>
              {type}
            </option>
          ))}
        </select>
      </div>

      {filteredAgenda.length > 0 ? (
        <div className="mt-[40px]">
          <Heading
            typeStyle="heading-md"
            className="text-gradient text-2xl"
            level="h3"
          >
            {city.date}
          </Heading>

          <div className="mt-[40px]">
            {filteredAgenda.map((talk) => {
              return (
                <div
                  key={talk.time}
                  className={`flex sm:flex-col justify-between mt-[50px] ${!talk.speaker && "countdown-text-gradient"}`}
                >
                  <Paragraph typeStyle="body-md">{talk.time}</Paragraph>
                  <div className="flex justify-between lg:flex-col w-[75%] lg:w-full">
                    <div className="w-[50%] lg:w-full">
                      <Paragraph typeStyle="body-sm" className="">
                        {talk.type}
                      </Paragraph>
                      <Heading
                        level="h3"
                        typeStyle="heading-md-semibold"
                        className="mt-[23px] text-white text-[20px] sm:text-[18px]"
                      >
                        {talk.session}
                      </Heading>
                    </div>
                    {talk.speaker && typeof talk.speaker === "number" ? (
                      <div className="flex items-center lg:mt-4">
                        <div className="w-[94px] h-[94px]">
                          <Image
                            src={city.speakers[talk.speaker - 1].img}
                            alt={city.speakers[talk.speaker - 1].name}
                            width={0}
                            height={0}
                            className="object-cover rounded-full w-[100%] h-[100%]"
                          />
                        </div>
                        <div className="ml-4 w-[300px] sm:w-[250px]">
                          <Heading
                            typeStyle="heading-sm-semibold"
                            className="text-white"
                          >
                            {city.speakers[talk.speaker - 1].name}
                          </Heading>
                          <Paragraph typeStyle="body-sm" className="mt-2">
                            {city.speakers[talk.speaker - 1].title}
                          </Paragraph>
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {talk.speaker && typeof talk.speaker === "object" && (
                      <div className="flex flex-col">
                        {talk.speaker.map((speak, i) => (
                          <div key={i} className="mt-6">
                            <div className="flex items-center lg:mt-4">
                              <div className="w-[94px] h-[94px]">
                                <Image
                                  src={city.speakers[speak - 1].img}
                                  alt={city.speakers[speak - 1].name}
                                  width={0}
                                  height={0}
                                  className="object-cover rounded-full w-[100%] h-[100%]"
                                />
                              </div>
                              <div className="ml-4 w-[300px] sm:w-[250px]">
                                <Heading
                                  typeStyle="heading-sm-semibold"
                                  className="text-white"
                                >
                                  {city.speakers[speak - 1].name}
                                </Heading>
                                <Paragraph typeStyle="body-sm" className="mt-2">
                                  {city.speakers[speak - 1].title}
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
        </div>
      )
      : (
        <div className="text-center text-white mt-10">No agenda items found for the selected criteria.</div>
      )}
    </div>
  );
}

export default Agenda;

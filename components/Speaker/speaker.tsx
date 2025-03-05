import Image from 'next/image';
import React from 'react';
import { SpeakerListType, SpeakerCityType } from '../../types/type'

type SpeakerProps = {
  details: SpeakerListType;
  location?: SpeakerCityType | null;
  className?: string;
};

const Speaker: React.FC<SpeakerProps> = ({ details, location, className = '' }) => {
  return (
    <div
      className={`w-auto text-center flex flex-col items-center card h-auto rounded-md p-[27px] ${className}`}
      data-test="speakers-section"
    >
      <div className="w-[300px] h-[300px] lg:w-[250px] lg:h-[250px] relative overflow-hidden rounded-full">
        <Image
          src={details.img}
          alt={details.name}
          width={300}
          height={300}
          className="rounded-full object-cover transition-all duration-300 hover:scale-110 w-full h-full"
        />
      </div>
      <div className="mt-[19px]">
        <h3 className="text-[23px] text-white">{details.name}</h3>
        <div className={`flex flex-col ${location?.location ? 'min-h-[150px]' : ''} justify-between`}>
          <p className="mt-[6.6px] text-[18px] text-gray-500">{details.title}</p>
          {location?.location && <p className="mt-[6.6px] text-[20px] text-gradient">{location.location}</p>}
        </div>
      </div>
    </div>
  );
};

export default Speaker;

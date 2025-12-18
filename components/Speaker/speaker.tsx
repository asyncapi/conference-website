import Image from 'next/image';
import React, { JSX } from 'react';
import { Speaker as SpeakerTypes } from '../../types/types';
import Linkedin from '../illustration/Socials/LinkedIn';


interface ISpeaker {
  details: SpeakerTypes;
  location?: string | undefined;
  className?: string;
  linkedin?: string;
}

function Speaker({ details, location, className }: ISpeaker): JSX.Element {
  function getName(names: string[]) {
    return `${names[0]} ${names[1]}`;
  }
  const shortenedName =
    details.name.length > 20 ? getName(details.name.split(' ')) : details.name;

  return (
    <div
      className={`w-auto text-center flex flex-col items-center card rounded-md p-[27px] ${className}`}
      data-test="speakers-section"
    >
      <div className="w-[300px] h-[300px] lg:w-[250px] lg:h-[250px] relative overflow-hidden  rounded-full border-2 border-gray-300 bg-gray-800">
        <Image
          src={details.img}
          alt={details.name}
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-full object-cover transition-all duration-300 hover:scale-110 w-[100%] h-[100%]"
        />
      </div>
      <div className="mt-[19px]">
        <h3 className="text-[23px] text-white inline">{shortenedName}</h3>
        {/* LinkedIn Button Integration */}
            {details.linkedin && (
              <a 
                href={details.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-[20px] h-[20px] inline-flex cursor-pointer items-center justify-center bg-[#0077b5] hover:bg-[#005a87] transition-colors rounded-full text-white ml-2"
                aria-label={`${details.name}'s LinkedIn`}
              >
                <Linkedin/>
              </a>
            )}
        <div className={`flex flex-col ${'min-h-[150px]'} justify-between`}>
          <div>
            {' '}
            <p className="mt-[6.6px] text-[18px] text-gray-500">
              {details.title}
            </p>
          </div>
          <div>
            <p className="mt-[6.6px] text-[20px] text-gradient">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Speaker;

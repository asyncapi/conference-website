import Image from 'next/image';
import React, { JSX } from 'react';
import { BLUR_DATA_URL } from '../../../utils/image-blur';

interface ISpeaker {
  name: string;
  title: string;
  image: string;
  location?: string;
  className?: string;
}

function SpeakerCard({ name, title, image, location, className }: ISpeaker): JSX.Element {
  function getName(names: string[]) {
    return `${names[0]} ${names[1]}`;
  }
  const shortenedName =
    name.length > 20 ? getName(name.split(' ')) : name;

  return (
    <div
      className={` w-full text-center flex flex-col items-center card rounded-md p-7 ${className}`}
      data-test="speakers-section"
    >
      <div className="w-75 h-75 lg:w-64 lg:h-64 relative overflow-hidden  rounded-full border-2 border-gray-300 bg-gray-800">
        <Image
          src={image}
          alt={name}
          width={0}
          height={0}
          sizes="100vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="rounded-full object-cover transition-all duration-300 hover:scale-110 w-full h-full"
        />
      </div>
      <div className="mt-5">
        <h3 className="text-2xl text-white">{shortenedName}</h3>
        <div className="flex flex-col min-h-24 justify-between">
          <div>
            {' '}
            <p className="mt-1.5 text-lg text-gray-500">
              {title}
            </p>
          </div>
          <div>
            <p className="mt-1.5 text-xl text-gradient">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpeakerCard;

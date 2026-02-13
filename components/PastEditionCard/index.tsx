import React, { JSX } from 'react';
import Image from 'next/image';
import ILink from '../illustration/link';

interface PastEditonCardProp {
  url: string;
}

const PastEditonCard = ({ url }: PastEditonCardProp): JSX.Element => {
  const year = url.split('.')[1];
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg bg-clip-padding shadow-lg p-4 w-full mx-auto border-[1.66px] border-[#FFFFFF66] rounded-xl">
      <div className="flex items-center flex-wrap justify-between">
        <h1 className="text-2xl text-white font-semibold">{year}</h1>
        <div>
          <a
            href={url}
            rel="noreferrer"
            target="_blank"
            className="flex hover:scale-95 transition items-center justify-center"
          >
            <p className="mr-2 text-white text-sm">View Website</p>
            <ILink className="w-5" fill="white" />
          </a>
        </div>
      </div>

      <div className="relative w-full h-[250px] my-4 rounded-lg overflow-hidden">
        <Image
          src={`/img/past-editions/${year}.webp`}
          alt={`AsyncAPI Conference ${year}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
};

export default PastEditonCard;

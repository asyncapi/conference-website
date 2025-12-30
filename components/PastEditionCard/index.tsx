import React, { JSX, useState } from 'react';
import ILink from '../illustration/link';

interface PastEditonCardProp {
  url: string;
}

const PastEditonCard = ({ url }: PastEditonCardProp): JSX.Element => {
  const year = url.split('.')[1];

  // Start with jpeg, fallback to png if missing
  const [thumbnail, setThumbnail] = useState(
    `/past-editions/${year}.jpeg`
  );

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg bg-clip-padding shadow-lg p-4 w-full mx-auto border-[1.66px] border-[#FFFFFF66] rounded-xl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-white font-semibold">{year}</h1>

        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center hover:scale-95 transition"
        >
          <p className="mr-2 text-white text-sm">View Website</p>
          <ILink className="w-5" fill="white" />
        </a>
      </div>

      {/* Thumbnail */}
      <div className="relative my-4 w-full aspect-[16/9] overflow-hidden rounded-lg bg-black/20">
        <img
          src={thumbnail}
          alt={`AsyncAPI Conference ${year}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top"
          onError={() =>
            setThumbnail(`/past-editions/${year}.png`)
          }
        />
      </div>
    </div>
  );
};

export default PastEditonCard;

/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { City } from '../../types/type';

type VenueProps = {
  className?: string;
  city: City;
};

export function getEventStatus(date: string): 'Ongoing' | 'Upcoming' | 'Ended' {
  const today = new Date();
  const eventDate = new Date(date);

  if (eventDate.toDateString() === today.toDateString()) {
    return 'Ongoing';
  } else if (eventDate > today) {
    return 'Upcoming';
  } else {
    return 'Ended';
  }
}

export function isEventEnded(date: string): boolean {
  return getEventStatus(date) === 'Ended';
}

const Venue: React.FC<VenueProps> = ({ className = '', city }) => {
  const eventEnded = isEventEnded(city.date);
  const textColor = eventEnded ? 'text-white' : 'text-white';
  const eventStatus = getEventStatus(city.date);

  const handleMapClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open(city.map, '_blank', 'noopener');
  };

  return (
    <Link href={`/venue/${city.name}`} passHref>
      <div
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,.3), rgba(0,0,0, .3)), url(${city.img})`,
          backgroundSize: 'cover',
        }}
        className={`relative w-[300px] h-[400px] sm:w-[250px] sm:h-[350px] card-bg rounded-md flex items-center justify-center p-4 cursor-pointer m-2 ${className}`}
      >
        <div className="flex justify-between flex-col w-full h-full">
          <div className="flex items-center">
            {city.cfp && (
              <div className={`border ${textColor} text-md rounded-lg p-1 text-center mt-2`}>
                CFP is open
              </div>
            )}
            <button
              onClick={handleMapClick}
              className="w-8 h-8 bg-white rounded-xl flex items-center justify-center ml-auto"
              aria-label="Open map"
            >
              <Image src="/img/mapIcon.svg" alt="Map Icon" width={24} height={24} />
            </button>
          </div>

          <div></div>

          <div className={textColor}>
            <div>
              {city.name === 'Online' ? (
                <span className="text-lg font-bold">
                  {city.name} {city.country}
                </span>
              ) : (
                <span className="text-lg font-bold">
                  {city.country}, {city.name}
                </span>
              )}
            </div>

            <div className="flex justify-between pt-2">
              <div className="inline-block border border-gray-400 rounded-lg py-1 px-2 text-center sm:text-sm text-base">
                {city.date}
              </div>
              <span className="text-white flex items-center pt-2 sm:text-[0.8rem] text-base">
                {eventStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Venue;

/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { City, ConferenceStatus } from '../../types/types';
import { getEventStatus } from '../../utils/status';

interface IVenue {
  city: City;
}

function Venue({ city }: IVenue) {
  const eventStatus = getEventStatus(city.date);

  return (
    <Link href={`/venue/${city.name}`}>
      <div
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,.3), rgba(0,0,0, .3)), url(${city.img})`,
          backgroundSize: 'cover',
        }}
        className="relative w-[300px] h-[400px] sm:w-[250px] sm:h-[350px] card-bg rounded-2xl flex items-center justify-center p-4 cursor-pointer m-3 hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
      >
        <div className="flex justify-between flex-col w-full h-full">
          <div className="flex items-center">
            {city.cfp && (
              <div
                className={`border text-white text-md rounded-lg px-2 py-1 text-center mt-2`}
              >
                cfp is open
              </div>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                window.open(city.mapUrl, '_blank', 'noopener');
              }}
              className="w-8 h-8 bg-white rounded-xl flex items-center justify-center ml-auto hover:bg-gray-400 transition-colors duration-300"
            >
              <Image
                src="/img/mapIcon.svg"
                alt="Map Icon"
                width={24}
                height={24}
              />
            </button>
          </div>

          <div className="text-white">
            <div className="text-lg font-bold">
              {city.name === 'Online' ? (
                <span>
                  {city.name} {city.country}
                </span>
              ) : (
                <span>
                  {city.country}, {city.name}
                </span>
              )}
            </div>

            <div className="flex flex-row items-center mt-2 justify-between">
              <div className="border border-gray-300 rounded-lg py-1 px-2 text-sm sm:text-xs flex-1 text-center truncate">
                {city.date}
              </div>
              <div className="text-sm sm:text-xs text-right ml-2 whitespace-nowrap">
                {eventStatus}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Venue;

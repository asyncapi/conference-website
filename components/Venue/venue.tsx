/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';
import { City } from '../../types/types';
import { getEventStatus } from '../../utils/status';
import MapPointer from '../illustration/mapPointer';
import Button from '../Buttons/button';

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
        className="relative w-[300px] h-[400px] sm:w-[250px] sm:h-[350px] card-bg rounded-2xl flex items-center justify-center p-4 cursor-pointer m-3 transition-all duration-500 ease-out hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/30 hover:brightness-110 group"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
        <div className="flex justify-between flex-col w-full h-full relative z-10">
          <div className="flex items-center">
            {city.cfp && (
              <div
                className={`border text-white text-md rounded-lg px-2 py-1 text-center mt-2 transition-all duration-300 hover:bg-white/10 hover:scale-105`}
              >
                cfp is open
              </div>
            )}
            <a href={city.mapUrl} target="_blank" rel="noreferrer"
              className="w-8 h-8 bg-white rounded-xl flex items-center justify-center ml-auto transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-400 hover:to-purple-500 hover:scale-110 hover:rotate-12 hover:shadow-lg"
              onClick={e => e.stopPropagation()}>
              <MapPointer className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
            </a>
          </div>

          <div className="text-white transform transition-transform duration-500 group-hover:translate-y-[-8px]">
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
              <div className="border border-gray-300 rounded-lg py-1 px-2 text-sm sm:text-xs flex-1 text-center truncate transition-all duration-300 group-hover:border-blue-400 group-hover:bg-blue-400/10">
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

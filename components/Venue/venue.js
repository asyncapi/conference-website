/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function getEventStatus(dates) {
  const today = new Date();
  const eventDates = dates.split('-').map((date) => new Date(date));

  if (
    eventDates.some((event) => event.toDateString() === today.toDateString())
  ) {
    return 'Ongoing';
  } else if (eventDates.some((event) => event > today)) {
    return 'Upcoming';
  } else {
    return 'Ended';
  }
}

export function isEventEnded(dates) {
  return getEventStatus(dates) === 'Ended';
}

function Venue({ city }) {
  const eventEnded = isEventEnded(city.date);
  const textColor = eventEnded ? 'text-white' : 'text-white';
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
                className={`border ${textColor} text-md rounded-lg px-2 py-1 text-center mt-2`}
              >
                cfp is open
              </div>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                window.open(city.map, '_blank', 'noopener');
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

          <div className={textColor}>
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

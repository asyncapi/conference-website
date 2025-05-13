import React from 'react';
import Link from 'next/link';
import cities from '../config/city-lists.json';
import { checkCFPStatus } from '../utils/cfpStatus';

export default function Announcement() {
  const updatedCities = checkCFPStatus(cities);
  
  const nextCFPCity = updatedCities.find(city => 
    city.cfp && !city.ended && new Date(city.cfpdate) > new Date()
  );

  if (!nextCFPCity) {
    return null;
  }

  return (
    <Link href={`/venue/${nextCFPCity.name}`}>
      <div className='cursor-pointer border text-white min-w-[300px] rounded-lg p-1 text-center text-lg'>
        Call for Speakers {nextCFPCity.name}!
      </div>
    </Link>
  );
}

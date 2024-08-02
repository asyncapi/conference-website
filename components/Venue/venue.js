/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function isEventEnded(date){
	const eventDate = date.split(" ");
	const month = eventDate[0];
	const year = eventDate[eventDate.length-1];
	const startDay = eventDate[1].split("-")[0];
	return new Date(`${startDay} ${month} ${year}`) < Date.now()
}


function Venue({ className, city }) {

	const eventEnded = isEventEnded(city.date);
	const textColor = eventEnded ? "text-gray-300": "text-white";

	return (
		<Link href={`/venue/${city.name}`}>
			<div style={{'--image-url': `url(${city.img})`}}
				className='relative w-[300px] h-[400px] sm:w-[250px] sm:h-[350px] card-bg rounded-md bg-[image:var(--image-url)] flex items-center justify-center p-4 cursor-pointer'>
				<div className='flex justify-between flex-col w-full h-full'>
					<div className='flex justify-between items-center'>
						<div><div className={`border ${textColor} text-md rounded-lg p-1 text-center mt-2 ${city.cfp ? 'block': 'hidden' }`}>cfp is open</div></div>
						<a href={city.map} target='_blank' className='w-8 h-8 bg-white rounded-xl flex items-center justify-center' rel="noreferrer">
						<img src='/img/mapIcon.svg' className='w-6' />
						</a>
					</div>
					<div></div>
					<div className={textColor}>
						<div>
							<span className='text-lg font-bold'>{city.country}, {city.name}</span>
						</div>
						<div className='inline-block border border-gray-400 rounded-lg py-1 px-2 text-center mt-2'>{city.date}</div>
						<span className='text-xs text-white'> - {eventEnded ? "ENDED" : ""}</span>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default Venue;

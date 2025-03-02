/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function getEventStatus(date){
	const today = new Date();
    const event = new Date(date);

    if (event.toDateString() === today.toDateString()) {
        return "Ongoing";
    } else if (event > today) {
        return "Upcoming";
    } else {
        return "Ended";
    }
}

export function isEventEnded(date){
	return getEventStatus(date) === "Ended";
}

function Venue({ className, city }) {

	const eventEnded = isEventEnded(city.date);
	const textColor = eventEnded ? "text-white": "text-white";
	const eventStatus = getEventStatus(city.date);

	return (
		<Link href={`/venue/${city.name}`}>
			<div style={{background: `linear-gradient(to bottom, rgba(0,0,0,.3), rgba(0,0,0, .3)), url(${city.img})`, backgroundSize: "cover"}}
				className='relative w-[300px] h-[400px] sm:w-[250px] sm:h-[350px] card-bg rounded-md bg-[image:var(--image-url)] flex items-center justify-center p-4 cursor-pointer m-2'>
				<div className='flex justify-between flex-col w-full h-full'>
					<div className='flex items-center'>
						{city.cfp? <div className={`border ${textColor} text-md rounded-lg p-1 text-center mt-2`}>cfp is open</div> :null}
						<button onClick={(e) => {
							e.preventDefault()
							window.open(city.map, '_blank', 'noopener')
						}} className='w-8 h-8 bg-white rounded-xl flex items-center justify-center ml-auto'>
							<Image src='/img/mapIcon.svg' alt='Map Icon' width={24} height={24} />
						</button>
					</div>
					<div></div>
					<div className={textColor}>
						<div>
							{city.name=='Online'?<span className='text-lg font-bold'>{city.name} {city.country}</span>:<span className='text-lg font-bold'>{city.country}, {city.name}</span>}
						</div>
						<div className='flex align-end flex-row justify-between pt-2'>
							<div className='inline-block border border-gray-400 rounded-lg py-1 px-2 text-center sm:text-sm text-base'>{city.date}</div>
							<span className=' text-white flex align-middle pt-2 sm:text-[0.8rem] sm:leading-4 text-base'>{eventStatus}</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default Venue;

/* eslint-disable react/no-unescaped-entities */
import React from 'react';

function Venue({ className, city }) {
	return (
		<div>
			<div style={{'--image-url': `url(${city.img})`}} 
			className='relative w-[300px] h-[400px] sm:w-[250px] sm:h-[350px] card-bg bg-[image:var(--image-url)] flex items-center justify-center p-4 cursor-pointer'>
				<div className='flex justify-between flex-col w-full h-full'>
					<div className='flex justify-between items-center'>
						<div><div className={`shadow-md shadow-gray-600 tracking-wide text-white text-md rounded-2xl py-1 px-4 bg-gray-600 text-center mt-2 ${city.cfp ? 'block': 'hidden' }`}>cfp is open</div></div>
						<a href={city.map} target='_blank' className='w-8 h-8 bg-white rounded-xl flex items-center justify-center' rel="noreferrer">
						<img src='/img/mapIcon.svg' className='w-6' />
						</a>
					</div>
					<div></div>
					<div className='text-white'>
						<div>
							<span className='text-lg font-bold drop-shadow-lg'>{city.country}, {city.name}</span>
						</div>
						<div className='flex items-center justify-between w-full'>
						<div className='border border-blue-800 bg-slate-100 rounded-3xl py-2 px-4 text-center text-blue-900 mt-2 text-md font-medium'>{city.date}</div>
						</div>
					</div>
					</div>
				</div>
		</div>
	);
}

export default Venue;

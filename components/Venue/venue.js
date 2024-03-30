/* eslint-disable react/no-unescaped-entities */
import React from 'react';

function Venue({ className, city }) {
	return (
		<div>
			<div style={{'--image-url': `url(${city.img})`}} 
			className='relative w-[300px] h-[400px] sm:w-[250px] sm:h-[350px] card-bg bg-[image:var(--image-url)] flex items-center justify-center p-4 cursor-pointer'>
				 <div className="absolute  inset-0 bg-black opacity-30 rounded-4xl"/>
				<div className='flex justify-between flex-col w-full h-full z-10'>
					<div className='flex justify-between items-center'>
						<div><div className={` text-md text-white text-md rounded-xl px-2 py-1 bg-[#3e4757]  text-sm text-center mt-2 ${city.cfp ? 'block': 'hidden' }`}>cfp is open</div></div>
						<a href={city.map} target='_blank' className='w-8 h-8 bg-white rounded-xl flex items-center justify-center' rel="noreferrer">
						<img src='/img/mapIcon.svg' className='w-6' />
						</a>
					</div>
					<div></div>
					<div className='text-white'>
						<div>
							<span className='text-lg font-bold'>{city.country}, {city.name}</span>
						</div>
						<div className='flex items-center justify-between w-full'>
						<div className='border text-sm border-[#1a2694] rounded-xl px-2 py-1 text-[#1a2694] bg-[#edeefd] text-center mt-2'>{city.date}</div>
						</div>
					</div>
					</div>
				</div>
		</div>
	);
}

export default Venue;

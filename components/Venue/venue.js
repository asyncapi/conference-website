/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';

function Venue({ className, city }) {
	return (
		<Link href={`/venue/${city.name}`}>
			<div style={{'--image-url': `url(${city.img})`}}
				className='relative w-[300px] h-[400px] sm:w-[250px] sm:h-[350px] card-bg bg-[image:var(--image-url)] flex items-center justify-center p-4 cursor-pointer'>
				<div className='flex justify-between flex-col w-full h-full'>
					<div className='flex items-center'>
						{city.cfp? <div className='border text-white text-md rounded-lg p-1 text-center mt-2'>cfp is open</div> :null}
						<button onClick={(e) => {
							e.preventDefault()
							window.open(city.map, '_blank', 'noopener')
						}} className='w-8 h-8 bg-white rounded-xl flex items-center justify-center ml-auto'>
							<img src='/img/mapIcon.svg' className='w-6' />
						</button>
					</div>
					<div></div>
					<div className='text-white'>
						<div>
							<span className='text-lg font-bold'>{city.country}, {city.name}</span>
						</div>
						<div className='flex items-center justify-between w-full'>
							<div className='border border-gray-400 rounded-lg p-1 text-center mt-2'>{city.date}</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default Venue;

/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';

function Venue({ className, city }) {
	return (
		<div className={`w-[500px] sm:w-[400px] ${className}`}>
			<div className='w-[450px] sm:w-[400px] sm:h-[320px] card-bg flex items-center justify-center p-10'>
				<img src={city.img} className='sm:w-[350px] h-[250px] rounded-lg' />
			</div>

			<div className='mt-[24px] w-[450px] sm:w-full'>
				<p className='text-[#47BCEE] text-[24px] py-[8px]'>{city.date}</p>
				<Heading typeStyle='lg' className='text-white text-[30px]'>
					{city.name}, {city.country}
				</Heading>
				<Paragraph className='pt-[16px] pb-[8px]'>{city.description}</Paragraph>
			</div>
		</div>
	);
}

export default Venue;

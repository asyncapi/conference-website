/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';
import Link from 'next/link';

function Venue({ className, city }) {
	return (
		<Link href={`/venue/${city.name}`}>
			<div className={`w-[500px] cursor-pointer sm:w-auto ${className}`}>
				<div className='w-[450px] sm:w-auto sm:h-[320px] card-bg flex items-center justify-center p-10'>
					<img src={city.img} className='sm:w-[350px] h-[250px] rounded-lg' />
				</div>

				<div className='mt-[24px] w-[450px] sm:w-full'>
					<p className='text-[#47BCEE] text-[24px] py-[8px]'>{city.date}</p>
					<Heading typeStyle='lg' className='text-[#47BCEE] text-[30px]'>
						{city.name}, {city.country}
					</Heading>
					<Paragraph className='pt-[16px] pb-[8px]'>
						{city.description}
					</Paragraph>
				</div>
			</div>
		</Link>
	);
}

export default Venue;

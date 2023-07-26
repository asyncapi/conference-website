/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';

function Venue({className, city}) {
  return (
		<div className={`w-[642px] sm:w-[400px] ${className}`}>
			<div className='w-[624px] h-[514px] sm:w-[400px] sm:h-[320px] card-bg flex items-center justify-center py-[8px] px-[4px]'>
				<img src={city.img} className='w-[538px] sm:w-[350px] rounded-lg' />
			</div>

			<div className='mt-[24px] w-[420px] sm:w-full'>
			  <p className='text-[#47BCEE] text-[24px] py-[8px]'>{city.date}</p>
			  <Heading typeStyle='lg' className='text-white text-[30px]'>{city.name}, {city.country}</Heading>
			  <Paragraph className='pt-[16px] pb-[8px]'>
				  {city.description}
				</Paragraph>
			</div>
		</div>
	);
}

export default Venue


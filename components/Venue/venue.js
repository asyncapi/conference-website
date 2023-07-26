/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';

function Venue({className}) {
  return (
		<div className={`w-[642px] sm:w-[400px] ${className}`}>
			<div className='w-[624px] h-[514px] sm:w-[400px] sm:h-[320px] card-bg flex items-center justify-center py-[8px] px-[4px]'>
				<img src='/img/london.jpeg' className='w-[538px] sm:w-[350px] rounded-lg' />
			</div>

			<div className='mt-[24px] w-[420px] sm:w-full'>
				<p className='text-[#47BCEE] text-[24px] py-[8px]'>September, 26</p>
				<Heading className='text-white'>London, UK</Heading>
				<Paragraph className='pt-[16px] pb-[8px]'>
					Join us in Madrid for AsyncAPI Conference and learn how to speak
					fluent API! Let's taco 'bout messaging and have a fiesta you won't
					forget!
				</Paragraph>
			</div>
		</div>
	);
}

export default Venue


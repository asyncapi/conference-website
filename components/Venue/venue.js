/* eslint-disable react/no-unescaped-entities */
import React from 'react'

function Venue({className}) {
  return (
		<div className={`w-[642px]`}>
			<div className='w-[624px] h-[514px] card-bg flex items-center justify-center py-[8px] px-[4px]'>
				<img src='/img/london.jpeg' className='w-[538px]' />
			</div>

			<div className='mt-[24px] w-[420px]'>
				<p className='text-[#47BCEE] text-[24px] py-[8px]'>September, 26</p>
				<h1 className='text-white text-[36px] font-bold'>London, UK</h1>
				<p className='text-gray text-[20px] pt-[16px] pb-[8px]'>
					Join us in Madrid for AsyncAPI Conference and learn how to speak
					fluent API! Let's taco 'bout messaging and have a fiesta you won't
					forget!
				</p>
			</div>
		</div>
	);
}

export default Venue


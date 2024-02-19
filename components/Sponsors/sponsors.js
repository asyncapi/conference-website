/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';

function Sponsors({imgs}) {
  return (
		<div className='sponsor-bg container text-center'>
			<div className='py-[80px] flex flex-col items-center'>
				<Heading typeStyle='heading-md' className='text-white'>Event and Host Sponsor</Heading>
				<div className='w-[718px] sm:w-full'>
					<Paragraph className='mt-[40px]' textColor='text-white'>
						Elevating the future of APIs. Our valued partners and sponsors play
						a pivotal role in bringing our vision to life. With their support, we 
						orchestrate an unforgettable api celebration.
					</Paragraph>
				</div>
				<div className='flex justify-center mt-[40px] w-[650px] sm:w-full sm:flex-col sm:justify-center sm:items-center'>
					{imgs &&
						imgs.map((img) => (
							<div key={img} className='w-[300px] flex items-center sm:mt-6'>
								<img src={img} alt={img} className='' />
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

export default Sponsors
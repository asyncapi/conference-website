/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';

function Sponsors({imgs}) {
  return (
		<div className='sponsor-bg container text-center'>
			<div className='py-[80px] flex flex-col items-center'>
				<Heading className='text-white'>Event and Host Sponsor</Heading>
			  <div className='w-[718px] sm:w-full'>
				  <Paragraph className='mt-[40px]'>A special thank you to our Event Host and Sponsor. Your kindness in
						hosting us and sponsoring our event is truly exceptional. We
						appreciate you!</Paragraph>
				</div>
				<div className='flex justify-center mt-[40px] w-[650px] sm:w-full sm:flex-col sm:justify-center sm:items-center'>
					{imgs && imgs.map((img) => <img key={img} src={img} alt={img} />)}
				</div>
			</div>
		</div>
	);
}

export default Sponsors


{/* <img src='/img/sngular.png' alt='sngular' />
					<img src='/img/IBM.png' alt='sngular' /> */}
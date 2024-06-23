/* eslint-disable @next/next/no-img-element */
import React from "react";
import Heading from "../Typography/heading";
import Paragraph from "../Typography/paragraph";

function Sponsors({ imgs }) {
  return (
		<div className='sponsor-bg container text-center'>
			<div className='py-[80px] flex flex-col items-center'>

				<div className='max-w-3xl sm:w-full'>
					<Paragraph className='mt-[40px]' textColor='text-white'>
						Elevating the future of APIs. Our valued partners and sponsors play
						a pivotal role in bringing our vision to life. With their support, we 
						orchestrate an unforgettable celebration.
					</Paragraph>
				</div>
				<Heading typeStyle='heading-md' className='text-white mt-10 sm:text-2xl sm:mt-5'>Event and Host Sponsor</Heading>
				<div className='flex justify-center  w-[650px] sm:w-full sm:flex-col sm:justify-center sm:items-center'>
					{imgs &&
						imgs.map((img) => (
							<div key={img} className='w-[300px] h-[150px] flex items-center'>
								<img src={img} alt={img} className='' />
							</div>
						))}
				</div>
				<div className=' flex space-y-2 flex-col items-center justify-center text-white text-2xl font-bold'>
				<Heading typeStyle='heading-md' className='text-white mb-12 sm:text-2xl'>Financial Sponsor</Heading>
					
					<img src="/img/graviteeio.svg"  alt='financial sponsor' width={250} />
				</div>
			</div>
		</div>
	);
}

export default Sponsors

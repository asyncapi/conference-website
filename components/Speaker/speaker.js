import Image from 'next/image';
import React from 'react'

function Speaker({details, location, className}) {
  return (
		<div
			className={`w-auto text-center flex flex-col items-center card h-auto rounded-md p-[27px] ${className}`}
			data-test="speakers-section"
		>
			<div className='w-[300px] h-[300px] lg:w-[250px] lg:h-[250px] relative overflow-hidden  rounded-full border-2 border-gray-300 bg-gray-800'>
				<Image src={details.img} alt={details.name} width={0} height={0} sizes='100vw' className='rounded-full object-cover transition-all duration-300 hover:scale-110 w-[100%] h-[100%]' />
			</div>
			<div className='mt-[19px]'>
				<h3 className='text-[23px] text-white'>{details.name}</h3>
				<div
					className={`flex flex-col ${
						location && 'min-h-[150px]'
					} justify-between`}
				>
					<div>
						{' '}
						<p className='mt-[6.6px] text-[18px] text-gray-500'>{details.title}</p>
					</div>
					<div>
						<p className='mt-[6.6px] text-[20px] text-gradient'>
							{location?.location}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Speaker



import React from 'react'

function Speaker({details, location, className}) {
  return (
		<div
			className={`w-[385px] text-center card-bg h-[525px] rounded-md p-[27px] ${className}`}
		>
			<img
				src={details.img}
				alt={details.name}
				className='rounded-[200px] w-[322px] h-[322px]'
			/>
			<div className='mt-[19px]'>
				<h3 className='text-[23px] text-white'>{details.name}</h3>
				<p className='mt-[6.6px] text-[20px] text-gray'>{details.title}</p>
				<p className='mt-[6.6px] text-[20px] text-gray'>{location.location}</p>
			</div>
		</div>
	);
}

export default Speaker
import React from 'react'

function Speaker({details, location, className, size='md'}) {
  return (
		<div
			className={`w-[300px]  my-5 text-center flex flex-col items-center card-bg h-auto rounded-md p-7 ${className}`}
		>
			<div className='w-[200px] h-[200px]'>
				<img
					src={details.img}
					alt={details.name}
					className='rounded-full hover:scale-105 transition-transform w-full h-full object-cover'
				/>
			</div>
			<div className='mt-5'>
				<h3 className='text-xl font-semibold  text-white'>{details.name}</h3>
				<div
					className={`flex flex-col ${
						location ? 'min-h-[150px]':''
					} justify-between`}
				>
					<div>
						<p className='mt-[6.6px] text-md text-white'>{details.title}</p>
					</div>
					<div>
						<p className='mt-[6.6px] text-md text-gray'>
							{location?.location}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Speaker



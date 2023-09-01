import React from 'react'

function Speaker({details, location, className}) {
  return (
		<div
			className={`w-auto text-center flex flex-col items-center card-bg h-auto rounded-md p-[27px] ${className}`}
		>
			<div className='w-[300px] h-[300px] lg:w-[250px] lg:h-[250px]'>
				<img
					src={details.img}
					alt={details.name}
					className='rounded-[200px] w-full h-full object-cover'
				/>
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
						<p className='mt-[6.6px] text-[20px] text-gray'>{details.title}</p>
					</div>
					<div>
						<p className='mt-[6.6px] text-[20px] text-gray'>
							{location?.location}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Speaker



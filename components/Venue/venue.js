/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';
import Link from 'next/link';
import Image from 'next/image'
function Venue({ className, city }) {
	return (
		<div className={`w-[500px] cursor-pointer sm:w-auto min-h-[650px] ${className}`}>
			<Link href={`/venue/${city.name}`} className=''>
				<div className='w-[450px] sm:w-auto sm:h-[320px] card-bg flex items-center justify-center p-10'>
					<img src={city.img} className='sm:w-[350px] h-[250px] rounded-lg hoverEffect' />
				</div>
			</Link>

			<div className='mt-[24px] w-[450px] sm:w-full'>
				<p className='text-[#47BCEE] text-[24px] py-[8px]'>{city.date}</p>
				<Heading typeStyle='lg' className='text-white text-[30px]'>
					{city.name}, {city.country}
				</Heading>
				<div className='flex flex-col justify-between items-baseline'>
					<Paragraph className='pt-[16px] h-full pb-[8px]'>
						{city.description}
					</Paragraph>
					{city.recordedTalk
						? <div className='p-2 mt-auto absolute bottom-0 flex items-center justify-between w-[170px] bg-black text-white shadow-sm leading-6 px-4 rounded-lg font-semibold'>
							<Image src={require('../../public/img/yt-icon.webp')} alt='youtube icon' width={20} height={20} />
							<a rel="noreferrer" target='_blank' href={city.recordedTalk} >Recorded Talk</a>
						</div>
						: null}
				</div>
			</div>
		</div>
	);
}

export default Venue;

/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import cities from '../../config/city-lists.json';
import Button from '../../components/Buttons/button';
import Heading from '../../components/Typography/heading';
import Paragraph from '../../components/Typography/paragraph';
import speakers from '../../config/speakers.json';
import Sponsors from '../../components/Sponsors/sponsors';

export async function getStaticProps({ params }) {
	let res = {};
	const data = cities.filter((p) => p.name === params.id);
	res = data[0];
	const getSpeakers = speakers.filter((s) => s.city === res?.name);
	res.speakers = getSpeakers[0].lists;
	res.agenda = getSpeakers[0].agenda || null;
	return {
		props: {
			city: res,
		},
	};
}

export async function getStaticPaths() {
	const paths = cities.map((city) => ({
		params: { id: city.name },
	}));
	return {
		paths,
		fallback: false,
	};
}

function Venue({ city }) {
	return (
		<div>
			<div className='w-full h-[500px] sm:h-[auto] bg-madrid bg-cover bg-center'>
				<div className='w-full h-full kinda-dark items-center flex flex-col justify-between'>
					<div className='mt-[82px] container text-center flex flex-col items-center w-[1100px] lg:w-full sm:text-center'>
						<Heading className='text-white'>
							{city.name}, {city.country}
						</Heading>
						<Paragraph className='mt-[24px]' textColor='text-white'>{city.description}</Paragraph>

						<Heading typeStyle='lg' className='text-white mt-[24px] hover:underline'>
							<a href={city.map} target='_blank' rel="noreferrer">
    							{city.address}
  							</a>
						</Heading>
						<Heading typeStyle='lg' className='text-white mt-[24px]'>
							{city.date}
						</Heading>
						{city.ended ? "" : <div className='m-[30px]'>
							{city.ticket && <a href={city.ticket} target='_blank' rel='noreferrer'>
							<Button className="px-8 m-2 w-[250px]">{city.isFree ? "Register for free" : "Register now"}</Button>
						</a>}
						{city.cfp && <a href={city.cfp} target='_blank' rel='noreferrer'>
							<Button className="px-8 m-2 w-[250px]">Apply to be a speaker</Button>
						</a>}
						</div>}
					</div>
				</div>
			</div>
			<div
				id='sponsors'
			>
				<Sponsors imgs={city.sponsors} />
			</div>
		</div>
	);
}

export default Venue;

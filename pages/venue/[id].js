/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import cities from '../../config/city-lists.json';
import Button from '../../components/Buttons/button';
import Heading from '../../components/Typography/heading';
import Paragraph from '../../components/Typography/paragraph';
import Agenda from '../../components/Agenda/agenda';
import Speaker from '../../components/Speaker/speaker';
import speakers from '../../config/speakers.json';
import Sponsors from '../../components/Sponsors/sponsors';
import Paper from '../../components/Form/paper';

const tabs = [
	{
		title: 'Agenda',
	},

	{
		title: 'Speakers',
	},
	{
		title: 'Sponsors',
	},
];

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
						<Paragraph className='mt-[24px]'>{city.description}</Paragraph>

						<Heading typeStyle='lg' className='text-white mt-[24px]'>
							<a href={`http://maps.google.com/?q=${city.address}`} target='_blank' rel='noreferrer' >
							{city.address}
							</a>
						</Heading>
						<Heading typeStyle='lg' className='text-white mt-[24px]'>
							{city.date}
						</Heading>
						{city.ended ? "" : <div className='m-[30px]'>
							{city.ticket !== "" && (
								<a href={city.ticket} target='_blank' rel='noreferrer'>
									<Button className="px-8 m-2">{city.buttonText}</Button>
								</a>
							)}
							{city.freeTickets !== "" && (
								<a href={city.freeTickets} target='_blank' rel='noreferrer'>
									<Button className="px-8 m-2">{city.freeTicketText}</Button>
								</a>
							)}
						</div>}
					</div>
				</div>
			</div>
			<div
				id='agenda'
				className='border border border-x-0 border-b-0 border-t-[#333] py-28 container flex flex-col justify-center items-center '
			>
				<div className='w-[1130px] lg:w-full'>
					<Agenda city={city} />
				</div>
			</div>
			{city.name === 'Bangalore' ? <div id='speakers' className='container border border border-x-0 border-b-0 border-[#333] py-28'>
				<Paper />
			</div> : <div
				id='speakers'
				className='border border border-x-0 border-b-0 border-[#333] py-28'
			>
				<div className='mt-[64px] container flex flex-col justify-center items-center pb-[181px]'>
					<div className='w-[1130px] flex flex-col items-center lg:w-full'>
						<div className='text-center'>
							<Heading className='text-[30px] text-white'>Speakers</Heading>
							<Paragraph className='mt-[16px]'>
								Meet Our Expert Speakers
							</Paragraph>
						</div>
						{typeof city.speakers === 'string' ? (
							<div className='mt-[140px] flex items-center justify-center text-center'>
								<div className='w-[720px] lg:w-full'>
									<Heading typeStyle='lg' className='text-white text-[30px]'>
										Speakers To Be Announced Soon - Stay Tuned!
									</Heading>
								</div>
							</div>
						) : Object.keys(city.speakers).length > 0 ? (
							<div className='w-full mt-[64px] grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4'>
								{city.speakers.map((speaker, i) => {
									return (
										<Speaker
											key={i}
											details={speaker}
											// location={city}
											className='mt-10'
										/>
									);
								})}
							</div>
						) : (
							<div className='w-[720px] lg:w-full mt-[140px] text-center'>
								<Heading className='text-white'>
									Speakers Coming Soon - Stay Tuned!
								</Heading>
								<Paragraph className='mt-12'>
									We are actively accepting speaker applications, and you can
									start your journey by clicking the button below. Join us on
									stage and share your valuable insights with our enthusiastic
									audience!
								</Paragraph>
								<a href={city.name === 'Paris' ? 'https://apidays.typeform.com/to/ILJeAaV8#event_name=xxxxx' : null} target="_blank" rel="noopener noreferrer">	
									<Button className='mt-[80px] w-[244px] border border-gray card-bg'>
										Apply as a Speaker
									</Button>
								</a>
							</div>
						)}
					</div>
				</div>
			</div>}
			<div
				id='sponsors'
				className='border border border-x-0 border-b-0 border-[#333] py-28'
			>
				<Sponsors imgs={city.sponsors} />
			</div>
		</div>
	);
}

export default Venue;

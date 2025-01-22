/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import cities from '../../config/city-lists.json';
import Button from '../../components/Buttons/button';
import Heading from '../../components/Typography/heading';
import Paragraph from '../../components/Typography/paragraph';
import speakers from '../../config/speakers.json';
import Sponsors from '../../components/Sponsors/sponsors';
import { isEventEnded } from '../../components/Venue/venue';
import Agenda from '../../components/Agenda/agenda';
import Guidelines from '../../components/Speaker/guideline';
import CFPdata from "../../config/cfp-data.json"
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
	
	const eventEnded = isEventEnded(city.date);
	const textColor = eventEnded ? "text-gray-400": "text-white";

	return (
		<div data-test={`venue-${city.name}`}>
			<div className= {`w-full h-[500px] sm:h-[auto] ${city.name=='Online'?'bg-online':'bg-madrid'} bg-cover bg-center`}>
				<div className='w-full h-full kinda-dark items-center flex flex-col justify-between'>
					<div className='mt-[68px] container text-center flex flex-col items-center w-[1100px] lg:w-full sm:text-center'>
						{city.name == 'Online' ? <Heading className={textColor}>
							{city.name} {city.country}
						</Heading> :
						<Heading className={textColor}>
							{city.name}, {city.country}
						</Heading>}
						
						<Paragraph className='mt-[24px]' textColor={textColor}>{city.description}</Paragraph>

						<Heading typeStyle='lg' className={`${textColor} mt-[24px] underline`}>
							<a href={city.map} target='_blank' rel="noreferrer">
    							{city.address}
  							</a>
						</Heading>
						<Heading typeStyle='lg' className={`${textColor} mt-[24px]`}>
							{city.date}
						</Heading>
						{city.ended ? (city.playlist && <a href='#recordings'><Button className="w-[250px] h-[50px] m-8">Watch Recordings</Button></a>): <div className='m-[30px]'>
							{city.ticket && <a href={city.ticket} target='_blank' rel='noreferrer'>
							<Button className="px-8 m-2 w-[250px]">{city.isFree ? "Get Your Free Ticket" : "Register Now"}</Button>
						</a>}
						{(!eventEnded && city.cfp) && <a href={city.name === 'online'? "/venue/online/register" :city.cfp}target={city.name=='Online'?"":'_blank'} rel='noreferrer'>
							<Button className="px-8 m-2 w-[250px]">Apply to be a speaker</Button>
						</a>}
						</div>}
					</div>
				</div>
			</div>
			<div
				id='agenda'
				className='border border-x-0 border-b-0 border-t-[#333] py-28 container flex flex-col justify-center items-center '
			>
				{city.cfp ? <div className='w-[1090px] lg:w-full'>
				<Guidelines talkDeadLine={(city.name=='Online' && CFPdata.CallEndDate) || city.cfpdate} virtual={city.name=='Online'} name={city.name} cfp={city.cfp}/>
				</div> : <div className='w-[1130px] lg:w-full'>
					<Agenda city={city} />
				</div>}
			</div>
			<div id="recordings" className='flex justify-center'>
				{city.ended ?  (city.playlist && 
			<div className=' pt-10 mb-24 mx-44 lg:mx-7 flex justify-center flex-col items-center w-[90%] h-[550px] sm:h-72'>
				<h1 className='text-white font-bold text-5xl mb-10'>Recordings</h1>
				<iframe width="100%" height="100%" src={city.playlist} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
			</div>
		    ) : <div></div>}
			</div>
			<div
				id='sponsors'
			>
				<Sponsors eventSponsors={city.sponsors.eventSponsors} financialSponsor={city.sponsors.financialSponsors} />
			</div>
		</div>
	);
}

export default Venue;

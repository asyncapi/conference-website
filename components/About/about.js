import React from 'react'
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';

function About() {
    return (
			<div className='relative overflow-hidden h-[100vh] lg:h-full'>
				<img src='/img/sun.png' className='bg-03' />
				<div className='pt-[160px] lg:py-[100px] container flex items-center justify-center w-full'>
					<div className='w-[1120px] lg:w-full flex lg:flex-col-reverse items-center justify-between'>
						<div
							className='w-[600px] h-[550px] lg:w-[350px] lg:h-[350px] lg:mt-10 border p-10 card-bg'
							style={{
								borderRadius: '100%',
							}}
						>
							<img src='/img/hand.png' className='w-[663px]' />
						</div>
						<div className='w-[604px] ml-10 lg:w-full lg:text-center'>
							<Heading className='text-white'>
								About AsyncAPI Conf on Tour 2023?
							</Heading>
							<Paragraph typeStyle='md' className="lg:mt-10" >
								The AsyncAPI Conf on Tour 2023 is planned to take the online
								event to the next level by hosting physical events in four
								different locations across the globe. Each location will feature
								its own keynote speakers, panels, and networking events,
								allowing attendees to experience the conference in person while
								still connecting with the larger global community.
							</Paragraph>
						</div>
					</div>
				</div>
			</div>
		);
}

export default About
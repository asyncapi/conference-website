import React from 'react'

function About() {
    return (
			<div className='relative overflow-hidden h-[100vh]'>
				<img src='/img/sun.png' className='bg-03' />
				<div className='pt-[160px] container flex items-center justify-center w-full'>
					<div className='w-[1310px] flex items-center justify-between'>
						<div
							className='w-[650px] h-[650px] border p-10 card-bg'
							style={{
								borderRadius: '100%',
							}}
						>
							<img src='/img/hand.png' className='w-[663px]' />
						</div>
						<div className='w-[604px]'>
							<h1 className='text-[64px] font-bold text-white leading-[64px]'>
								About AsyncAPI Conf 2023?
							</h1>
							<p className='text-[18px] text-gray mt-[20px]'>
								The AsyncAPI Conf2023 on Tour is planned to take the online
								event to the next level by hosting physical events in five
								different locations across the globe. Each location will feature
								its own keynote speakers, panels, and networking events,
								allowing attendees to experience the conference in person while
								still connecting with the larger global community.
							</p>
						</div>
					</div>
				</div>
			</div>
		);
}

export default About
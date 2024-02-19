import React from 'react'
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';
import Button from '../Buttons/button';

function About() {
    return (
		<div className='p-24 container flex items-center justify-center w-full'>
			<div className='w-[1120px] lg:w-full flex lg:flex-col-reverse items-center justify-between'>
				<div style={{'--image-url': `url('/img/about.jpeg')`, borderRadius: "40px"}} className='bg-[image:var(--image-url)] bg-center bg-cover w-[450px] h-[550px]' >

			</div>
				<div className='w-[600px] ml-10 lg:ml-0 lg:w-full lg:text-center'>
				<div className='flex items-center'>
					<div className='w-[40px] h-[3px] bg-blue-400' />
						<div className='ml-4 text-xl text-white font-semi-bold'>About The Event</div>
						</div>
					<Heading typeStyle='heading-md' className='text-gradient'>
					AACoT'24
					</Heading>
					<Paragraph typeStyle='body-lg' className="mt-6" textColor='text-gray-200' >
					The AsyncAPI Conf on Tour is an official event created by the AsyncAPI
					Initiative. This conference is aimed primarily at the community to share and
					exchange experiences between existing users and new members. We plan to
					integrate new members into the community and expand their knowledge about
					the project.
					</Paragraph>
					<div className='mt-10'>
						<Button className="border border-secondary-100 text-red">Become a sponsor now</Button>
					</div>
				</div>
			</div>
		</div>
		);
}

export default About
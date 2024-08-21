import Image from 'next/image';
import CFPdata from "../../config/cfp-data.json"

import React from 'react';

import Button from '../../components/Buttons/button';
import Heading from '../../components/Typography/heading';
import Paragraph from '../../components/Typography/paragraph';

export default function CFSBanner() {
  return (

    <div className='w-full h-[500px] sm:h-[auto] bg-online bg-cover bg-center'>
				<div className='w-full h-full kinda-dark items-center flex flex-col justify-between'>
					<div className='mt-[82px] container text-center flex flex-col items-center w-[1100px] lg:w-full sm:text-center'>
						<Heading className='text-white'>
							Online edition
						</Heading>
						<Paragraph className='mt-[24px]' textColor='text-white'>This conference is aimed primarily at the community to share and exchange experiences between existing users and new members. We aim to integrate new members into the community and expand their knowledge about the project.</Paragraph>

						<Heading typeStyle='lg' className='text-white mt-[24px] hover:underline'>
							<a href="https://www.youtube.com/@AsyncAPI" target='_blank' rel="noreferrer">
    							Our Youtube Channel
  							</a>
						</Heading>
						<Heading typeStyle='lg' className='text-white mt-[24px]'>
							{CFPdata.EventStartDate}
						</Heading>
						{CFPdata.ended ? "" : <div className='m-[30px]'>
						{<a href="/venue/online/register" rel='noreferrer'>
							<Button className="px-8 m-2 w-[250px]">Apply to be a speaker</Button>
						</a>}
						</div>}
					</div>
				</div>
			</div>
  );
}

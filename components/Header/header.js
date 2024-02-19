import React from 'react';
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';
import Button from '../Buttons/button';
import ReactSlider from '../Slider/slider';
import cities from '../../config/city-lists.json';
import { useMediaQuery } from 'react-responsive';
import Venue from '../Venue/venue';

function Header() {
	const isTablet = useMediaQuery({ maxWidth: '1118px' });

	return (
		<div className='h-[100vh] relative'>
			<div className='container w-full flex items-center justify-center'>
				<div className=''>
					<div className='flex justify-center w-full mt-36'>
						<div className='flex flex-col justify-center items-center w-full'>
							<div className='sm:w-full text-center'>
								<Heading
									className='text-6xl sm:text-4xl leading-normal sm:leading-38px tracking-[-3px] sm:tracking-[-0.02em] font-extrabold'
									level='h1'
									typeStyle='heading'
								>
									AsyncAPI Conf On Tour 2024
								</Heading>
							</div>
							<div className='w-[624px] sm:w-full text-center'>
								<Paragraph className='mt-[16px]'>
								Join us for the AsyncAPI Conference on Tour,
								bringing the latest in AsyncAPI technology to locations worldwide!
								</Paragraph>
							</div>
							<div className='mt-[54px] relative flex items-center justify-center'>
								<a
									href='https://ticket.apidays.global/event/apidays-paris-2023/8a1f3904-e2be-4c69-a880-37d2ddf1027d/cart?coupon=ASYNCAPICONF23'
									target='_blank'
									rel='noreferrer'
								>
									<Button className='w-[200px]'>Get Started</Button>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='mt-24'>
				<ReactSlider>
					{cities.map((city) => {
						return <Venue key={city.name} city={city} />;
					})}
				</ReactSlider>
			</div>
		</div>
	);
}

export default Header;

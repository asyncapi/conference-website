import React, { useEffect, useState, useRef } from 'react';
import cities from '../../config/cities.json';
import cityList from '../../config/city-lists.json';
let Globe = () => null;
import Countdown from 'react-countdown';
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';
import Button from '../Buttons/button';
import { useMediaQuery } from 'react-responsive';

function Header() {
	const isTablet = useMediaQuery({ maxWidth: '1118px' });
	if (typeof window !== 'undefined') Globe = require('react-globe.gl').default;
	const globeEl = useRef();
	const [places, setPlaces] = useState(cities.features);
	const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="white" cx="14" cy="14" r="7"></circle>
  </svg>`;

	useEffect(() => {
		// Auto-rotate
		globeEl.current.controls().autoRotate = true;
		globeEl.current.controls().autoRotateSpeed = 1;
		globeEl.current.controls().enableZoom = false;
	}, []);

	const gData = [...places].map((place) => {
		let color = null;
		let size = null;
		for (let i = 0; i < cityList.length; i++) {
			if (place.properties.name === cityList[i].name) {
				color = '#5100ff';
				size = 30;
			}
		}
		return {
			lat: place.properties.latitude,
			lng: place.properties.longitude,
			size: size ? size : 20,
			color: color ? color : 'white',
		};
	});
	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			// Render a completed state
			return '';
		} else {
			// Render a countdown
			return (
				<div className='flex items-center  w-[200px] sm:w-[100px] justify-between'>
					<div>
						<h1 className='glitch text-white text-[30px] sm:text-[18px]'>
							{days}:
						</h1>
						{/* <p className='text-lg mt-[30px]'>Days</p> */}
					</div>
					<div>
						<h1 className='glitch text-white text-[30px] sm:text-[18px]'>
							{hours}:
						</h1>
						{/* <p className='text-lg mt-[30px]'>Hours</p> */}
					</div>
					<div>
						<h1 className='glitch text-white text-[30px] sm:text-[18px]'>
							{minutes}:
						</h1>
						{/* <p className='text-lg mt-[30px]'>Minutes</p> */}
					</div>
					<div>
						<h1 className='glitch text-white text-[30px] sm:text-[18px]'>
							{seconds}
						</h1>
						{/* <p className='text-lg mt-[30px]'>Seconds</p> */}
					</div>
				</div>
			);
		}
	};
	const dateString = 'September 26, 2023';
	const dateObj = new Date(dateString);
	return (
		<div className='overflow-hidden h-[57rem] lg:h-[auto] relative'>
			<img src='/img/illustra.png' className='bg-01' />
			<div className='container w-full flex items-center justify-center'>
				<div className='w-[1131px] pb-8'>
					<div className='flex justify-center w-full mt-12'>
						<div className='flex flex-col justify-center items-center w-full'>
							<div className='w-[624px] sm:w-full text-center'>
								<Heading
									className='countdown-text-gradient'
									level='h1'
									typeStyle='heading-lg'
								>
									AsyncAPI Conf On Tour 2023
								</Heading>
							</div>
							<div className='w-[624px] sm:w-full text-center'>
								<Paragraph className='mt-[16px]'>
									Join us for the first-ever AsyncAPI Conference on Tour,
									bringing the latest in async API technology to locations
									worldwide!
								</Paragraph>
							</div>
							<div className='mt-[54px]'>
								<Button className='w-[200px]'>Buy Tickets</Button>
							</div>
						</div>
					</div>
					<div className='mt-[400px] sm:mt-[150px] flex items-center justify-between'>
						<div className='home-title'>
							<span className='text-[25px] sm:text-[18px] text-white font-bold'>
								London, UK
							</span>
						</div>
						<Countdown date={dateObj} daysInHours={false} renderer={renderer} />
					</div>
				</div>
			</div>
			<div
				className='relative sm:hidden flex items-center justify-center'
				style={{
					display: isTablet && 'none',
				}}
			>
				<div className='test-2'></div>
				<div
					className='globe-viz'
					style={{
						marginTop: '-400px',
					}}
				>
					<Globe
						ref={globeEl}
						zoom={false}
						htmlTransitionDuration={1000}
						htmlElementsData={gData}
						htmlElement={(d) => {
							const el = document.createElement('div');
							el.innerHTML = markerSvg;
							el.style.color = d.color;
							el.style.width = `${d.size}px`;
							el.style['pointer-events'] = 'auto';
							el.style.cursor = 'pointer';
							el.onclick = () => console.info(d);
							return el;
						}}
						globeImageUrl='https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/clouds/clouds.png'
						backgroundColor='rgba(0,0,0,0)'
						width='700px'
						height='700px'
					/>
				</div>
			</div>
			<div></div>
		</div>
	);
}

export default Header;

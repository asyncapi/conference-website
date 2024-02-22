import React, { useEffect, useState, useRef } from 'react';
import cities from '../../config/cities.json';
import cityList from '../../config/city-lists.json';
let Globe = () => null;
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';
import Button from '../Buttons/button';
import { useMediaQuery } from 'react-responsive';
import Countdowns from '../Countdown/countdown';

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
		globeEl.current.controls().autoRotateSpeed = 2;
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

	return (
		<div className='overflow-hidden h-[57rem] lg:h-[auto] relative'>
			<img src='/img/illustra.png' className='bg-01' />
			<div className='container w-full flex items-center justify-center'>
				<div
					className='absolute sm:hidden flex items-center justify-center'
					style={{
						display: isTablet && 'none',
						top: '250px',
					}}
				>
					<div className='globe-overlay'></div>
					<div className='globe-viz'>
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
								return el;
							}}
							globeImageUrl='//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
							backgroundColor='rgba(0,0,0,0)'
							width='700px'
							height='700px'
						/>
					</div>
				</div>
				<div className='w-[1131px] pb-8 z-99'>
					<div className='flex justify-center w-full mt-12'>
						<div className='flex flex-col justify-center items-center w-full'>
							<div className='w-[624px] sm:w-full text-center'>
								<Heading
									className='countdown-text-gradient text-7xl sm:text-4xl leading-normal sm:leading-38px tracking-[-3px] sm:tracking-[-0.02em] font-extrabold'
									level='h1'
									typeStyle='heading'
								>
									AsyncAPI Conf On Tour 2023
								</Heading>
							</div>
							<div className='w-[624px] sm:w-full text-center'>
								<Paragraph className='mt-[16px]'>
									Join us for the first-ever AsyncAPI Conference on Tour,
									bringing the latest in AsyncAPI technology to locations
									worldwide!
								</Paragraph>
							</div>
							<div className='mt-[54px] relative flex items-center justify-center'>
							</div>
						</div>
					</div>
					<Countdowns />
				</div>
			</div>
			<div></div>
		</div>
	);
}

export default Header;

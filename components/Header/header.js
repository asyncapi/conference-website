import React, { useEffect, useState, useRef } from 'react';
import cities from '../../config/cities.json';
let Globe = () => null;
import Countdown from 'react-countdown';

function Header() {
	if (typeof window !== 'undefined') Globe = require('react-globe.gl').default;
	const globeEl = useRef();
	const [places, setPlaces] = useState(cities.features);
	const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

	useEffect(() => {
		// Auto-rotate
		globeEl.current.controls().autoRotate = true;
		globeEl.current.controls().autoRotateSpeed = 1;
	}, []);

	const gData = [...places].map((place) => {
		return {
			lat: place.properties.latitude,
			lng: place.properties.longitude,
			size: 1 + Math.random() * 30,
			color: 'white',
		};
	});
	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			// Render a completed state
			return '';
		} else {
			// Render a countdown
			return (
				<div className='flex items-center w-[200px] justify-between'>
					<div>
						<h1 className='glitch text-[30px]'>{days}:</h1>
						{/* <p className='text-lg mt-[30px]'>Days</p> */}
					</div>
					<div>
						<h1 className='glitch text-[30px]'>{hours}:</h1>
						{/* <p className='text-lg mt-[30px]'>Hours</p> */}
					</div>
					<div>
						<h1 className='glitch text-[30px]'>{minutes}:</h1>
						{/* <p className='text-lg mt-[30px]'>Minutes</p> */}
					</div>
					<div>
						<h1 className='glitch text-[30px]'>{seconds}</h1>
						{/* <p className='text-lg mt-[30px]'>Seconds</p> */}
					</div>
				</div>
			);
		}
	};
	const dateString = 'September 20, 2023';
	const dateObj = new Date(dateString);
	return (
		<div className='overflow-hidden h-[56.9rem] relative'>
			<img src='/img/illustra.png' className='bg-01' />
			<div className='container flex flex-col justify-between h-full'>
				<div className='flex justify-center w-[full] mt-12'>
					<div className='flex flex-col justify-center items-center w-full'>
						<div className='w-[624px] text-center'>
							<h1 className='text-[60px] countdown-text-gradient font-bold leading-[88px]'>
								AsyncAPI Conf On Tour 2023
							</h1>
						</div>
						<div className='w-[624px] text-center'>
							<p className='mt-[16px] text-[20px] text-gray-400'>
								Join us for the first-ever AsyncAPI Conference on Tour, bringing
								the latest in async API technology to locations worldwide!
							</p>
						</div>
						<div className='mt-[54px]'>
							<button className='gradient-bg text-white w-[200px] h-[54px] rounded-md p-[8px]'>
								Buy Tickets
							</button>
						</div>
					</div>
				</div>
				<div className='mt-20 flex items-center justify-between'>
					<div className='home-title'>
						<span className='text-[25px] font-bold'>Madrid, Spain</span>
						<span className='text-lg mt-[10px]'>de Madrid al Cielo</span>
					</div>
					<Countdown date={dateObj} daysInHours={false} renderer={renderer} />
				</div>
			</div>
			<div className='absolute bottom-[-300px] left-[500px] w-[700px] h-[700px] border rounded-[500px]'>
				<div className='relative'></div>
				<div className='mr-[100px] globe-viz'>
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
						globeImageUrl='//unpkg.com/three-globe/example/img/earth-water.png'
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

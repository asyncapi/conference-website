import React, { useEffect, useRef, useState } from 'react';
import Countdown from 'react-countdown';

const dates = [
	{
		name: 'London, UK',
		date: 'September 18, 2024',
	},
	{
		name: 'Online ,Edition',
		date: 'October 30, 2024',
	},
	{
		name: 'Paris, France',
		date: 'December 3, 2024',
	},
];

function Countdowns() {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const locationRef = useRef(null);
	const dateRef = useRef(null);
	useEffect(() => {
		const intervalId = setInterval(() => {
			locationRef.current.classList.remove('hidden');
			locationRef.current.classList.add('home-title');
			dateRef.current.classList.remove('hidden');
			dateRef.current.classList.add('home-title');
			setSelectedIndex((prevIndex) => (prevIndex + 1) % dates.length);
			
			setTimeout(() => {
				if(locationRef?.current) {
					locationRef.current.classList.remove('home-title');
					locationRef.current.classList.add('hidden');
				}
				if(dateRef?.current) {
					dateRef.current.classList.remove('home-title');
					dateRef.current.classList.add('hidden');
				}
			}, 9900); // Element stays visible for 800 milliseconds
		}, 10000); // Toggle visibility every 1500 milliseconds

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			// Render a completed state
			return <div
					className='home-title flex items-center  w-[200px] sm:w-[100px] justify-between'
					ref={dateRef}
			>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div>
						<span className='glitch text-white text-[30px] sm:text-[18px]'>
							Ended
						</span>
					</div>
				</div>
		} else {
			// Render a countdown
			return (
				<div
					className='home-title flex items-center  w-[200px] sm:w-[100px] justify-between'
					ref={dateRef}
				>
					<div>
						<span className=' text-white text-[30px] sm:text-[18px] flex flex-col justify-center items-center '>
							{days} <span className='text-sm'>DAYS</span>
						</span>
					</div>
					<div>
						<span className='glitch text-white text-[30px] sm:text-[18px] flex flex-col justify-center items-center'>
							{hours} <span className='text-sm'>HOURS</span>
						</span>
					</div>
					<div>
						<span className='glitch text-white text-[30px] sm:text-[18px] flex flex-col justify-center items-center'>
							{minutes} <span className='text-sm'>MIN</span>
						</span>
					</div>
					<div>
						<span className='glitch text-white text-[30px] sm:text-[18px] flex flex-col justify-center items-center'>
							{seconds} <span className='text-sm'>SEC</span>
						</span>
					</div>
				</div>
			);
		}
	};
	return (
		<div className=' flex flex-col gap-y-5 px-10 py-5  items-center justify-between '>
			<div className='h-[40px]'>
				<div className='home-title' ref={locationRef}>
					<span className='text-[25px] sm:text-[18px] text-white font-bold'>
						{dates[selectedIndex].name}
					</span>
				</div>
			</div>
			<div className='h-[40px]'>
				<Countdown
					date={new Date(dates[selectedIndex].date)}
					daysInHours={false}
					renderer={renderer}
				/>
			</div>
		</div>
	);
}

export default Countdowns;

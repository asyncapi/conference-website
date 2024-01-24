import Slider from 'react-slick';
import Arrow from '../illustration/arrow';
import React, { useEffect, useState, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

function ReactSlider({ children, isAutoPlay }) {
	const isTablet = useMediaQuery({ maxWidth: '1224px' });
	const isMobile = useMediaQuery({ maxWidth: '590px' });
	const [slides, setSlides] = useState(2);

	useEffect(() => {
		if (isMobile) {
			setSlides(1);
		}
	}, [isMobile]);
	const slider = useRef(null);
	const settings = {
		dots: true,
		speed: 500,
		slidesToShow: slides,
		infinite: true,
		autoplay:isAutoPlay,
		slidesToScroll: slides,
		variableWidth: isMobile ? false : true,
		arrows: false,
		appendDots: (dots) => (
			<div
				style={{
					borderRadius: '10px',
					padding: '10px',
					display: 'flex',
					justifyContent: 'center',
					marginTop: '60px',
					alignItems: 'center',
				}}
			>
				<button
					onClick={() => slider?.current?.slickPrev()}
					className='mr-[40px]'
					disabled={
						slider.current &&
						slider.current.innerSlider.state.currentSlide === 0
					}
				>
					<Arrow
						className='rotate-[180deg] w-[24px] h-[24px]'
						fill={
							slider.current &&
							slider.current.innerSlider.state.currentSlide === 0 &&
							'#556061'
						}
					/>
				</button>
				<ul style={{ margin: '0px' }}>
					{dots.map((d) => {
						return (
							<li
								key={d.key}
								className={`w-[11px] h-[11px] rounded-full ${
									(d.props.className && 'bg-white') || 'bg-dark-700'
								}`}
							></li>
						);
					})}
				</ul>
				<button
					onClick={() => {
						slider?.current?.slickNext();
					}}
					className='ml-[40px]'
					disabled={
						slider.current &&
						slider.current.innerSlider.state.currentSlide === dots.length - 1
					}
				>
					<Arrow
						className='w-[24px] h-[24px]'
						fill={
							slider.current &&
							slider.current.innerSlider.state.currentSlide ===
								dots.length - 1 &&
							'#556061'
						}
					/>
				</button>
			</div>
		),
	};
	return (
		<Slider ref={slider} {...settings}>
			{children}
		</Slider>
	);
}

export default ReactSlider;

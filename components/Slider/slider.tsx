import Slider from 'react-slick';
import Arrow from '../illustration/arrow';
import React, { useEffect, useState, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

interface ReactSliderProps {
	children: React.ReactNode;
}

const ReactSlider: React.FC<ReactSliderProps> = ({ children }) => {
	const isMobile = useMediaQuery({ maxWidth: '590px' });
	const [slides, setSlides] = useState<number>(1);
	const slider = useRef<Slider>(null);

	useEffect(() => {
		if (isMobile) {
			setSlides(1);
		}
	}, [isMobile]);

	const settings = {
		slidesToScroll: slides,
		infinite: true,
		autoplay: true,
		speed: 10000,
		autoplaySpeed: 0,
		centerMode: true,
		cssEase: 'linear',
		variableWidth: !isMobile,
		arrows: false,
	};

	// Check if children is an array and has more than 4 items
	const shouldUseSlider = React.Children.count(children) > 4 || isMobile;

	return (
		<>
			{shouldUseSlider ? (
				<Slider ref={slider} {...settings}>
					{children}
				</Slider>
			) : (
				<div className='flex m-2 justify-center'>
					{children}
				</div>
			)}
		</>
	);
};

export default ReactSlider;

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import { useMediaQuery } from 'react-responsive';


function EmblaCarousel({ slides }) {
	const isMobile = useMediaQuery({ maxWidth: '590px' });
	
	const scrollOptions = {
		playOnInit: true,
		stopOnInteraction: false,
		stopOnMouseEnter: true,
		startDelay: 200,
		speed: 1
	}

	const options = {
		loop: true, 
		dragFree: true
	}
	
	const [emblaRef] = useEmblaCarousel({ ...options }, [
		AutoScroll({ ...scrollOptions })
	]);

	return (
		<>
			{slides.length > 4 || isMobile ? (
				<div className="embla" ref={emblaRef}>
					<div className="embla__container">
						{slides.map((item, idx) => (
							<div className="embla__slide" key={`embla__slide_${idx}`}>{item}</div>
						))}
					</div>
				</div>
			) : (
				<div className='flex m-2 justify-center'>{slides}</div>
			)}
		</>
	);
}

export default EmblaCarousel;

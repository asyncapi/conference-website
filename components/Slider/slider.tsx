import Slider from 'react-slick';
import React, { useEffect, useState, useRef, JSX } from 'react';
import { useMediaQuery } from 'react-responsive';

interface ISlider {
  children: React.ReactNode[];
}

function ReactSlider({ children }: ISlider): JSX.Element {
  const isMobile = useMediaQuery({ maxWidth: '260px' });
  const [slides, setSlides] = useState<number>(1);

  useEffect(() => {
    if (isMobile) {
      setSlides(1);
    }
  }, [isMobile]);
  const slider = useRef(null);
  const settings = {
    slidesToScroll: slides,
    infinite: true,
    autoplay: true,
    speed: 10000,
    autoplaySpeed: 0,
    centerMode: true,
    cssEase: 'linear',
    variableWidth: isMobile ? false : true,
    arrows: false,
  };

  return (
    <>
      {children.length > 4 || isMobile ? (
        <Slider ref={slider} {...settings}>
          {children}
        </Slider>
      ) : (
        <div className="flex m-2 justify-center">{children}</div>
      )}
    </>
  );
}

export default ReactSlider;

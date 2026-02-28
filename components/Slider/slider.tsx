'use client';

import Slider from 'react-slick';
import React, { useEffect, useState, useRef, JSX } from 'react';

interface ISlider {
  children: React.ReactNode[];
}

function ReactSlider({ children }: ISlider): JSX.Element {
  const [isMobile, setIsMobile] = useState(false);
  const [slides, setSlides] = useState<number>(1);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 260px)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
      if (e.matches) setSlides(1);
    };
    handleChange(mql);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);
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

import Slider from 'react-slick';
import React, { useEffect, useState, useRef, ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';

const ReactSlider = ({ children } : {children : ReactNode[]}) => {
  const isMobile = useMediaQuery({ maxWidth: 590 });
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
};

export default ReactSlider;

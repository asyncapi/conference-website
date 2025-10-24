import Slider from 'react-slick';
import React, { useEffect, useState, useRef, JSX } from 'react';
import { useMediaQuery } from 'react-responsive';

interface ISlider {
  children: React.ReactNode[];
}

function ReactSlider({ children }: ISlider): JSX.Element {
  const isMobile = useMediaQuery({ maxWidth: '260px' });
  const [slides, setSlides] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isMobile) {
      setSlides(1);
    }
  }, [isMobile]);
  const slider = useRef<any>(null);
  const settings = {
    slidesToScroll: slides,
    infinite: true,
    autoplay: !isPaused,
    speed: 10000,
    autoplaySpeed: 0,
    centerMode: true,
    cssEase: 'linear',
    variableWidth: isMobile ? false : true,
    arrows: false,
    pauseOnHover: true,
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (slider.current) {
      slider.current.slickPause();
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (slider.current) {
      slider.current.slickPlay();
    }
  };

  return (
    <>
      {children.length > 4 || isMobile ? (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Slider ref={slider} {...settings}>
            {children}
          </Slider>
        </div>
      ) : (
        <div className="flex m-2 justify-center">{children}</div>
      )}
    </>
  );
}

export default ReactSlider;

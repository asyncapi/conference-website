import Slider from "react-slick";
import Arrow from "../illustration/arrow";
import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";

function ReactSlider({ children }) {
  const isMobile = useMediaQuery({ maxWidth: "590px" });
  const [slides, setSlides] = useState(1);

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
    cssEase: "linear",
    variableWidth: isMobile ? false : true,
    arrows: false,
  };
  return (
    <Slider ref={slider} {...settings}>
      {children}
    </Slider>
  );
}

export default ReactSlider;

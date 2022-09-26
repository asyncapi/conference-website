import Slider from "react-slick";
import Arrow from "../illustrations/arrow";
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from "react-responsive";

function CardSlider({children, dotPosition}) {
    const isDesktop = useMediaQuery({minWidth: "1224px"});
     const isTablet = useMediaQuery({ maxWidth: "1224px" });
     const isMobile = useMediaQuery({ maxWidth: "500px" });
     const [slides, setSlides] = useState(3)
     useEffect(() => {
      if(isTablet){
        setSlides(2)
      }
      if(isMobile){
        setSlides(1)
      }
      if(isDesktop){
        setSlides(3)
      }
     },[isMobile, isTablet])
        const slider = React.useRef(null);
        const settings = {
          dots: true,
          speed: 500,
          slidesToShow: slides,
          slidesToScroll: slides,
          arrows: false,
          appendDots: (dots) => (
            <div
              style={{
                borderRadius: "10px",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                bottom: "-85px",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => slider?.current?.slickPrev()}
                className="mr-[40px]"
                disabled={
                  slider.current &&
                  slider.current.innerSlider.state.currentSlide === 0
                }
              >
                <Arrow
                  className="rotate-[180deg]"
                  stroke={
                    slider.current &&
                    slider.current.innerSlider.state.currentSlide === 0 &&
                    "#94a3b8"
                  }
                />
              </button>
              <ul style={{ margin: "0px" }}>
                {dots.map((d) => {
                  console.log(d.props.className)
                  return (
                    <li
                      key={d.key}
                      className={`w-[11px] h-[11px] rounded-full ${
                        (d.props.className && "bg-white") || "bg-dark-700"
                      }`}
                    ></li>
                  );
                })}
              </ul>
              <button
                onClick={() => {
                  console.log(slider.current.innerSlider.state);
                  slider?.current?.slickNext();
                }}
                className="ml-[40px]"
                disabled={
                  slider.current &&
                  slider.current.innerSlider.state.currentSlide ===
                    dots.length - 1
                }
              >
                <Arrow
                  stroke={
                    slider.current &&
                    slider.current.innerSlider.state.currentSlide ===
                      dots.length - 1 &&
                    "#94a3b8"
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
  )
}

export default CardSlider
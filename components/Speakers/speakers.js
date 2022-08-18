import React from 'react';
import Slider from 'react-slick';
import Card from '../Cards/card';
import Arrow from '../illustrations/arrow';


function Speakers() {
    const slider = React.useRef(null);
    const settings = {
      dots: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      appendDots: (dots) => (
        <div
          style={{
            borderRadius: "10px",
            padding: "10px",
            display: "flex",
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
              return (
                <li
                  key={d.key}
                  className={`w-[11px] h-[11px] bg-dark-700 rounded-full ${
                    d.props.className && "bg-white"
                  }`}
                ></li>
              );
            })}
          </ul>
          <button
            onClick={() => {
              console.log(slider.current.innerSlider.state);
              console.log(dots.length);
              slider?.current?.slickNext();
            }}
            className="ml-[40px]"
            disabled={
              slider.current &&
              slider.current.innerSlider.state.currentSlide === dots.length - 1
            }
          >
            <Arrow
              stroke={
                slider.current &&
                slider.current.innerSlider.state.currentSlide === dots.length - 1 &&
                "#94a3b8"
              }
            />
          </button>
        </div>
      ),
    };
  return (
    <div className="container mx-auto w-full speakers-bg h-[958px]">
      <div className="pt-[100px]">
        <h1 className="text-[84px] text-white tracking-tight">Speakers</h1>
        <div className="mt-[46px]">
          <Slider ref={slider} {...settings}>
            {Array(7)
              .fill()
              .map((i) => (
                <div key={i} className="">
                  <Card />
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Speakers
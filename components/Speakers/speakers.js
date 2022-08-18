import React from 'react';
import Slider from 'react-slick';

function Speakers() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    };
  return (
    <div className="container mx-auto w-full speakers-bg h-[958px]">
      <div className='pt-[100px]'>
        <h1 className="text-[84px] text-white tracking-tight">Speakers</h1>
        <div className='mt-[46px]'>
            <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          </ Slider>
        </div>
      </div>
    </div>
  );
}

export default Speakers
import React from 'react';
import Slider from 'react-slick';
import Card from '../Cards/card';


function Speakers() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };
  return (
    <div className="container mx-auto w-full speakers-bg h-[958px]">
      <div className='pt-[100px]'>
        <h1 className="text-[84px] text-white tracking-tight">Speakers</h1>
        <div className='mt-[46px]'>
            <Slider {...settings}>
                {Array(7).fill().map((i) => <div key={i} className=''>
                    <Card />
                </div>)}
          </ Slider>
        </div>
      </div>
    </div>
  );
}

export default Speakers
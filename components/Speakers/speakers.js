import React from 'react';
import Card from '../Cards/card';
import Tower from '../illustrations/tower';
import Stack from "../illustrations/stack";
import CardSlider from '../Cards/slider';

function Speakers() {
  return (
    <div className="container mx-auto w-full speakers-bg h-[958px] relative overflow-hidden">
      <div className="absolute right-0 top-[80px]">
        <div className="relative h-[25rem]">
          <Tower className="absolute right-[20px]" />
        </div>
        <Stack className="mt-[30px]" />
      </div>
      <div className="pt-[100px]">
        <h1 className="text-[84px] text-white tracking-tight">Speakers</h1>
        <div className="mt-[46px]">
          <CardSlider>
            {Array(7)
              .fill()
              .map((i) => (
                <div key={i} className="">
                  <Card
                    title="Missy Turco"
                    alt="missy"
                    summary="Product Designer, Postman"
                    img="/img/missy.png"
                  />
                </div>
              ))}
          </CardSlider>
        </div>
      </div>
    </div>
  );
}

export default Speakers
import React from 'react';
import Card from '../Cards/card';
import Tower from '../illustrations/tower';
import Stack from "../illustrations/stack";
import CardSlider from '../Cards/slider';
import speakers from './speakersList';
import Link from 'next/link';
import Scard from '../Cards/speakersCard';

function Speakers() {
  return (
    <div className=" min-h-auto md:h-[auto] bg-[#1c1234]">
      <div className="container mx-auto w-full ">
        <div className="pt-[100px] md:pt-[50px]">
          <h1 className="text-[84px] text-center text-white font-[400] tracking-tight md:text-[30px]">
            Speakers
          </h1>
          <div className="mt-[46px] md:mb-[100px] w-full min-h-fit p-10 flex flex-wrap justify-evenly">
            {/* <CardSlider> */}
              {speakers.map((speaker) => (
                <div key={speaker.name} className=" p-5">
                  <Scard
                    title={speaker.name}
                    alt={speaker.name}
                    summary={`${speaker.title}, ${speaker.company}`}
                    img={speaker.avatar}
                  />
                </div>
              ))}
            {/* </CardSlider> */}
          </div>
        </div>
      </div>
      <div className=' text-center'>
        <button className=" bg-buttonGradient text-white text-sm w-52 h-14 font-semibold rounded-sm py-2 px-4">All Speakers & Schedule</button>
      </div>
    </div>
  );
}

export default Speakers
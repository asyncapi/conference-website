import React, { useState } from 'react';
import Card from '../Cards/card';
import Tower from '../illustrations/tower';
import Stack from "../illustrations/stack";
import CardSlider from '../Cards/slider';
import speakers from './speakersList';
import Link from 'next/link';
import Scard from '../Cards/speakersCard';

function Speakers() {

  const [activeButton, setActiveButton] = useState('Madrid');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className=" min-h-auto md:h-[auto] bg-[#1c1234]">
      <div className="container mx-auto w-full ">
        <div className="pt-[100px] md:pt-[50px]">
          <div className=' flex flex-col'>
            <div className=' flex-col text-center mb-14'>
              <h1 className="text-[84px]  text-white font-[400] tracking-tight md:text-[30px]">
                Speakers
              </h1>
              <h1 className=' text-slate-200'>The AsyncAPI Conf2023 on Tour is planned to take the online event to the next <br/> level by hosting physical events in five different locations across the globe.</h1>
            </div>
            <div className="flex justify-between mt-auto w-[60%] mx-auto">
      <button
        className={`w-[7rem] rounded-sm ${
          activeButton === 'Madrid' ? 'bg-buttonGradient text-white' : 'bg-white bg-opacity-10'
        }`}
        onClick={() => handleButtonClick('Madrid')}
      >
        <p className="p-3 border-2 border-white bg-opacity-10 rounded-sm text-white font-semibold">
          Madrid
        </p>
      </button>
      <button
        className={`w-[7rem] rounded-sm ${
          activeButton === 'London' ? 'bg-buttonGradient text-white' : 'bg-white bg-opacity-10'
        }`}
        onClick={() => handleButtonClick('London')}
      >
        <p className="p-3 border-2 border-white bg-opacity-10 rounded-sm text-white font-semibold">
          London
        </p>
      </button>
      <button
        className={`w-[7rem] rounded-sm ${
          activeButton === 'Bengaluru' ? 'bg-buttonGradient text-white' : 'bg-white bg-opacity-10'
        }`}
        onClick={() => handleButtonClick('Bengaluru')}
      >
        <p className="p-3 border-2 border-white bg-opacity-10 rounded-sm text-white font-semibold">
          Bengaluru
        </p>
      </button>
      <button
        className={`w-[7rem] rounded-sm ${
          activeButton === 'Berlin' ? 'bg-buttonGradient text-white' : 'bg-white bg-opacity-10'
        }`}
        onClick={() => handleButtonClick('Berlin')}
      >
        <p className="p-3 border-2 border-white bg-opacity-10 rounded-sm text-white font-semibold">
          Berlin
        </p>
      </button>
      <button
        className={`w-[7rem] rounded-sm ${
          activeButton === 'Nigeria' ? 'bg-buttonGradient text-white' : 'bg-white bg-opacity-10'
        }`}
        onClick={() => handleButtonClick('Nigeria')}
      >
        <p className="p-3 border-2 border-white bg-opacity-10 rounded-sm text-white font-semibold">
          Nigeria
        </p>
      </button>
    </div>
          </div>
          <div className=" md:mb-[100px] w-full min-h-fit p-10 flex flex-wrap justify-evenly">
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
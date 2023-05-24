import React from 'react';
import Card from '../Cards/card';
import Tower from '../illustrations/tower';
import Stack from "../illustrations/stack";
import CardSlider from '../Cards/slider';
import speakers from './venueList';
import Link from 'next/link';


const Venue = () => {
  return (
    <div className=" bg-venueGradient border-x-coolGray-700 h-[958px] relative overflow-hidden md:h-[auto]">
      <div className="container mx-auto w-full">
        <div className="pt-[100px] md:pt-[50px]">
          <h1 className="text-[84px] text-center text-white font-[400] tracking-tight md:text-[30px]">
            Venue
          </h1>
          <p className="text-[20px] text-center text-white font-[400] tracking-tight md:text-[30px]">
          The AsyncAPI Conf2023 on Tour is planned to take the online event to the next level <br/> by hosting physical events in five different locations across the globe.  
          </p>
          <div className="mt-[46px] md:mb-[100px]">
            <CardSlider>
              {speakers.map((speaker) => (
                <div key={speaker.name} className="">
                  <Card
                    title={speaker.name}
                    alt={speaker.name}
                    summary={`${speaker.title}, ${speaker.company}`}
                    img={speaker.avatar}
                  />
                </div>
              ))}
              <Card className="flex flex-col justify-center items-center">
                <div className="h-[19rem] align-middle">
                  <Link href="/schedule">
                    <h4 className="cursor-pointer underline">
                      View all speakers & schedule
                    </h4>
                  </Link>
                </div>
              </Card>
            </CardSlider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Venue
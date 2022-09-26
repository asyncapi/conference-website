import React from 'react';
import Card from '../Cards/card';
import Tower from '../illustrations/tower';
import Stack from "../illustrations/stack";
import CardSlider from '../Cards/slider';
import speakers from './speakersList';
import Link from 'next/link';

function Speakers() {
  return (
    <div className="speakers-bg h-[958px] relative overflow-hidden md:h-[auto]">
      <div className="container mx-auto w-full">
        <div className="absolute right-0 top-[80px] md:top-[0]">
          <div className="relative h-[25rem]">
            <Tower className="absolute right-[20px] md:w-[130px] md:right-[-40px] md:top-[-50px]" />
          </div>
          <Stack className="mt-[30px] md:w-[200px]" />
        </div>
        <div className="pt-[100px] md:pt-[50px]">
          <h1 className="text-[84px] text-center text-white font-[400] tracking-tight md:text-[30px]">
            Speakers
          </h1>
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
                <div className="h-full">
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

export default Speakers
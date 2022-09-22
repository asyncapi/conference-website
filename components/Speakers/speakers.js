import React from 'react';
import Card from '../Cards/card';
import Tower from '../illustrations/tower';
import Stack from "../illustrations/stack";
import CardSlider from '../Cards/slider';
import speakers from './speakersList';
import Link from 'next/link';

function Speakers() {
  return (
    <div className="speakers-bg h-[958px] relative overflow-hidden">
      <div className="container mx-auto w-full">
        <div className="absolute right-0 top-[80px]">
          <div className="relative h-[25rem]">
            <Tower className="absolute right-[20px]" />
          </div>
          <Stack className="mt-[30px]" />
        </div>
        <div className="pt-[100px]">
          <h1 className="text-[84px] text-center text-white font-[400] tracking-tight">Speakers</h1>
          <div className="mt-[46px]">
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
              <Card>
                <div className="justify-center flex flex-col items-center h-full">
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
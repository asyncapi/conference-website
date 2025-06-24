import React from 'react';
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';
import Button from '../Buttons/button';
import ReactSlider from '../Slider/slider';
import cities from '../../config/city-lists.json';
import Venue from '../Venue/venue';
import Announcement from '../announcement';
import Link from 'next/link';

function Header(): JSX.Element {
  return (
    <div className="relative">
      <div className="container w-full flex items-center justify-center">
        <div className="">
          <div className="flex justify-center w-full mt-32">
            <div className="flex flex-col justify-center items-center w-full">
              <div className="my-10">
                <Announcement />
              </div>
              <div
                className="sm:w-full text-center"
                data-test="landing-heading"
              >
                <Heading
                  className="leading-normal sm:leading-38px tracking-[-3px] sm:tracking-[-0.02em] font-extrabold text-gradient"
                  level="h1"
                  typeStyle="heading-lg"
                >
                  AsyncAPI Conference 2025
                </Heading>
              </div>
              <div className="w-[624px] sm:w-full text-center">
                <Paragraph className="mt-[16px]" textColor="text-gray-200">
                  Join us for the AsyncAPI Conference, bringing the latest in
                  AsyncAPI technology to locations worldwide!
                </Paragraph>
              </div>
              <div className="mt-[54px] relative flex items-center justify-center">
                <Link href="#tickets">
                  <Button type="button" className="w-[250px]">
                    Register Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24">
        <ReactSlider>
          {cities.map((city) => {
            return <Venue key={city.name} city={city} />;
          })}
        </ReactSlider>
      </div>
    </div>
  );
}

export default Header;

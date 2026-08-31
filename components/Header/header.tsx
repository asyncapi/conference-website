import React, { JSX } from 'react';
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';
import Button from '../Buttons/button';
import ReactSlider from '../Slider/slider';
import VenueCard from '../Cards/VenueCard/VenueCard';
import Announcement from '../announcement';
import Link from 'next/link';
import { resolveCfpUrl } from '../../utils/pretalx';
import { cities } from '../../config/conference-data';

function Header(): JSX.Element {
  const hasOpenCfp = cities.some((city) => resolveCfpUrl(city.cfp));

  return (
    <div className="relative">
      <div className="container w-full flex items-center justify-center">
        <div className="">
          <div className="flex justify-center w-full mt-32">
            <div className="flex flex-col justify-center items-center w-full">
              {/* <div className="my-10">
                <Announcement />
              </div> */}
              <div
                className="sm:w-full text-center"
                data-test="landing-heading"
              >
                <Heading
                  className="leading-normal sm:leading-38px tracking-[-3px] sm:tracking-[-0.02em] font-extrabold text-gradient px-2 pb-2"
                  level="h1"
                  typeStyle="heading-lg"
                >
                  AsyncAPI Conference {new Date().getFullYear()}
                </Heading>
              </div>
              <div className="w-full max-w-2xl sm:w-full text-center">
                <Paragraph className="mt-4" textColor="text-gray-200">
                  Join us for the AsyncAPI Conference, bringing the latest in
                  AsyncAPI technology to locations worldwide!
                </Paragraph>
              </div>
              <div className="mt-14 relative flex items-center justify-center gap-4 flex-wrap">
                <Link href="/register/2026">
                  <Button
                    type="button"
                    className="w-64"
                    text="Register Now"
                  />
                </Link>
                {hasOpenCfp && (
                  <Link href="/cfp">
                    <Button
                      type="button"
                      className="w-64"
                      text="Submit a Talk"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24 overflow-hidden">
        <ReactSlider>
          {cities.map((city) => {
            return <VenueCard key={city.name} city={city} />;
          })}
        </ReactSlider>
      </div>
    </div>
  );
}

export default Header;

/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';
import Image from 'next/image';
import Link from 'next/link';
import { EventSponsor } from '../../types/types';

interface ISponsors {
  eventSponsors: EventSponsor[];
  financialSponsor?: EventSponsor[];
}

function Sponsors({ eventSponsors, financialSponsor }: ISponsors) {
  return (
    <div
      className="sponsor-bg container text-center"
      data-test="sponsor-section"
    >
      <div className="py-[80px] flex flex-col items-center">
        <div className="max-w-3xl sm:w-full">
          <Paragraph className="mt-[40px]" textColor="text-white">
            Elevating the future of APIs. Our valued partners and sponsors play
            a pivotal role in bringing our vision to life. With their support,
            we orchestrate an unforgettable celebration.
          </Paragraph>
        </div>
        <Heading
          typeStyle="heading-md"
          className="text-slate-200 mt-10 sm:text-2xl sm:mt-5"
        >
          Event and Host Sponsor
        </Heading>
        <div className="flex justify-center w-[650px] sm:w-full flex-col  items-center">
          {eventSponsors &&
            eventSponsors.map((sponsor) => (
              <div
                key={sponsor.image}
                className={`w-[300px] h-[150px] flex flex-col justify-center items-center`}
              >
                <Link href={sponsor.websiteUrl} target="_blank">
                  <Image
                    src={sponsor.image}
                    alt={sponsor.image}
                    height={230}
                    width={280}
                  />
                </Link>
              </div>
            ))}
        </div>
        <div>
          {financialSponsor && (
            <div>
              <Heading
                typeStyle="heading-md"
                className="text-slate-200 mb-12 sm:text-2xl"
              >
                Financial Sponsor
              </Heading>
              <div className="flex items-center justify-center flex-col">
                {financialSponsor.map((sponsor: EventSponsor) => (
                  <div
                    key={sponsor.image}
                    className="w-[300px] h-[150px] flex justify-center items-center"
                  >
                    <Link href={sponsor.websiteUrl} target="_blank">
                      <Image
                        src={sponsor.image}
                        alt={sponsor.image}
                        height={120}
                        width={260}
                        className="object-contain"
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sponsors;

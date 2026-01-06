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
    <div className="sponsor-bg text-center" data-test="sponsor-section">
      <div className="container mx-auto px-4 py-20 sm:py-12">
        <div className="max-w-4xl mx-auto mb-16 sm:mb-10">
          <Paragraph
            className="text-lg leading-relaxed sm:text-base"
            textColor="text-white"
          >
            Elevating the future of APIs. Our valued partners and sponsors play
            a pivotal role in bringing our vision to life. With their support,
            we orchestrate an unforgettable celebration.
          </Paragraph>
        </div>

        {/* Event and Host Sponsors */}
        <div className="mb-20 sm:mb-12">
          <Heading
            typeStyle="heading-md"
            className="text-white mb-12 sm:text-2xl sm:mb-8"
          >
            Host Sponsor
          </Heading>
          <div className="flex justify-center items-center gap-12 flex-wrap sm:gap-8">
            {eventSponsors &&
              eventSponsors.map((sponsor) => (
                <div
                  key={sponsor.image}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 sm:p-6"
                  style={{ width: '320px', height: '180px' }}
                >
                  <Link
                    href={sponsor.websiteUrl}
                    target="_blank"
                    className="flex items-center justify-center h-full"
                  >
                    <Image
                      src={sponsor.image}
                      alt={sponsor.image}
                      height={230}
                      width={280}
                      className="object-contain"
                    />
                  </Link>
                </div>
              ))}
          </div>
        </div>

        {/* Financial Sponsors */}
        {financialSponsor && financialSponsor.length > 0 && (
          <div>
            <Heading
              typeStyle="heading-md"
              className="text-white mb-12 sm:text-2xl sm:mb-8"
            >
              Financial Sponsor
            </Heading>
            <div className="flex items-center justify-center gap-12 flex-wrap sm:gap-8">
              {financialSponsor.map((sponsor: EventSponsor) => (
                <div
                  key={sponsor.image}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 sm:p-6"
                  style={{ width: '320px', height: '180px' }}
                >
                  <Link
                    href={sponsor.websiteUrl}
                    target="_blank"
                    className="flex items-center justify-center h-full"
                  >
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
  );
}

export default Sponsors;

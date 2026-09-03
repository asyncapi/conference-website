import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '../../components/Buttons/button';
import Heading from '../../components/Typography/heading';
import Paragraph from '../../components/Typography/paragraph';
import { City } from '../../types/types';
import { isCfpDeadlinePassed } from '../../utils/cfp-deadline';
import { isExternalUrl, resolveCfpUrl } from '../../utils/pretalx';
import { cities } from '../../config/conference-data';

type CfpCity = City & {
  cfpDeadlinePassed: boolean;
  cfpUrl: string;
};

export const metadata: Metadata = {
  title: 'Call for Proposals | AsyncAPI Conference',
  description: 'Open calls for proposals for AsyncAPI Conference events.',
};

export default function CfpPage() {
  const openCfps: CfpCity[] = cities.reduce<CfpCity[]>((acc, city) => {
    const cfpUrl = resolveCfpUrl(city.cfp);

    if (cfpUrl) {
      acc.push({
        ...(city as City),
        cfpDeadlinePassed: isCfpDeadlinePassed(city.cfpDate),
        cfpUrl,
      });
    }

    return acc;
  }, []);

  return (
    <main className="container mt-32 mb-24">
      <div className="text-center flex flex-col items-center">
        <Heading typeStyle="heading-lg" className="text-gradient">
          Call for Proposals
        </Heading>
        <div className="max-w-3xl mt-6">
          <Paragraph typeStyle="body-lg" textColor="text-gray-200">
            Choose the conference edition you want to submit to. Some CFPs are
            managed in Pretalx and some partner events may use their own CFP
            systems.
          </Paragraph>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-6">
        {openCfps.map((city) => (
          <div
            key={city.name}
            className="card rounded-md p-6 flex flex-col justify-between min-h-[260px]"
            data-test={`cfp-card-${city.name}`}
          >
            <div>
              <Heading
                level="h2"
                typeStyle="heading-md-semibold"
                className="text-white text-[24px]"
              >
                {city.name === 'Online'
                  ? `${city.name}${city.country}`
                  : `${city.name}, ${city.country}`}
              </Heading>
              <Paragraph className="mt-4" textColor="text-gray-200">
                {city.date}
              </Paragraph>
              <Paragraph className="mt-3" textColor="text-gray-400">
                CFP deadline: {city.cfpDate}
              </Paragraph>
            </div>
            {city.cfpDeadlinePassed ? (
              <Button
                type="button"
                disabled
                className="w-full mt-8 opacity-60 text-sm"
                text="CFP deadline has passed"
              />
            ) : (
              <Link
                className="mt-8"
                href={city.cfpUrl}
                target={isExternalUrl(city.cfpUrl) ? '_blank' : undefined}
                rel={isExternalUrl(city.cfpUrl) ? 'noreferrer' : undefined}
              >
                <Button
                  type="button"
                  className="w-full"
                  text="Submit a Proposal"
                />
              </Link>
            )}
          </div>
        ))}
      </div>

      {openCfps.length === 0 && (
        <div className="mt-16 text-center">
          <Heading typeStyle="heading-md-semibold" className="text-white">
            No CFPs are open right now.
          </Heading>
        </div>
      )}
    </main>
  );
}

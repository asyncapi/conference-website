import type { Metadata } from 'next';
import { JSX } from 'react';
import Paper from '../../../../components/Form/paper';
import Sponsors from '../../../../components/Sponsors/sponsors';

export const metadata: Metadata = {
  title: 'Apply to Speak',
  description:
    'Submit your talk proposal for the AsyncAPI Conference Online edition. Share your expertise on event-driven architectures, AsyncAPI tooling, and more.',
};

export default function SpeakersForm(): JSX.Element {
  return (
    <div>
      <div className="container">
        <Paper />
      </div>
      <div>
        <Sponsors
          eventSponsors={[
            {
              image: '/img/logos/asyncapi-logo--white.png',
              websiteUrl: 'https://www.asyncapi.com',
            },
          ]}
        />
      </div>
    </div>
  );
}

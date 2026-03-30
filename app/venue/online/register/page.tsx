import type { Metadata } from 'next';
import Paper from '../../../../components/Form/paper';
import Sponsors from '../../../../components/Sponsors/sponsors';

export const metadata: Metadata = {
  title: 'Speaker Registration | AsyncAPI Conference',
};

export default function SpeakersForm() {
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

import type { Metadata } from 'next';
import MeetupsPage from './meetups-page';

export const metadata: Metadata = {
  title: 'Meetups | AsyncAPI Conference',
  description:
    'Connect with the AsyncAPI community through local and virtual meetups.',
};

export default function Page() {
  return <MeetupsPage />;
}

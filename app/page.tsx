import type { Metadata } from 'next';
import HomePage from './home-page';

export const metadata: Metadata = {
  title: 'AsyncAPI Conference',
  description: 'AsyncAPI Conference - The conference for the AsyncAPI community',
};

export default function Page() {
  return <HomePage />;
}

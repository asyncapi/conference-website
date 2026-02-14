import type { Metadata } from 'next';
import React, { JSX } from 'react';
import PastEditonCard from '../../components/PastEditionCard';
import pastEditionsArchiveLinks from '../../config/editions.json';

export const metadata: Metadata = {
  title: 'Past Editions',
  description:
    'Browse past editions of the AsyncAPI Conference — watch recordings, view archives, and explore the history of the event.',
};

const PastEditions = (): JSX.Element => {
  return (
    <div>
      <div className="my-[70px]">
        <h1 className="text-5xl sm:text-4xl sm:w-full text-white my-4 text-center w-1/2 mx-auto font-bold">
          Past Editions of
        </h1>
        <h1 className="text-5xl sm:text-4xl px-10 py-4 rounded-full bg-violet-700 text-white my-4 text-center w-fit mx-auto font-bold">
          AsyncAPI Conf
        </h1>
      </div>

      <div className="w-3/4 sm:w-10/12 my-10 mx-auto grid grid-cols-2 lg:grid-cols-1 gap-[60px]">
        {pastEditionsArchiveLinks.map((item: string, index) => {
          return <PastEditonCard key={index} url={item} />;
        })}
      </div>
    </div>
  );
};

export default PastEditions;

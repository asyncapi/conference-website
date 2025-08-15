import React, { JSX } from 'react';
import Link from 'next/link';

function Announcement(): JSX.Element {
  return (
    <Link href="/venue/Paris">
      <div className="cursor-pointer border text-white min-w-[300px] rounded-lg p-1 text-center text-lg transition duration-300 ease-in-out  hover:bg-white hover:text-black hover:scale-105 hover:shadow-lg">
        Call for Speakers Paris!
      </div>
    </Link>
  );
}

export default Announcement;
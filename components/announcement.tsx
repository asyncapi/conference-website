import React from 'react';
import Link from 'next/link';

function Announcement(): JSX.Element {
  return (
    <Link href="/venue/Bangalore">
      <div className="cursor-pointer border text-white min-w-[300px] rounded-lg p-1 text-center text-lg">
        Call for Speakers Bangalore!
      </div>
    </Link>
  );
}

export default Announcement;

import React from 'react';
import Link from 'next/link';

function Announcement(): JSX.Element {
  return (
    <Link href="/venue/London">
      <div className="cursor-pointer border text-white min-w-[300px] rounded-lg p-1 text-center text-lg">
        Call for Speakers London!
      </div>
    </Link>
  );
}

export default Announcement;

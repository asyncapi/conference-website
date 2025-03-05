import React from 'react';
import Link from 'next/link';

const Announcement: React.FC = () => {
  return (
    <Link href="/venue/Munich" passHref>
      <div className="cursor-pointer border text-white min-w-[300px] rounded-lg p-1 text-center text-lg">
        Call for Speakers Munich!
      </div>
    </Link>
  );
};

export default Announcement;

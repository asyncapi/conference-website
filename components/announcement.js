import React from 'react';
import Link from 'next/link';

export default function Announcement() {
  return (
    <Link href="/venue/Paris">
      <div className="cursor-pointer border text-white min-w-[300px] rounded-lg p-1 text-center text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:backdrop-blur-xl bg-transparent hover:bg-[linear-gradient(225deg,_#2DCCFD_9.35%,_#AD20E2_88.41%)]">
        Join the AsyncAPI Conf in Paris!
      </div>
    </Link>
  )
}

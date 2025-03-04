import React from 'react';
import Link from 'next/link';

export default function Announcement() {
  return (
    <Link href="/venue/Munich">
    <div className='cursor-pointer border text-white min-w-[300px] rounded-lg p-1 text-center text-lg'>Call for Speakers Munich!</div>
    </Link>
  )
}

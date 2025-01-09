import React from 'react';
import Link from 'next/link';

export default function Announcement() {
  return (
    <Link href="/venue/Paris">
    <div className='cursor-pointer border text-white min-w-[300px] rounded-lg p-1 text-center text-lg transition-all duration-350 transform hover:scale-105 hover:shadow-lg hover:bg-white hover:text-black'>Join the AsyncAPI Conf in Paris!</div>
    </Link>
  )
}

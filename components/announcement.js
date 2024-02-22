import React from 'react';
import Link from 'next/link';

export default function Announcement() {
  return (
    <Link href="https://www.asyncapi.com/docs/reference/specification/v3.0.0" passHref={true}>
    <a rel="noopener noreferrer" target="_blank" >
    <div className='border text-white w-[300px] rounded-lg p-1 text-center text-lg'>Call for speaker Helsinki is open!</div>
    </a>
    </Link>
  )
}

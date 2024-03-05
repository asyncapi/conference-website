import React from 'react';
import Link from 'next/link';

export default function Announcement() {
  return (
    <Link href="https://apidays.typeform.com/to/ILJeAaV8?typeform-source=www.apidays.global#event_name=xxxxx" passHref={true}>
    <a rel="noopener noreferrer" target="_blank" >
    <div className='border text-white min-w-[300px] rounded-lg p-1 text-center text-lg'>Call for Speakers Helsinki is now open!</div>
    </a>
    </Link>
  )
}

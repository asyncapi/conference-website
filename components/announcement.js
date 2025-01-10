import React from 'react';
import Link from 'next/link';

export default function Announcement() {
  return (
    <Link href="/venue/Paris">
      <div className="announcement">
        <span>Join the AsyncAPI Conf in Paris!</span>
      </div>
    </Link>
  );
}
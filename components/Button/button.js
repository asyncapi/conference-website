import Link from 'next/link'
import React from 'react'

function Button({text, className, link}) {
  return (
    <Link href={link ? link : "/"}>
      <button
        className={`btn border border-dark-600 font-[300] p-1 rounded bg-dark-600 ${className} md:py-[10px] md:text-[14px]`}
      >
        {text}
      </button>
    </Link>
  );
}

export default Button
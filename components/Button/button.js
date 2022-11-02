import Link from 'next/link'
import React from 'react'

function Button({ text, className, link = '', ...rest }) {
  if (link.startsWith('http')) {
    return (
      <Link href={link} {...rest}>
        <a
          href={link}
          {...rest}
          className={`inline-block font-secondary text-dark-300 border border-dark-600 font-[300] p-1 rounded bg-default-btn/10 hover:bg-default-btn/30 hover:text-white transition ease-in-out duration-150 ${className} md:py-[10px] md:text-[14px]`}
        >
          {text}
        </a>
      </Link>
    );
  }

  return (
    <Link href={link ? link : "/"} {...rest}>
      <button
        className={`font-secondary text-dark-300 border border-dark-600 font-[300] p-1 rounded bg-default-btn/10 hover:bg-default-btn/30 hover:text-white transition ease-in-out duration-150 ${className} md:py-[10px] md:text-[14px]`}
      >
        {text}
      </button>
    </Link>
  );
}

export default Button
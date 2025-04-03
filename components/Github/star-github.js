'use client';

import React from 'react';

function GithubButton({
  text = 'Star on GitHub',
  href = 'https://github.com/asyncapi/conference-website',
  className = '',
  inNav = false,
}) {
  const handleClick = () => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-1 bg-white/20 hover:bg-white/40 
      text-white px-1 py-2 rounded-md shadow-md font-medium whitespace-nowrap
      transition-all duration-300 ${inNav ? 'h-10' : 'h-12'} ${className}`}
    >
      <img 
        src="/img/github-logo.png" 
        alt="GitHub" 
        className="w-6 h-6" 
      />
      <span className="inline-block">{text}</span>
    </button>
  );
}

export default GithubButton;

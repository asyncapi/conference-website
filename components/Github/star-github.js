'use client';

import React from 'react';

function GithubButton({
  text = 'Star',
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
      className={`group relative flex items-center gap-2 px-4 py-2 
        rounded-xl border border-white/40
        transition-all duration-300 ease-in-out 
        hover:scale-105 hover:shadow-white/30 hover:shadow-lg
        text-white font-medium 
        ${inNav ? 'h-10' : 'h-10'} ${className}`}
    >
      <div className="relative w-5 h-5">
        <img 
          src="./img/star.png" 
          alt="Star"
          className="w-full h-full transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
        />
        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 animate-ping bg-white/30"></span>
      </div>
      <span className="text-l tracking-wide">{text}</span>
    </button>
  );
}

export default GithubButton;

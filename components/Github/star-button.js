'use client';

import React from 'react';
import { FaGithub } from 'react-icons/fa';

function GithubButton({ text = 'Star on GitHub', href = 'https://github.com/asyncapi/conference-website', className = '', inNav = false }) {
  const handleClick = () => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 bg-gray-900 hover:bg-gray-700 
      text-white px-3 py-2 rounded-md shadow-md font-medium whitespace-nowrap
      transition-all duration-300 ${inNav ? 'h-10' : 'h-12'} ${className}`}
    >
      <FaGithub className="text-lg" />
      <span className="inline-block">{text}</span>
    </button>
  );
}

export default GithubButton;
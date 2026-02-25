import React, { JSX } from 'react';
import { SVGTypes } from '../../types/types';

/**
 *
 *
 * @param {Object} props
 * @param {string} [props.className]
 * @param {string} [props.fill]
 * @returns {JSX.Element}
 */

function Download({ className, fill }: SVGTypes): JSX.Element {
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={fill || "currentColor"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 17V3"/>
      <path d="m6 11 6 6 6-6"/>
      <path d="M19 21H5"/>
    </svg>
  )
}

export default Download
import React, { JSX } from 'react';
import { SVGTypes } from '../../../types/types';

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {string} [props.fill]
 * @returns {JSX.Element}
 */

function Youtube({ className, fill }: Readonly<SVGTypes>): JSX.Element {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.498 6.186a2.92 2.92 0 00-2.056-2.071C19.611 3.656 12 3.656 12 3.656s-7.611 0-9.442.459A2.92 2.92 0 00.502 6.186C.043 8.036.043 12 .043 12s0 3.964.459 5.814a2.92 2.92 0 002.056 2.071C4.389 20.344 12 20.344 12 20.344s7.611 0 9.442-.459a2.92 2.92 0 002.056-2.071C23.957 15.964 23.957 12 23.957 12s0-3.964-.459-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
        fill={fill || 'white'}
      />
    </svg>
  );
}

export default Youtube;

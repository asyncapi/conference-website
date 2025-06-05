import React from 'react';
import { SVGTypes } from '../../types/types';

interface IArrows extends SVGTypes {
  direction: string;
}

/**
 *
 *
 * @param {IArrows} param0
 * @param {string} param0.className
 * @param {string} [param0.direction='right']
 * @param {string} [param0.fill='currentColor']
 * @returns {JSX.Element}
 */

function Arrows({
  className,
  direction = 'right',
  fill = 'currentColor',
}: IArrows) {
  const getRotation = () => {
    switch (direction) {
      case 'right':
        return 'rotate(0deg)';
      case 'left':
        return 'rotate(180deg)';
      case 'up':
        return 'rotate(-90deg)';
      case 'down':
        return 'rotate(90deg)';
      default:
        return 'rotate(0deg)';
    }
  };

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: getRotation(), transformOrigin: 'center' }}
    >
      <path
        d="M9 6L15 12L9 18"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default Arrows;

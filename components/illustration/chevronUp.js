import React from "react";

function ChevronUp({ className, color }) {
  return (
    <svg
      width="20"
      height="20"
      className={className}
      viewBox="0 0 330 330"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75 
           c-3.979,0-7.794,1.581-10.607,4.394l-149.996,150 
           c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0 
           l139.39-139.393l139.397,139.393 
           C307.322,253.536,311.161,255,315,255 
           c3.839,0,7.678-1.464,10.607-4.394 
           C331.464,244.748,331.464,235.251,325.606,229.393z"
        fill={color}
      />
    </svg>
  );
}

export default ChevronUp;
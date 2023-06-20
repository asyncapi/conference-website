import React from 'react'

function Plus({className}) {
    return (
        <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className={className}>
            <rect fill="none" height="256" width="256" />
            <line fill="none" stroke="#ffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" x1="40" x2="216" y1="128" y2="128" />
            <line fill="none" stroke="#ffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" x1="128" x2="128" y1="40" y2="216" />
        </svg>
  )
}

export default Plus
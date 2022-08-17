import React from 'react'

function Button({text, type, className}) {
  return (
    <button className={`border border-dark-600 p-1 rounded bg-dark-600 ${className}`}>{text}</button>
  )
}

export default Button
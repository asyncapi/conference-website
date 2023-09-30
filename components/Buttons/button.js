import React from 'react'

function Button({className, children, overlay, onClick, type, disabled}) {
  return (
	  <button
		  disabled={disabled}
		  type={type}
		  onClick={onClick}
			className={`${overlay ? '' : 'gradient-bg'} text-white h-[56px] rounded-md p-[8px] ${className}`}
      >{children}</button>
	);
}

export default Button
import React from 'react'

function Button({className, children, overlay, onClick, type, disabled,test}) {
  return (
	  <button
		  disabled={disabled}
		  data-test={test || ""}
		  type={type}
		  onClick={onClick}
			className={`${overlay ? '' : 'gradient-bg'} ${disabled && 'cursor-not-allowed'} flex items-center justify-center text-white h-[54px] rounded-md p-[8px] ${className}`}
      >{children}</button>
	);
}

export default Button
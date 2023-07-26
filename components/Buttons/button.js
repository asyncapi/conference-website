import React from 'react'

function Button({className, children, overlay}) {
  return (
		<button
			className={`${overlay ? '' : 'gradient-bg'} text-white h-[54px] rounded-md p-[8px] ${className}`}
      >{children}</button>
	);
}

export default Button
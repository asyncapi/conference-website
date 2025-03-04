import React from 'react'

interface ButtonProps {
	className?: string;
	children: React.ReactNode;
	overlay?: boolean;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	test?: string;  
}
const Button: React.FC<ButtonProps> = ({
	className,
	children,
	overlay,
	onClick,
	type,
	disabled,
	test
})=>{
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
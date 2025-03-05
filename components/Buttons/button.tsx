import React from 'react';

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  overlay?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  test?: string;
};

const Button: React.FC<ButtonProps> = ({
  className = '',
  children,
  overlay = false,
  onClick,
  type = 'button',
  disabled = false,
  test = '',
}) => {
  return (
    <button
      disabled={disabled}
      data-test={test}
      type={type}
      onClick={onClick}
      className={`${overlay ? '' : 'gradient-bg'} ${
        disabled ? 'cursor-not-allowed' : ''
      } flex items-center justify-center text-white h-[54px] rounded-md p-[8px] ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

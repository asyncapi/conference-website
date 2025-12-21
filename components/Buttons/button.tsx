import React from 'react';

type ButtonType = 'button' | 'submit' | 'reset' | undefined;
type IconPosition = 'left' | 'right';

interface IButton {
  className?: string;
  children?: React.ReactNode;
  text?: string | React.ReactNode;
  outline?: boolean;
  onClick?: React.MouseEventHandler;
  type: ButtonType;
  disabled?: boolean;
  test?: string;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
}

function Button({
  className,
  children,
  text,
  outline,
  onClick,
  type,
  disabled,
  test,
  icon,
  iconPosition = 'right',
}: IButton): React.JSX.Element {
  const content = text || children;

  return (
    <button
      disabled={disabled}
      {...(test && { 'data-test': test })}
      type={type}
      onClick={onClick}
      className={`${!outline && 'gradient-bg'} ${disabled && 'cursor-not-allowed'} flex items-center justify-center text-white  h-14 rounded-md p-2 ${iconPosition === 'left' ? 'justify-start' : 'justify-end'} ${className}`}
    >
      {icon && iconPosition === 'left' && (
        <span className="inline-block">
          {icon}
        </span>
      )}
      <span className="inline-block">{content}</span>
      {icon && iconPosition === 'right' && (
        <span className="inline-block">
          {icon}
        </span>
      )}
    </button>
  );
}

export default Button;

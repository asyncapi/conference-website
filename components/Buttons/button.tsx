import React from 'react';

type ButtonType = 'button' | 'submit' | 'reset' | undefined;
type IconPosition = 'left' | 'right' | 'center';

interface IButton {
  className?: string;
  children?: React.ReactNode;
  text?: string;
  overlay?: boolean;
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
  overlay,
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
      className={`${overlay ? '' : 'gradient-bg'} ${disabled && 'cursor-not-allowed'} flex items-center justify-center text-white h-[54px] rounded-md p-[8px] ${iconPosition === 'center' ? 'justify-center' : iconPosition === 'left' ? 'justify-start' : 'justify-end'} ${className}`}
    >
      {icon && iconPosition === 'center' && (
        <span className="inline-block">
          {icon}
        </span>
      )}
      {icon && iconPosition === 'left' && (
        <span className="mr-2 inline-block">
          {icon}
        </span>
      )}
      <span className="inline-block">{content}</span>
      {icon && iconPosition === 'right' && (
        <span className="ml-2 inline-block">
          {icon}
        </span>
      )}
    </button>
  );
}

export default Button;

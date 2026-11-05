import React from 'react';

type ButtonType = 'button' | 'submit' | 'reset' | undefined;
type IconPosition = 'left' | 'right';
type ButtonVariant = 'default' | 'icon';

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
  variant?: ButtonVariant;
  ariaLabel?: string;
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
  variant = 'default',
  ariaLabel,
}: IButton): React.JSX.Element {
  const content = text || children;
  const isIcon = variant === 'icon';

  const variantClasses = isIcon
    ? ''
    : `${!outline ? 'gradient-bg' : ''} h-14 rounded-md p-2 ${iconPosition === 'left' ? 'justify-start' : 'justify-end'}`;

  return (
    <button
      disabled={disabled}
      {...(test && { 'data-test': test })}
      {...(ariaLabel && { 'aria-label': ariaLabel })}
      type={type}
      onClick={onClick}
      className={`${variantClasses} ${disabled ? 'cursor-not-allowed' : ''} flex items-center justify-center text-white ${className ?? ''}`}
    >
      {isIcon ? (
        content
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="inline-block">{icon}</span>
          )}
          <span className="inline-block">{content}</span>
          {icon && iconPosition === 'right' && (
            <span className="inline-block">{icon}</span>
          )}
        </>
      )}
    </button>
  );
}

export default Button;

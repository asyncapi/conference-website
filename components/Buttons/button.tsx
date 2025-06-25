type ButtonType = 'button' | 'submit' | 'reset' | undefined;

interface IButton {
  className?: string;
  children: React.ReactNode;
  overlay?: boolean;
  onClick?: React.MouseEventHandler;
  type: ButtonType;
  disabled?: boolean;
  test?: string;
}

function Button({
  className,
  children,
  overlay,
  onClick,
  type,
  disabled,
  test,
}: IButton): JSX.Element {
  return (
    <button
      disabled={disabled}
      data-test={test || ''}
      type={type}
      onClick={onClick}
      className={`${overlay ? '' : 'gradient-bg'} ${disabled && 'cursor-not-allowed'} flex items-center justify-center text-white h-[54px] rounded-md p-[8px] ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TypeStyle =
  | 'heading-lg'
  | 'heading-md'
  | 'heading-md-semibold'
  | 'heading-sm'
  | 'heading-sm-semibold'
  | 'heading-xs'
  | 'heading-xs-semibold'
  | 'body-lg'
  | 'body-md'
  | 'body-sm';

interface IHeading {
  typeStyle?: TypeStyle;
  level?: HeadingLevel;
  textColor?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Heading({
  typeStyle = 'heading-lg',
  level = 'h2',
  textColor = 'text-primary-800',
  className,
  children,
}: IHeading): JSX.Element {
  let classNames = '';
  const Tag = level as keyof JSX.IntrinsicElements;
  switch (typeStyle) {
    case 'heading-lg':
      classNames = `font-heading text-heading-md font-bold text-[60px] tracking-heading sm:text-[30px] lg:text-[40px] ${
        className || ''
      }`;
      break;
    case 'heading-md':
      classNames = `font-heading text-heading-md font-bold text-[40px] tracking-heading ${
        className || ''
      }`;
      break;
    case 'heading-md-semibold':
      classNames = `font-heading text-heading-md font-semibold tracking-heading ${
        className || ''
      }`;
      break;
    case 'heading-sm':
      classNames = `font-heading text-heading-sm font-bold tracking-heading ${
        className || ''
      }`;
      break;
    case 'heading-sm-semibold':
      classNames = `font-heading text-heading-sm font-semibold tracking-heading ${
        className || ''
      }`;
      break;
    case 'heading-xs':
      classNames = `font-heading text-heading-xs font-bold tracking-heading ${
        className || ''
      }`;
      break;
    case 'heading-xs-semibold':
      classNames = `font-heading text-heading-xs font-semibold tracking-heading ${
        className || ''
      }`;
      break;
    case 'body-lg':
      classNames = `font-heading text-body-lg tracking-body font-regular ${
        className || ''
      }`;
      break;
    case 'body-md':
      classNames = `font-heading text-body-md tracking-body font-regular ${
        className || ''
      }`;
      break;
    case 'body-sm':
      classNames = `font-heading text-body-lg tracking-body font-regular ${
        className || ''
      }`;
      break;
    default:
      classNames = `font-heading text-heading-md font-bold tracking-heading md:text-heading-xl ${
        className || ''
      }`;
  }

  return <Tag className={`${textColor} ${classNames}`}>{children}</Tag>;
}

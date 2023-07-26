export default function Paragraph({
	typeStyle = 'body-lg',
	textColor = 'text-gray',
	fontWeight,
	className,
	children,
}) {
	let classNames = '';
	switch (typeStyle) {
		case 'body-lg':
			classNames = `text-[20px] ${fontWeight} ${className || ''}`;
			break;
		case 'body-md':
			classNames = `text-md ${fontWeight} ${className || ''}`;
			break;
		case 'body-sm':
			classNames = `text-sm ${fontWeight} ${className || ''}`;
			break;
		default:
			classNames = `text-lg font-regular ${className || ''}`;
	}

	return <p className={`${textColor} ${classNames}`}>{children}</p>;
}

import React from 'react';

interface ParagraphProps {
	typeStyle?: string;
	textColor?: string;
	fontWeight?: string;
	className?: string;
	children: React.ReactNode;
}

const Paragraph: React.FC<ParagraphProps> = ({
	typeStyle = 'body-lg',
	textColor = 'text-gray-400',
	fontWeight,
	className,
	children
})=>{
	let classNames = '';
	switch (typeStyle) {
		case 'body-lg':
			classNames = `text-[20px] sm:text-[16px] ${fontWeight} ${className || ''}`;
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

export default Paragraph;

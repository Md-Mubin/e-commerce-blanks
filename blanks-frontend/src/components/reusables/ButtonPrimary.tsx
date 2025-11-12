import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonPrimaryProps {
	children?: React.ReactNode;
	href?: string;
	icon?: React.ReactNode;
	iconPosition?: 'left' | 'right';
	className?: string;
	iconClassName?: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	isLoading?: boolean;
	linkBtnClasses?: string;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
	children,
	href,
	icon,
	iconPosition = 'left',
	className = '',
	linkBtnClasses = '',
	iconClassName = '',
	type = 'submit',
	isLoading,
	onClick,
}) => {
	const buttonContent = (
		<>
			{icon && iconPosition === 'left' && <span className={iconClassName}>{icon}</span>}
			{children && <span className='uppercase text-[14px]'>{children}</span>}
			{icon && iconPosition === 'right' && <span className={iconClassName}>{icon}</span>}
		</>
	);

	// const buttonClasses = `flex items-center gap-3 px-4 py-2 border border-button bg-primaryBg text-button hover:text-primaryBg hover:bg-button transition ${className}`;

	// If href is provided, render as Link with anchor tag
	if (href) {
		return (
			<Link
				href={href}
				className={cn(
					`bg-transparent border border-secondaryBorder text-black hover:bg-black hover:text-white px-4 py-2 text-center duration-100 ${linkBtnClasses}`
				)}>
				{buttonContent}
			</Link>
		);
	}

	// Otherwise, render as button
	return (
		<button
			type={type}
			disabled={isLoading}
			onClick={onClick}
			className={cn(
				`w-[160px] flex items-center justify-center gap-2 px-4 h-[44px] bg-black text-primaryColor hover:bg-red400 hover:text-white shadow-sm duration-300 transition  cursor-pointer ${className}`
			)}>
			{isLoading ? (
				<span className='inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
			) : (
				buttonContent
			)}
		</button>
	);
};

export default ButtonPrimary;

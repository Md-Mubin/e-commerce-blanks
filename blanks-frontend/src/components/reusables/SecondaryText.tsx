import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
	children: React.ReactNode;
	className?: string;
};

const SecondaryText = ({ children, className }: Props) => {
	return (
		<p
			className={cn(
				`font-primary text-[14px] text-secondaryColor font-normal ${className}`
			)}
		>
			{children}
		</p>
	);
};

export default SecondaryText;

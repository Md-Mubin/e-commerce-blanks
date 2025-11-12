import { cn } from '@/lib/utils';
import React from 'react';

const SectionTitleText = ({ children, className }: any) => {
	return (
		<p
			className={cn(
				`font-primary text-[20px] text-primaryColor font-bold ${className}`
			)}
		>
			{children}
		</p>
	);
};

export default SectionTitleText;

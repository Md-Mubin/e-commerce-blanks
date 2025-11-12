import { cn } from '@/lib/utils';
import React from 'react';

const TextBase = ({ children, className }: any) => {
	return (
		<p
			className={cn(
				`font-primary text-base text-secondaryColor font-bold ${className}`
			)}
		>
			{children}
		</p>
	);
};

export default TextBase;

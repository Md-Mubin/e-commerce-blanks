import React from 'react';

const PrimaryText = ({ children, className }: any) => {
	return (
		<p
			className={`font-primary text-sm text-primaryColor font-bold ${className}`}
		>
			{children}
		</p>
	);
};

export default PrimaryText;

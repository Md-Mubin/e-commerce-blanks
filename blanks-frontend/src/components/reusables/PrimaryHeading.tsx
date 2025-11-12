import React from 'react';

const PrimaryHeading = ({ className, children }: any) => {
	// text shadow : 0 0 0.625rem rgba(0, 0, 0, 0.45);
	return (
		<h1
			className={`text-primaryColor text-[20px] sm:text-[24px] lg:text-[32px] font-semibold ${className}`}
		>
			{children}
		</h1>
	);
};

export default PrimaryHeading;

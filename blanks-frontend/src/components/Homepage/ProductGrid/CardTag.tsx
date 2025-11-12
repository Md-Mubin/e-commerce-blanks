import React from 'react';

const CardTag = ({ children, className }: any) => {
	return (
		<div className={`bg-button self-start ${className}`}>
			<p className='text-white font-semibold text-[12px] px-[10px] py-[2px]'>
				{children}
			</p>
		</div>
	);
};

export default CardTag;

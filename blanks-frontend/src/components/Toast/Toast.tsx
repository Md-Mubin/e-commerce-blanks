import React from 'react';

const Toast = ({ message }: any) => {
	return (
		<div className='w-[180px] py-2 px-4 bg-white fixed top-4 right-2 z-[999] text-center'>
			{message}
		</div>
	);
};

export default Toast;

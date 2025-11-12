'use client';
import { useState } from 'react';

export default function AnimatedMenuIcon({
	showMobileMenu,
	setShowMobileMenu,
}: any) {
	return (
		<button
			onClick={() => setShowMobileMenu(!showMobileMenu)}
			className='relative w-[20px] h-[20px] flex justify-center cursor-pointer'
		>
			{/* Line 1 */}
			<span
				className={`absolute block h-[2px] w-full bg-black-original rounded transition-all duration-300 ease-in-out
          ${
						showMobileMenu
							? 'top-[18px] w-0 left-1/2 opacity-0'
							: 'top-0 left-0 w-full opacity-100'
					}
        `}
			></span>

			{/* Line 2 */}
			<span
				className={`absolute block h-[2px] w-[20px] bg-black-original rounded transition-all duration-300 ease-in-out
          ${showMobileMenu ? 'rotate-45' : ''} top-[8px]
        `}
			></span>

			{/* Line 3 */}
			<span
				className={`absolute block h-[2px] w-[20px] bg-black-original rounded transition-all duration-300 ease-in-out
          ${showMobileMenu ? '-rotate-45' : ''} top-[8px]
        `}
			></span>

			{/* Line 4 */}
			<span
				className={`absolute block h-[2px] w-full bg-black-original rounded transition-all duration-300 ease-in-out
          ${
						showMobileMenu
							? 'top-[18px] w-0 left-1/2 opacity-0'
							: 'top-[17px] left-0 w-full opacity-100'
					}
        `}
			></span>
		</button>
	);
}

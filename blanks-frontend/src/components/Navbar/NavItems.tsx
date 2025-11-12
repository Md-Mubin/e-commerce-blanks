'use client';
import { useState } from 'react';
import Link from 'next/link';
import { DropdownMenu } from './index';
import { PrimaryText } from '../reusables';

const NavItem = ({ item }: { item: any }) => {
	const [open, setOpen] = useState(false);

	const handleKeyDown = (e: any) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			setOpen(!open);
		}
	};

	const handleClick = (e: React.MouseEvent) => {
		if (item?.submenu) {
			e.preventDefault();
			setOpen(!open);
		}
	};

	return (
		<div
			className='relative' // Add padding-bottom to extend hover area
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			<Link
				href={item.href}
				className='text-sm font-semibold text-secondaryColor hover:text-hoverColor flex items-center'
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				role={item.submenu ? 'button' : 'link'}
				aria-expanded={item.submenu ? open : undefined}
				aria-haspopup={item.submenu ? true : undefined}
			>
				{item.label}
				{item.submenu && <PrimaryText className='ml-1'>▼</PrimaryText>}
			</Link>
			{/* div className='absolute left-0 mt-2 w-60 bg-white shadow-2xl z-50 border-secondaryColor' */}
			{open && item.submenu && (
				<div
					className='absolute w-60 top-[22px] left-0 z-10 bg-white shadow-lg rounded-md'
					// Optional: Add a transparent bridge to cover any gap
				>
					<DropdownMenu items={item.submenu} />
				</div>
			)}
		</div>
	);
};

export default NavItem;

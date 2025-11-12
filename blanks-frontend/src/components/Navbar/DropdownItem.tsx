'use client';
import { useState } from 'react';
import Link from 'next/link';

const DropdownItem = ({ item }: { item: any }) => {
	const [submenuOpen, setSubmenuOpen] = useState(false);

	return (
		<div
			className='relative group'
			onMouseEnter={() => setSubmenuOpen(true)}
			onMouseLeave={() => setSubmenuOpen(false)}
		>
			<Link
				href={item.href}
				className='px-4 py-2 text-sm text-secondaryColor hover:text-hoverColor hover:bg-gray-100 flex justify-between items-center'
			>
				{item.label}
				{item.submenu && <span className='ml-2'>▶</span>}
			</Link>

			{item.submenu && submenuOpen && (
				<div className='absolute left-full top-0 mt-0 w-60 bg-white shadow-lg z-50'>
					{item.submenu.map((subItem: any, i: number) => (
						<Link
							key={i}
							href={subItem.href}
							className='block px-4 py-2 text-sm text-gray-700 hover:text-hoverColor hover:bg-gray-100'
						>
							{subItem.label}
						</Link>
					))}
				</div>
			)}
		</div>
	);
};

export default DropdownItem;

'use client';
import { navData } from '@/lib/navData';
import React from 'react';
import { NavItem } from './index';
import { usePathname } from 'next/navigation';
const NavLists = () => {
	const pathname = usePathname();
	// /category/100-percent-cotton
	const shouldBeHidden = pathname.includes('category');
	return (
		<nav
			className={`${shouldBeHidden ? 'hidden' : 'space-x-6 hidden md:flex'}`}
		>
			{navData?.map((item: any, index: number) => (
				<NavItem key={index} item={item} />
			))}
		</nav>
	);
};

export default NavLists;

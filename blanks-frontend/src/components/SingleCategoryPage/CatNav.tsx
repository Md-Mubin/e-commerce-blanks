import React from 'react';
import { Sidebar } from '../Sidebar';
import { PrimaryText } from '../reusables';
import { Menu } from 'lucide-react';
import { categoriesData } from '@/lib/menuData';
import { navData } from '@/lib/navData';
import { NavItem } from '../Navbar';

const CatNav = () => {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-[250px_minmax(375px,_1fr)] items-center gap-12 mb-4 lg:mb-4'>
			{/* second one */}
			<div className='hidden lg:block'>
				<Sidebar hoverable={true}>
					<Sidebar.MenuHeading>
						<PrimaryText className='text-white uppercase'>Category</PrimaryText>
						{/* icon */}
						<Menu className='text-white' />
					</Sidebar.MenuHeading>
					<Sidebar.MenuItems data={categoriesData} pagetype='category' />
				</Sidebar>
			</div>

			<div className=''>
				<nav className={`space-x-6 hidden md:flex`}>
					{navData?.map((item: any, index: number) => (
						<NavItem key={index} item={item} />
					))}
				</nav>
			</div>
		</div>
	);
};

export default CatNav;

'use client';
import React, { useState } from 'react';
import { Sidebar } from '../Sidebar';
import { Flex, PrimaryText, SectionTitleText } from '../reusables';
import { Menu } from 'lucide-react';
import { categoriesData } from '@/lib/menuData';

import SecondaryText from '../reusables/SecondaryText';

import { SecondaryInputField } from '../Signup';
import { Layout } from '../Layout';
import Container from '../reusables/Container';
import { navData } from '@/lib/navData';
import { NavItem } from '../Navbar';
import {
	FilterMobile,
	ProductFilterBar,
	ProductList,
	ProductPagination,
	SidebarDesktop,
} from '../../components/index';
const sorBy = [
	{ label: 'Price: Ascending', value: 'ascending' },
	{ label: 'Price: Descending', value: 'descending' },
	{ label: 'A-Z', value: 'title' }, // adjust title based on api
	{ label: 'Z-A', value: '-title' }, // adjust title based on api
];

const BrandsPage = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [showSortFilter, setShowSortFilter] = useState(false);
	const [filterValue, setFilterValue] = useState('');
	const [sortValue, setSortValue] = useState('');

	const handleSerach = (e: any) => {
		// Handle search logic here
		setFilterValue(e.target.value);
	};
	const handleSortBy = (e: any) => {
		// Handle search logic here
		const val = e.target.value;
		setSortValue(val);
	};
	return (
		<Layout>
			<Container>
				<div className='grid grid-cols-1 lg:grid-cols-[250px_minmax(375px,_1fr)] gap-0 lg:gap-12'>
					{/* sidebar part - left side */}
					<div>
						{/* category sidebar */}
						<div className='hidden lg:block mb-4'>
							<Sidebar hoverable={true}>
								<Sidebar.MenuHeading>
									<PrimaryText className=' uppercase'>Category</PrimaryText>
									{/* icon */}
									<Menu />
								</Sidebar.MenuHeading>
								<Sidebar.MenuItems data={categoriesData} pagetype='category' />
							</Sidebar>
						</div>
						{/* Filter sidebar */}
						<div className='hidden lg:block relative z-[1]'>
							{/* must include onApplyFilters for filtering to work */}
							{/* <SidebarDesktop /> */}
						</div>
					</div>
					{/* nav - Products gird  - right side */}
					<div>
						{/* breadcrumb mobile */}
						<Flex className='flex-col lg:hidden gap-2 mb-4'>
							<div className='flex items-center gap-2 text-sm text-secondaryText'>
								<SecondaryText>Home</SecondaryText>
								<span>/</span>
								<SecondaryText className='uppercase'>100% Cotton</SecondaryText>
							</div>
							<SectionTitleText>100% Cotton</SectionTitleText>
						</Flex>
						{/* mobile  version filter sidebar*/}
						<FilterMobile
							showFilter={showFilter}
							setShowFilter={setShowFilter}
							showSortFilter={showSortFilter}
							setShowSortFilter={setShowSortFilter}
						/>
						{/* Search box and products grid */}
						<div className=''>
							{/* breadcrumb desktop*/}
							<Flex className='hidden w-full lg:flex flex-col gap-2'>
								<div className='flex items-center gap-2 text-sm text-secondaryText'>
									<SecondaryText>Home</SecondaryText>
									<span>/</span>
									<SecondaryText className='uppercase'>
										100% Cotton
									</SecondaryText>
								</div>
							</Flex>
							{/* search filter */}
							<div className='my-4 flex flex-col items-center gap-1'>
								<div className='w-full lg:grow order-2 lg:order-1 flex justify-center my-4'>
									<img
										src='/gildan-logo.webp'
										alt='brand logo'
										className='h-[140px] md:h-[145px]'
									/>
								</div>
								{/* sort by desktop */}
								<div className='hidden md:block w-full order-2 lg:order-1'>
									<SectionTitleText className='py-2'>Gildan</SectionTitleText>
									<ProductFilterBar />
								</div>

								{/* <Flex className='items-center gap-2 w-full lg:w-[280px] order-1 lg:order-2'>
									<div className='grow'>
										<SecondaryInputField
											name='sortBy'
											value={sortValue}
											onChange={handleSortBy}
											options={sorBy}
										/>
									</div>
								</Flex> */}
							</div>
							{/* product gird */}
							<ProductList />
							{/* pagination */}
							{/* temporary comment */}
							{/* <ProductPagination /> */}
						</div>
					</div>
				</div>
			</Container>
		</Layout>
	);
};

export default BrandsPage;

'use client';
import React, { useState } from 'react';
import { Layout, SectionLayout } from '../Layout';
import Container from '../reusables/Container';
import { Sidebar } from '../Sidebar';
import { Flex, PrimaryText, SectionTitleText } from '../reusables';
import { ChevronDown, ChevronUp, Menu } from 'lucide-react';
import { FaMinus } from 'react-icons/fa';
import {
	brandsData,
	categoriesData,
	colorsData,
	sizesData,
} from '@/lib/menuData';
import SecondaryText from '../reusables/SecondaryText';
import { ColorSidebar } from '../ColorSidebar';
import { CatNav, FilterMobile, ProductList, SidebarDesktop } from './index';
import { SecondaryInputField } from '../Signup';
import { navData } from '@/lib/navData';
import { NavItem } from '../Navbar';
import { usePathname } from 'next/navigation';
const sorBy = [
	{ label: 'Price: Ascending', value: 'ascending' },
	{ label: 'Price: Descending', value: 'descending' },
	{ label: 'A-Z', value: 'title' }, // adjust title based on api
	{ label: 'Z-A', value: '-title' }, // adjust title based on api
];

const SingleCategoryPageV1 = () => {
	// const pathname = usePathname();
	// console.log('pathname is', pathname);
	const [showFilter, setShowFilter] = useState(false);
	const [filterValue, setFilterValue] = useState('');
	const [sortValue, setSortValue] = useState('');
	const handleSerach = (e: any) => {
		// Handle search logic here
		setFilterValue(e.target.value);
		// console.log(e.target.value);
	};
	const handleSortBy = (e: any) => {
		// Handle search logic here
		// setSortValue(e.target.value);
		// console.log(e.target.value);
	};
	return (
		<Layout>
			<Container>
				{/* Category  and Lists GRID-1*/}
				<CatNav />

				{/* GRID-2 */}
				<div className='grid grid-cols-1 lg:grid-cols-[250px_minmax(375px,_1fr)] gap-0 lg:gap-12'>
					<Flex className='flex-col lg:hidden gap-2 mb-4'>
						{/* breadcrumb */}
						<div className='flex items-center gap-2 text-sm text-secondaryText'>
							<SecondaryText>Home</SecondaryText>
							<span>/</span>
							<SecondaryText className='uppercase'>100% Cotton</SecondaryText>
						</div>
						{/* Category Name */}
						<SectionTitleText>100% Cotton</SectionTitleText>
					</Flex>
					{/* mobile  version filter sidebar*/}
					<FilterMobile showFilter={showFilter} setShowFilter={setShowFilter} />
					{/* sidebar desktop :filter sidebar*/}
					{/* <SidebarDesktop /> */}
					<div className=''>
						{/* breadcrumb desktop*/}
						<Flex className='hidden lg:flex-col gap-2'>
							<div className='flex items-center gap-2 text-sm text-secondaryText'>
								<SecondaryText>Home</SecondaryText>
								<span>/</span>
								<SecondaryText className='uppercase'>100% Cotton</SecondaryText>
							</div>
							<SectionTitleText>100% Cotton</SectionTitleText>
						</Flex>
						{/* search filter */}
						<div className='my-4 flex flex-col lg:flex-row items-center gap-1 lg:gap-8'>
							<div className='w-full lg:grow order-2 lg:order-1'>
								<SecondaryInputField
									name='filterInput'
									value={filterValue}
									onChange={handleSerach}
									placeholder='Filter products by name, SKU, attributes...'
								/>
							</div>
							{/* sort by */}
							<Flex className='items-center gap-2 w-full lg:w-[280px] order-1 lg:order-2'>
								{/* <PrimaryText className='w-[60px]'>Sort By</PrimaryText> */}
								<div className='grow'>
									<SecondaryInputField
										name='sortBy'
										value={sortValue}
										onChange={handleSortBy}
										options={sorBy}
										// placeholder='Sort By'
									/>
								</div>
							</Flex>
						</div>
						<ProductList />
					</div>
				</div>
			</Container>
		</Layout>
	);
};

export default SingleCategoryPageV1;

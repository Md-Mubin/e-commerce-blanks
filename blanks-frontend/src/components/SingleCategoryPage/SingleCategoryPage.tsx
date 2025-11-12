'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Flex, PrimaryText, SectionTitleText } from '../reusables';
import { Menu } from 'lucide-react';
// import { categoriesData } from '@/lib/menuData';
import SidebarDesktop from './SidebarDesktop';
import SecondaryText from '../reusables/SecondaryText';
import FilterMobile from './FilterMobile';
import ProductList from './ProductLists';
import { SecondaryInputField } from '../Signup';
import { Layout } from '../Layout';
import Container from '../reusables/Container';
import { navData } from '@/lib/navData';
import { NavItem } from '../Navbar';
import { ProductFilterBar, ProductPagination } from './index';
import { useRouter } from 'next/navigation';
import Sidebar from '../Sidebar/Sidebar';
import Link from 'next/link';
type PaginationInfo = {
	page: number;
	totalPages: number;
	totalDocs: number;
	limit: number;
	docsInPage: number;
};
type SingleCategoryPageProps = {
	products: any[];
	sortValue: string;
	searchValue: string;
	pagination?: PaginationInfo;
	categoryData?: any;
};

const SingleCategoryPage = ({
	products,
	sortValue,
	searchValue,
	pagination,
	categoryData,
}: SingleCategoryPageProps) => {
	const [selectedColumns, setSelectedColumns] = useState(4);
	const router = useRouter();
	// ✅ state placeholders (will be used later)
	const [showFilter, setShowFilter] = useState(false);
	const [showSortFilter, setShowSortFilter] = useState(false);
	const [searchInput, setSearchInput] = useState(searchValue);
	// ✅ category name from first product (fallback to "Category")
	const categoryName = products?.[0]?.category?.name || 'Category';

	const applyFilters = useCallback(
		(filters: Record<string, string[] | { min?: number; max?: number }>) => {
			const url = new URL(window.location.href);

			Object.entries(filters).forEach(([key, values]) => {
				if (
					key === 'PRICE' &&
					typeof values === 'object' &&
					!Array.isArray(values) &&
					('min' in values || 'max' in values)
				) {
					// ✅ Handle numeric price range
					const { min, max } = values as { min?: number; max?: number };
					if (min && max) url.searchParams.set('price_btwn', `${min}_${max}`);
					else if (min) url.searchParams.set('price_gte', String(min));
					else if (max) url.searchParams.set('price_lte', String(max));
					else {
						url.searchParams.delete('price_btwn');
						url.searchParams.delete('price_gte');
						url.searchParams.delete('price_lte');
					}
				} else if (Array.isArray(values)) {
					// ✅ Handle array filters like SIZE, COLOR, BRAND etc.
					if (values.length > 0)
						url.searchParams.set(key.toUpperCase(), values.join(','));
					else url.searchParams.delete(key.toUpperCase());
				}
			});

			url.searchParams.set('page', '1'); // reset pagination on filter change

			// ✅ Use replace() with shallow routing to prevent full reload
			router.replace(url.toString(), { scroll: false });
		},
		[router]
	);

	// ✅ Debounced Search
	const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	useEffect(() => {
		if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
		searchTimeoutRef.current = setTimeout(() => {
			const url = new URL(window.location.href);
			if (searchInput.trim())
				url.searchParams.set('search', searchInput.trim());
			else url.searchParams.delete('search');
			url.searchParams.set('page', '1');
			router.replace(url.toString(), { scroll: false });
		}, 600);
		return () => {
			if (searchTimeoutRef.current) {
				clearTimeout(searchTimeoutRef.current);
			}
		};
	}, [searchInput, router]);

	// ✅ Sort change handler
	const handleSortChange = useCallback(
		(newSort: string) => {
			const url = new URL(window.location.href);
			url.searchParams.set('sort', newSort);
			url.searchParams.set('page', '1');
			router.replace(url.toString(), { scroll: false });
		},
		[router]
	);

	// ✅ Page change handler
	const handlePageChange = useCallback(
		(newPage: number) => {
			const url = new URL(window.location.href);
			url.searchParams.set('page', String(newPage));
			router.replace(url.toString(), { scroll: false });
		},
		[router]
	);

	// ✅ Limit change handler
	const handleLimitChange = useCallback(
		(newLimit: number) => {
			const url = new URL(window.location.href);
			url.searchParams.set('limit', String(newLimit));
			url.searchParams.set('page', '1');
			router.replace(url.toString(), { scroll: false });
		},
		[router]
	);

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
									<PrimaryText className='text-primaryColor uppercase'>
										Category
									</PrimaryText>
									<Menu />
								</Sidebar.MenuHeading>
								<Sidebar.MenuItems data={categoryData} pagetype='category' />
							</Sidebar>
						</div>

						{/* Filter sidebar */}
						<div className='hidden lg:block relative z-[1]'>
							<SidebarDesktop onApplyFilters={applyFilters} />
						</div>
					</div>

					{/* nav - Products grid - right side */}
					<div>
						<nav className={`space-x-6 hidden md:flex`}>
							{navData?.map((item: any, index: number) => (
								<NavItem key={index} item={item} />
							))}
						</nav>

						{/* breadcrumb mobile */}
						<Flex className='flex-col lg:hidden gap-2 mb-4'>
							<div className='flex items-center gap-2 text-sm text-secondaryText'>
								<SecondaryText>
									<Link href={'/'}>
										Home
									</Link>
								</SecondaryText>
								<span>/</span>
								<SecondaryText className='uppercase'>
									{categoryName}
								</SecondaryText>
							</div>
							<SectionTitleText>{categoryName}</SectionTitleText>
						</Flex>

						{/* mobile version filter sidebar */}
						<FilterMobile
							showFilter={showFilter}
							setShowFilter={setShowFilter}
							showSortFilter={showSortFilter}
							setShowSortFilter={setShowSortFilter}
							onApplyFilters={applyFilters}
							onSortChange={handleSortChange}
							initialSort={sortValue}
							onLimitChange={handleLimitChange}
							selectedColumns={selectedColumns}
							setSelectedColumns={setSelectedColumns}
						/>

						{/* Search box and products grid */}
						<div className=''>
							{/* breadcrumb desktop */}
							<Flex className='hidden w-full lg:flex flex-col gap-2 mt-4'>
								<div className='flex items-center gap-2 text-sm text-secondaryText'>
									<SecondaryText>
										<Link href={'/'}>
											Home
										</Link>
									</SecondaryText>
									<span>/</span>
									<SecondaryText className='uppercase'>
										{categoryName}
									</SecondaryText>
								</div>
								<SectionTitleText>{categoryName}</SectionTitleText>
							</Flex>

							{/* search & sort UI */}
							<div className='my-4 flex flex-col items-center gap-1'>
								<div className='w-full lg:grow order-2 lg:order-1'>
									<SecondaryInputField
										name='searchInput'
										value={searchInput}
										onChange={(e: any) => setSearchInput(e.target.value)}
										placeholder='Search products by name...'
									/>
								</div>

								{/* sort bar */}
								<div className='hidden md:block w-full order-2 lg:order-1'>
									<ProductFilterBar
										onSortChange={handleSortChange}
										initialSort={sortValue}
										onLimitChange={handleLimitChange}
										selectedColumns={selectedColumns}
										setSelectedColumns={setSelectedColumns}
									/>
								</div>
							</div>

							{/* Product grid */}
							<ProductList
								allProducts={products}
								selectedColumns={selectedColumns}
								setSelectedColumns={setSelectedColumns}
							/>

							{/* pagination */}
							<ProductPagination
								pagination={
									pagination ?? {
										page: 1,
										totalPages: 1,
										totalDocs: 0,
										docsInPage: 0,
										limit: 10,
									}
								}
								onPageChange={handlePageChange}
							/>
						</div>
					</div>
				</div>
			</Container>
		</Layout>
	);
};

export default SingleCategoryPage;

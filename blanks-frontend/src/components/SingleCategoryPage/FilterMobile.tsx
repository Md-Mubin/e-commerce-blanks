import React from 'react';
import SecondaryText from '../reusables/SecondaryText';
import { ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { ColorSidebar } from '../ColorSidebar';
import { brandsData, colorsData, sizesData } from '@/lib/menuData';
import ProductFilterBar from './ProductFilterBar';

const FilterMobile = ({
	showFilter,
	setShowFilter,
	showSortFilter,
	setShowSortFilter,
	onApplyFilters,
	onSortChange,
	initialSort,
	onLimitChange,
	selectedColumns,
	setSelectedColumns,
}: any) => {
	return (
		<div className='lg:hidden relative'>
			<div className='flex justify-between gap-2'>
				<div
					className='w-full border border-secondaryBorder py-2 px-4 rounded-sm flex justify-between items-center'
					onClick={(e: any) => {
						// does not working
						// e.stopPropagation();
						setShowFilter(!showFilter);
					}}
				>
					<SecondaryText>
						{showFilter ? 'Hide Filters' : 'Show Filters'}
					</SecondaryText>
					{showFilter ? (
						<ChevronUp size={14} strokeWidth={2} />
					) : (
						<ChevronDown size={14} strokeWidth={2} />
					)}
				</div>
				<div
					className='md:hidden border border-secondaryBorder py-2 px-4 rounded-sm flex justify-center items-center'
					onClick={() => setShowSortFilter(!showSortFilter)}
				>
					<Settings className='w-[18px] h-[18px]' />
				</div>
			</div>
			<div className='absolute top-[42px] left-0 w-full bg-white z-10 rounded-sm'>
				{showFilter && (
					<ColorSidebar onApplyFilters={onApplyFilters}>
						<ColorSidebar.SelectedFilters />
						{/* <ColorSidebar.MenuItems title='COLOUR' data={colorsData} /> */}
						<ColorSidebar.MenuItems
							title='SIZE'
							data={sizesData}
							defaultOpen={false}
						/>
						{/* <ColorSidebar.MenuItems
							title='BRAND'
							data={brandsData}
							defaultOpen={false}
						/> */}
						<ColorSidebar.PriceFilter />
					</ColorSidebar>
				)}
			</div>
			{/* <div className='absolute top-[42px] left-0 w-full bg-white z-[999] rounded-sm overflow-hidden'> */}
			{showSortFilter && (
				<div className='md:hidden w-full mt-2'>
					<ProductFilterBar
						onSortChange={onSortChange}
						initialSort={initialSort}
						onLimitChange={onLimitChange}
						selectedColumns={selectedColumns}
						setSelectedColumns={setSelectedColumns}
					/>
				</div>
			)}
			{/* </div> */}
		</div>
	);
};

export default FilterMobile;

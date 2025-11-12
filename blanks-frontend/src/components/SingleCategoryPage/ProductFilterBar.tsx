'use client';
import { useState, useEffect } from 'react';
import SortDropdown from './SortDropdown';
import ColumnSelector from './ColumnSelector';
import { useSearchParams } from 'next/navigation';

interface ProductFilterBarProps {
	onSortChange?: (val: string) => void;
	initialSort?: string;
	onLimitChange?: (val: number) => void;
	selectedColumns?: any;
	setSelectedColumns?: any;
}

const ProductFilterBar = ({
	onSortChange,
	initialSort = '-createdAt',
	onLimitChange,
	selectedColumns,
	setSelectedColumns,
}: ProductFilterBarProps) => {
	// get limit val from params
	const searchParams = useSearchParams();

	const sortOptions = [
		{ label: 'Newest', value: '-createdAt' },
		{ label: 'Price: Low to High', value: 'price' },
		{ label: 'Price: High to Low', value: '-price' },
		{ label: 'Name: A-Z', value: 'name' },
		{ label: 'Name: Z-A', value: '-name' },
	];

	const [sortBy, setSortBy] = useState(
		sortOptions.find(opt => opt.value === initialSort)?.label || 'Newest'
	);

	const [productsPerPage, setProductsPerPage] = useState<any>();

	const handleSortChange = (label: string) => {
		setSortBy(label);
		const selected = sortOptions.find(opt => opt.label === label);
		if (onSortChange && selected) onSortChange(selected.value);
	};

	const handleLimitChange = (limitLabel: string | number) => {
		const val = Number(limitLabel);
		setProductsPerPage(val);
		if (onLimitChange) onLimitChange(val); // ✅ notify parent
	};
	const perPageOptions = [10, 15, 20];

	return (
		<div className='flex gap-2 md:gap-0 flex-col md:flex-row md:items-center md:justify-between px-2 py-2 border border-secondaryBorder rounded-sm'>
			{/* Sort By */}
			<div className='flex items-center'>
				<SortDropdown
					label='Sort By'
					value={sortBy}
					options={sortOptions.map(opt => opt.label)}
					onChange={handleSortChange}
				/>
			</div>

			{/* Center - Column Layout */}
			<div className='hidden md:flex flex-1 md:justify-center'>
				<ColumnSelector
					selectedColumns={selectedColumns}
					onColumnChange={setSelectedColumns}
				/>
			</div>

			{/* Right Side - Products Per Page */}
			<div className='flex items-center'>
				<SortDropdown
					label='Select Products Per Page'
					value={productsPerPage}
					options={perPageOptions}
					onChange={handleLimitChange}
				/>
			</div>
		</div>
	);
};

export default ProductFilterBar;

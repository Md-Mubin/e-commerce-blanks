'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ButtonPrimary, Flex, PrimaryText } from '../reusables';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import SecondaryText from '../reusables/SecondaryText';
import { useRouter } from 'next/navigation';

type SidebarContextType = {
	selectedFilters: { [key: string]: string[] };
	toggleFilter: (category: string, value: string) => void;
	clearCategory: (category: string) => void;
	clearAll: () => void;
	onApplyFilters?: (
		filters: Record<string, string[] | { min?: number; max?: number }>
	) => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const useNavContext = () => {
	const context = useContext(SidebarContext);
	if (!context) throw new Error('useNavContext must be used within Sidebar');
	return context;
};

const ColorSidebar = ({
	children,
	onApplyFilters,
}: {
	children: React.ReactNode;
	onApplyFilters: (
		filters: Record<string, string[] | { min?: number; max?: number }>
	) => void;
}) => {
	const [selectedFilters, setSelectedFilters] = useState<{
		[key: string]: string[];
	}>({});
	// console.log('selected filters:', selectedFilters);

	// ✅ Debounced URL update (safe timing)
	useEffect(() => {
		if (onApplyFilters) {
			const timeout = setTimeout(() => {
				onApplyFilters(selectedFilters);
			}, 200);
			return () => clearTimeout(timeout);
		}
	}, [selectedFilters, onApplyFilters]);

	const toggleFilter = (category: string, value: string) => {
		setSelectedFilters(prev => {
			const current = prev[category] || [];
			const exists = current.includes(value);
			const updated = exists
				? current.filter(v => v !== value)
				: [...current, value];
			return { ...prev, [category]: updated };
		});
	};

	const clearCategory = (category: string) => {
		setSelectedFilters(prev => ({ ...prev, [category]: [] }));
	};

	const clearAll = () => {
		setSelectedFilters({});
	};

	return (
		<SidebarContext.Provider
			value={{
				selectedFilters,
				toggleFilter,
				clearCategory,
				clearAll,
				onApplyFilters,
			}}
		>
			<div className='border border-gray-200 w-full lg:max-w-[260px]'>
				{children}
			</div>
		</SidebarContext.Provider>
	);
};

// Heading
const MenuHeading = ({ children }: { children: React.ReactNode }) => {
	return (
		<Flex className='p-3 bg-black text-primaryColor text-sm font-semibold justify-between items-center'>
			{children}
		</Flex>
	);
};

// Selected filters box
const SelectedFilters = () => {
	const { selectedFilters, toggleFilter, clearAll } = useNavContext();
	const allSelected = Object.entries(selectedFilters).flatMap(([cat, values]) =>
		values.map(v => ({ cat, value: v }))
	);

	if (allSelected.length === 0) {
		return <p className='p-3 text-xs text-gray-400'>No filter applied</p>;
	}

	return (
		<div className='p-3 space-y-2'>
			<div className='flex flex-wrap gap-2'>
				{allSelected.map((f, idx) => (
					<div key={idx} onClick={() => toggleFilter(f.cat, f.value)}>
						<SecondaryText className='capitalize text-primaryColor shadow-sm flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-sm cursor-pointer'>
							{f.value} <X className='w-[12px] h-[12px]' />
						</SecondaryText>
					</div>
				))}
			</div>
			<button
				className='text-[13px] underline text-gray-500 hover:text-black'
				onClick={clearAll}
			>
				Clear all
			</button>
		</div>
	);
};

// MenuItems with Show More + Clear category + Hover X button
type MenuItemsProps = {
	title: string;
	data: { _id: string; name: string; quantity: number }[];
	defaultOpen?: boolean;
	showLimit?: number;
};

const MenuItems = ({
	title,
	data,
	defaultOpen = true,
	showLimit = 8,
}: MenuItemsProps) => {
	const [open, setOpen] = useState(defaultOpen);
	const [showMore, setShowMore] = useState(false);
	const { selectedFilters, toggleFilter, clearCategory } = useNavContext();

	const selected = selectedFilters[title] || [];
	const visibleData = showMore ? data : data.slice(0, showLimit);

	return (
		<div className='border-b border-secondaryBorder'>
			<div className='flex justify-between items-center px-4 py-2 text-[13px] font-semibold'>
				<PrimaryText onClick={() => setOpen(!open)} className='cursor-pointer'>
					{title}
				</PrimaryText>
				<div className='flex items-center gap-3'>
					{selected.length > 0 && (
						<button
							onClick={() => clearCategory(title)}
							className='text-xs text-gray-500 hover:text-black'
						>
							Clear
						</button>
					)}
					{open ? (
						<ChevronUp
							size={14}
							strokeWidth={2}
							onClick={(e: any) => {
								e.stopPropagation();
								setOpen(false);
							}}
						/>
					) : (
						<ChevronDown
							size={14}
							strokeWidth={2}
							onClick={(e: any) => {
								e.stopPropagation();
								setOpen(true);
							}}
						/>
					)}
				</div>
			</div>

			<div
				className={`overflow-hidden transition-all duration-300 ${
					open ? 'max-h-[1000px]' : 'max-h-0'
				}`}
			>
				<ul className='px-4 pb-3 space-y-2 text-[13px]'>
					{visibleData.map(item => {
						const isChecked = selected.includes(item.name);
						return (
							<li key={item._id} className='flex items-center gap-[12px] group'>
								<input
									type='checkbox'
									checked={isChecked}
									onChange={(e: any) => {
										e.stopPropagation();
										toggleFilter(title, item.name);
									}}
									className='w-[14px] h-[14px] border border-secondaryColor rounded-sm cursor-pointer'
								/>
								<SecondaryText className='capitalize tracking-[0.3px] flex-1 flex justify-between items-center'>
									<span>
										{item?.name?.toUpperCase()}
										{/* {item.name} ({item.quantity}) */}
									</span>
									{isChecked && (
										<button
											onClick={(e: any) => {
												e.stopPropagation();
												toggleFilter(title, item.name);
											}}
											className='cursor-pointer opacity-0 group-hover:opacity-100 text-gray-500 hover:text-black transition-opacity'
										>
											<X size={12} />
										</button>
									)}
								</SecondaryText>
							</li>
						);
					})}
				</ul>
				{data.length > showLimit && (
					<button
						onClick={() => setShowMore(!showMore)}
						className='cursor-pointer px-4 pb-3 text-[12px] underline text-gray-500'
					>
						{showMore ? 'SHOW LESS' : 'SHOW MORE'}
					</button>
				)}
			</div>
		</div>
	);
};
const PriceFilter = () => {
	const [open, setOpen] = useState(true);
	const [min, setMin] = useState('');
	const [max, setMax] = useState('');
	const { selectedFilters, clearAll } = useNavContext();
	const router = useRouter();

	// Grab applyFilters from props via context provider
	const { onApplyFilters } = useNavContext();

	return (
		<div className='border-b border-transparent'>
			<div className='flex justify-between items-center px-4 py-2 text-[13px] font-semibold'>
				<span>PRICE</span>
				{open ? (
					<ChevronUp size={14} strokeWidth={2} onClick={() => setOpen(false)} />
				) : (
					<ChevronDown
						size={14}
						strokeWidth={2}
						onClick={() => setOpen(true)}
					/>
				)}
			</div>

			<div
				className={`overflow-hidden transition-all duration-300 ${
					open ? 'max-h-[120px]' : 'max-h-0'
				}`}
			>
				<div className='px-4 pb-3 flex gap-2'>
					<input
						type='number'
						value={min}
						onChange={e => setMin(e.target.value)}
						placeholder='Min.'
						className='w-full border border-secondaryBorder rounded px-2 py-1 text-sm'
					/>
					<input
						type='number'
						value={max}
						onChange={e => setMax(e.target.value)}
						placeholder='Max.'
						className='w-full border border-secondaryBorder rounded px-2 py-1 text-sm'
					/>
					<ButtonPrimary
						onClick={() =>
							onApplyFilters?.({
								PRICE: {
									min: Number(min),
									max: Number(max),
								},
							})
						}
					>
						UPDATE
					</ButtonPrimary>
				</div>
			</div>
		</div>
	);
};

// const PriceFilter = () => {
// 	const [open, setOpen] = useState(true);
// 	return (
// 		<div className='border-b border-transparent'>
// 			<div className='flex justify-between items-center px-4 py-2 text-[13px] font-semibold'>
// 				<span>PRICE</span>
// 				{open ? (
// 					<ChevronUp size={14} strokeWidth={2} onClick={() => setOpen(false)} />
// 				) : (
// 					<ChevronDown
// 						size={14}
// 						strokeWidth={2}
// 						onClick={() => setOpen(true)}
// 					/>
// 				)}
// 			</div>

// 			<div
// 				className={`overflow-hidden transition-all duration-300 ${
// 					open ? 'max-h-[120px]' : 'max-h-0'
// 				}`}
// 			>
// 				<div className='px-4 pb-3 flex gap-2'>
// 					<input
// 						type='number'
// 						placeholder='Min.'
// 						className='w-full border border-secondaryBorder rounded px-2 py-1 text-sm'
// 					/>
// 					<input
// 						type='number'
// 						placeholder='Max.'
// 						className='w-full border border-secondaryBorder rounded px-2 py-1 text-sm'
// 					/>
// 					<ButtonPrimary className=''>UPDATE</ButtonPrimary>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
ColorSidebar.MenuHeading = MenuHeading;
ColorSidebar.MenuItems = MenuItems;
ColorSidebar.PriceFilter = PriceFilter;
ColorSidebar.SelectedFilters = SelectedFilters;

export default ColorSidebar;

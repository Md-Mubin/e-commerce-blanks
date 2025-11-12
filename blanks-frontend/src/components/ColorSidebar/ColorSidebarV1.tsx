'use client';
import React, { createContext, useContext, useState } from 'react';
import { Flex } from '../reusables';
import { ChevronDown, ChevronUp } from 'lucide-react';
// import { brandsData, colorsData, sizesData } from '';

type SidebarContextType = {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const useNavContext = () => {
	const context = useContext(SidebarContext);
	if (!context) throw new Error('useNavContext must be used within Sidebar');
	return context;
};

const Sidebar = ({ children }: { children: React.ReactNode }) => {
	const [isOpen, setIsOpen] = useState(true);
	return (
		<SidebarContext.Provider value={{ isOpen, setIsOpen }}>
			<div className='border border-gray-200 w-[260px]'>{children}</div>
		</SidebarContext.Provider>
	);
};

const MenuHeading = ({ children }: { children: React.ReactNode }) => {
	return (
		<Flex className='p-3 bg-black text-white text-sm font-semibold justify-between items-center'>
			{children}
		</Flex>
	);
};

type MenuItemsProps = {
	title: string;
	data: any[];
	defaultOpen?: boolean;
};

const MenuItems = ({ title, data, defaultOpen = true }: MenuItemsProps) => {
	const [open, setOpen] = useState(defaultOpen);

	return (
		<div className='border-b border-gray-200'>
			<div
				className='flex justify-between items-center px-4 py-2 cursor-pointer text-[13px] font-semibold'
				onClick={() => setOpen(!open)}
			>
				<span>{title}</span>
				{open ? (
					<ChevronUp size={14} strokeWidth={2} />
				) : (
					<ChevronDown size={14} strokeWidth={2} />
				)}
			</div>

			<div
				className={`overflow-hidden transition-all duration-300 ${
					open ? 'max-h-[1000px]' : 'max-h-0'
				}`}
			>
				<ul className='px-4 pb-3 space-y-1 text-[13px]'>
					{data.map(item => (
						<li key={item._id} className='flex items-center gap-2'>
							<input
								type='checkbox'
								className='w-4 h-4 border border-gray-400 rounded cursor-pointer'
							/>
							<span>
								{item.name} ({item.quantity})
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

const PriceFilter = () => {
	return (
		<div className='border-b border-gray-200'>
			<div className='flex justify-between items-center px-4 py-2 text-[13px] font-semibold'>
				<span>PRICE</span>
				<ChevronUp size={14} strokeWidth={2} />
			</div>
			<div className='px-4 pb-3 flex gap-2'>
				<input
					type='number'
					placeholder='Min.'
					className='w-full border border-gray-300 rounded px-2 py-1 text-sm'
				/>
				<input
					type='number'
					placeholder='Max.'
					className='w-full border border-gray-300 rounded px-2 py-1 text-sm'
				/>
				<button className='bg-yellow-400 text-sm px-3 rounded'>UPDATE</button>
			</div>
		</div>
	);
};

Sidebar.MenuHeading = MenuHeading;
Sidebar.MenuItems = MenuItems;
Sidebar.PriceFilter = PriceFilter;

export default Sidebar;

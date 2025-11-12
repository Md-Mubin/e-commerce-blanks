'use client';
import React, { createContext, FC, useContext, useState } from 'react';
import { Flex, PrimaryText, TextBase } from '../reusables';
import { Menu, ChevronDown, ChevronRight } from 'lucide-react';
import SecondaryText from '../reusables/SecondaryText';
import Link from 'next/link';
import { slugify } from '@/lib/slugify';

type MenuItemProps = {
	data: any[];
	isMobile?: boolean | null;
	pagetype: string;
};

const SidebarContext = createContext<{
	isOpen: boolean;
	hoverable?: boolean;
	setIsOpen: (open: boolean) => void;
} | null>(null);

export const useNavContext = () => {
	const context = useContext(SidebarContext);
	if (!context) throw new Error('useNavContext must be used within NavMenu');
	return context;
};

type SidebarProps = { children: React.ReactNode; hoverable?: boolean };
const Sidebar = ({ children, hoverable }: SidebarProps) => {
	const [isOpen, setIsOpen] = useState(hoverable ? false : true);
	return (
		<SidebarContext.Provider value={{ isOpen, setIsOpen, hoverable }}>
			<div
				className={`relative`}
				onMouseLeave={() => hoverable === true && setIsOpen(false)}
			>
				{children}
			</div>
		</SidebarContext.Provider>
	);
};

// Sidebar heading
const MenuHeading = ({ children }: any) => {
	const { isOpen, hoverable, setIsOpen } = useNavContext();
	return (
		<div className='px-4 py-[10px] flex bg-black justify-between items-center relative'
			onMouseEnter={() => hoverable === true && setIsOpen(true)}
		>
			{children}
		</div>
	);
};

// Sidebar menu items
const MenuItems = ({ data, isMobile, pagetype }: MenuItemProps) => {
	const { isOpen, hoverable } = useNavContext();
	const parents = data?.filter((cat: any) => !cat.parentCategory);
	const subcategories = data?.filter((cat: any) => cat.parentCategory);

	const [expanded, setExpanded] = useState<string | null>(null);

	return (
		<div
			className={`transition-all duration-300 overflow-hidden
        ${
					hoverable === true
						? 'absolute top-[44px] left-0 w-full z-[20] bg-white'
						: 'relative z-[1]'
				}
        ${
					isOpen
						? 'opacity-100 visible pointer-events-auto translate-y-0 max-h-[1000px]'
						: 'opacity-0 invisible pointer-events-none translate-y-[-10px] max-h-0'
				}`}
		>
			<ul
				className={`${
					isMobile
						? 'border-0'
						: 'border border-secondaryBorder divide-y divide-secondaryBorder'
				}`}
			>
				{parents?.map((parent: any) => {
					const childSubs = subcategories?.filter(
						(sub: any) => sub.parentCategory?._id === parent._id
					);
					const hasSub = childSubs?.length > 0;
					const isExpanded = expanded === parent._id;

					let hoverTimeout: any;

					return (
						<li
							key={parent._id}
							onMouseEnter={() => {
								clearTimeout(hoverTimeout);
								if (hasSub) setExpanded(parent._id);
							}}
							onMouseLeave={() => {
								hoverTimeout =  setExpanded(null);
							}}
						>
							{/* Parent Row */}
							<div
								className={`${
									isMobile ? 'py-3' : 'p-3'
								} flex justify-between items-center cursor-pointer hover:text-secondaryColor ${
									hasSub ? 'font-medium' : ''
								} ${isExpanded ? 'text-black' : 'text-primaryColor'}`}
							>
								{isMobile ? (
									<TextBase
										className={`uppercase ${
											isExpanded ? 'text-black' : 'text-primaryColor'
										} hover:text-secondaryColor`}
									>
										<Link
											href={`/${pagetype}/${slugify(parent?.name)}_${parent?.id}`}
										>
											{parent?.name}
										</Link>
									</TextBase>
								) : (
									<PrimaryText
										className={`${
											isExpanded ? 'text-black' : 'text-primaryColor'
										} hover:text-secondaryColor`}
									>
										<Link
											href={`/${pagetype}/${slugify(parent?.name)}_${parent?.id}`}
										>
											{parent?.name}
										</Link>
									</PrimaryText>
								)}
								{hasSub &&
									(isExpanded ? (
										<ChevronDown size={16} />
									) : (
										<ChevronRight size={16} />
									))}
							</div>

							{/* Subcategories */}
							{hasSub && isExpanded && (
								<ul className='divide-y divide-secondaryBorder'>
									{childSubs?.map((sub: any) => (
										<li
											key={sub?._id}
											className={`${
												isMobile
													? 'pl-6 p-2 border-0'
													: 'pl-6 p-2 border-secondaryBorder first:border-t'
											}`}
										>
											<Link
												href={`/${pagetype}/${slugify(sub?.name)}_${sub?.id}`}
												className='block'
											>
												<SecondaryText
													className={`${
														isMobile
															? 'uppercase'
															: 'hover:text-primaryColor'
													}`}
												>
													{sub?.name}
												</SecondaryText>
											</Link>
										</li>
									))}
								</ul>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

Sidebar.MenuHeading = MenuHeading;
Sidebar.MenuItems = MenuItems;

export default Sidebar;

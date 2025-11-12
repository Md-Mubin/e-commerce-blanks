'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PiShoppingCartLight } from 'react-icons/pi';
import { Flex, InputField, PrimaryText, TextBase } from '../reusables';
import Container from '../reusables/Container';
import AnimatedMenuIcon from './AnimatedMenu';
import { Sidebar } from '../Sidebar';
import { categoriesData } from '@/lib/menuData';
import { navDataMobile } from '@/lib/navData';
import { Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';

const MobileNav = () => {
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [showMobileSearch, setShowMobileSearch] = useState(false);
	const isLoggedIn = useSelector((state: any) => state.auth?.loggedIn);
	const [searchVal, setSearchVal] = useState('');
	const handleSearch = () => { };
	return (
		<div className='lg:hidden mb-[10px] relative'>
			<Container>
				{/* Menu overlay */}
				{showMobileMenu && (
					<div className='fixed inset-0 z-[10] bg-white'>
						{/* Fixed nav */}
						<div className='fixed top-0 left-0 w-full bg-white z-[11]'>
							<Container>
								<nav className='grid grid-cols-3 items-center h-[70px]'>
									<AnimatedMenuIcon
										showMobileMenu={showMobileMenu}
										setShowMobileMenu={setShowMobileMenu}
									/>
									<div className='h-[50px] justify-self-center'>
										<Link href='/'>
											<Image
												src='/logo.png'
												width={0}
												height={0}
												sizes='(max-width: 768px)'
												alt='logo image'
												className='w-auto h-full object-contain'
											/>
										</Link>
									</div>
									<Flex className='items-end gap-2 justify-self-end'>
										<PiShoppingCartLight className='text-[32px] text-secondaryColor' />
										<TextBase className='text-secondaryColor text-md'>
											Cart
										</TextBase>
									</Flex>
								</nav>
							</Container>
						</div>

						{/* Scrollable menu content */}
						<div className='mt-[84px] h-[calc(100vh-84px)] overflow-y-auto'>
							<Container>
								<Sidebar>
									<Sidebar.MenuItems
										data={categoriesData}
										isMobile={true}
										pagetype='category'
									/>
									<CustomDivider />
									<Sidebar.MenuItems
										data={navDataMobile}
										isMobile={true}
										pagetype='brand'
									/>
									<CustomDivider />
								</Sidebar>
								<Link
									href={isLoggedIn ? '/profile' : '/signin'}
									className='inline-block py-1'>
									<TextBase className='uppercase text-primaryColor hover:text-primaryColor/90'>
										{
											isLoggedIn ? 'Profile' : 'Sign In'
										}
									</TextBase>
								</Link>
							</Container>
						</div>
					</div>
				)}

				{/* Normal nav when menu closed */}
				{!showMobileMenu && (
					<div className='relative'>
						<nav className='grid grid-cols-3 items-center mt-[10px] mb-[14px] lg:mb-[25px] relative z-[11]'>
							<AnimatedMenuIcon
								showMobileMenu={showMobileMenu}
								setShowMobileMenu={setShowMobileMenu}
							/>
							<div className='h-[45px] justify-self-center'>
								<Link href='/'>
									<Image
										src='/logo.png'
										width={0}
										height={0}
										sizes='(max-width: 768px)'
										alt='logo image'
										className='w-auto h-full object-contain'
									/>
								</Link>
							</div>
							<Flex className='items-center gap-2 justify-self-end'>
								<Search
									className='text-[32px] text-secondaryColor'
									onClick={() => setShowMobileSearch(!showMobileSearch)}
								/>
								<Link href='/cart'>
									<PiShoppingCartLight className='text-[32px] text-secondaryColor' />
								</Link>
							</Flex>
						</nav>

						{showMobileSearch && (
							<SearchBar />
						)}
					</div>
				)}
			</Container>
		</div>
	);
};

export default MobileNav;

const CustomDivider = () => {
	return <div className='border-t border-secondaryBorder my-2'></div>;
};
// 'use client';
// import React, { useState } from 'react';
// import { RxHamburgerMenu } from 'react-icons/rx';
// import Link from 'next/link';
// import Image from 'next/image';
// import { PiShoppingCartLight } from 'react-icons/pi';
// import { Flex, InputField, PrimaryText, TextBase } from '../reusables';
// import Container from '../reusables/Container';
// import AnimatedMenuIcon from './AnimatedMenu';
// import { Sidebar } from '../Sidebar';
// import { categoriesData } from '@/lib/menuData';
// {
// 	/* order-2 md:order-1*/
// }
// const MobileNav = () => {
// 	const [showMobileMenu, setShowMobileMenu] = useState(false);
// 	const [searchVal, setSearchVal] = useState('');
// 	const handleSearch = () => {};
// 	return (
// 		<div className='lg:hidden mb-[10px] relative'>
// 			<Container>
// 				{/* menu items */}
// 				{showMobileMenu && (
// 					<div
// 						className={`h-screen fixed top-0 left-0 w-full z-[10] ${
// 							showMobileMenu ? 'bg-white' : ''
// 						}`}
// 					>
// 						<Container className='mt-[84px]'>
// 							<Sidebar>
// 								<Sidebar.MenuItems data={categoriesData} isMobile={true} />
// 							</Sidebar>
// 						</Container>
// 					</div>
// 				)}
// 				<nav
// 					className={`flex justify-between items-center mt-[10px] mb-[14px] lg:mb-[25px] relative z-[11]`}
// 				>
// 					{/* Animated Hamburger */}
// 					<AnimatedMenuIcon
// 						showMobileMenu={showMobileMenu}
// 						setShowMobileMenu={setShowMobileMenu}
// 					/>

// 					<div className='h-[50px]'>
// 						<Link href='/'>
// 							<Image
// 								src='/logo.png'
// 								width={0}
// 								height={0}
// 								sizes='(max-width: 768px)'
// 								alt='logo image'
// 								className='w-auto h-full object-contain'
// 							/>
// 						</Link>
// 					</div>
// 					<Flex className='items-end gap-2'>
// 						<PiShoppingCartLight className='text-[32px] text-secondaryColor' />
// 						<TextBase className='text-secondaryColor text-md'>Cart</TextBase>
// 					</Flex>
// 				</nav>
// 			</Container>
// 			<header className='block bg-headerBg py-2 text-center mb-[12px] lg:hidden'>
// 				<Container>
// 					<PrimaryText className='uppercase text-white font-normal tracking-[1px] text-shadow-lg text-[14px]'>
// 						Your trusted source for customizable blank clothing
// 					</PrimaryText>
// 				</Container>
// 			</header>
// <Container>
// 	<InputField
// 		name='search'
// 		placeholder='Search'
// 		value={searchVal}
// 		onChange={handleSearch}
// 		className={
// 			'lg:hidden ring-0 focus:ring-0 border-2 focus:border-secondaryColor'
// 		}
// 	/>
// </Container>
// 		</div>
// 	);
// };

// export default MobileNav;

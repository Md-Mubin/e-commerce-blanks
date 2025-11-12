'use client';
import React, { useEffect, useState, useRef } from 'react';
import Container from '../reusables/Container';
import { NavHeader, NavMiddle, NavLists, MobileNav } from './index';

const Navbar = () => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window?.scrollY > 240);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<>
			<Container>
				<nav className='hidden w-full lg:flex flex-col gap-[25px] mt-[10px] mb-[25px]'>
					<NavHeader />
					<NavMiddle />
					{/* <NavMiddle /> */}
					<NavLists />
				</nav>
			</Container>

			{/* if scrolled : Desktop  */}
			<div
				className={`hidden lg:block fixed left-0 w-full z-50 transition-all duration-300 ease-in-out bg-white py-[4px] shadow-lg ${
					scrolled ? 'top-0 z-[200]' : 'top-[-180px]'
				}`}>
				<Container>{scrolled && <NavMiddle />}</Container>
			</div>

			{/* mobile version */}
			<MobileNav />

			{/* if scrolled: Mobile  */}
			<div
				className={`block lg:hidden fixed left-0 w-full z-50 transition-all duration-300 ease-in-out bg-white shadow-lg ${
					scrolled ? 'top-0' : 'top-[-180px]'
				}`}>
				<Container>
					<MobileNav />
				</Container>
			</div>
		</>
	);
};

export default Navbar;

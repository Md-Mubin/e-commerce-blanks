import React from 'react';
import Footer from '../Footer/Footer';
import { Box } from '../reusables';
import { Navbar } from '../Navbar';
type LayoutProps = {
	children: React.ReactNode;
	slug?: string;
};
const Layout = ({ children, slug }: LayoutProps) => {
	return (
		<div className='flex flex-col min-h-screen'>
			<Navbar />
			<Box className='grow'>{children}</Box>
			<Footer />
		</div>
	);
};

export default Layout;

import { PrimaryText } from '@/components/reusables';
import { Container } from 'lucide-react';
import React from 'react';

const TopHeader = () => {
	return (
		<header className='hidden bg-headerBg py-2 text-center lg:block'>
			<Container>
				<PrimaryText className='uppercase text-white font-normal tracking-[1px] text-shadow-lg text-[14px] lg:text-[18px]'>
					Your trusted source for customizable blank clothing
				</PrimaryText>
			</Container>
		</header>
	);
};

export default TopHeader;

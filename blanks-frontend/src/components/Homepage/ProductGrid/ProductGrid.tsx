'use client';
import { Flex, SectionTitleText } from '@/components/reusables';
import React, { useState } from 'react';
import { Card } from './index';
import Link from 'next/link';

type ProductGridProps = {
	products: any[];
};

const ProductGrid = ({ products }: ProductGridProps) => {
	const [productTab, selectProductTab] = useState('featured');

	const filteredProducts =
		productTab === 'featured' ? products.filter(p => p.isFeatured) : products;

	return (
		<div className='mb-[4rem] lg:mb-[6rem]'>
			{/* tab section */}
			<Flex className='gap-8 mt-[25px] pb-2 border-b border-secondaryBorder mb-8'>
				{/* <SectionTitleText
					onClick={() => selectProductTab('featured')}
					className={`uppercase cursor-pointer ${
						productTab == 'featured' ? 'text-primaryColor' : 'text-secondaryColor'
					}`}>
					Featured
					<Link href='/?productAttribute=featured'>Featured</Link>
				</SectionTitleText> */}
				<SectionTitleText
					// onClick={() => selectProductTab('best-selling')}
					className={`uppercase ${
						productTab == 'best-selling' ? 'text-primaryColor' : 'text-secondaryColor'
					}`}>
					All Products
					{/* <Link href='/?productAttribute=best-selling'>Best Selling</Link> */}
				</SectionTitleText>
			</Flex>
			{/* porduct card mapping*/}
			<div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2'>
				{products?.map((img: any, index: number) => (
					<Card
						key={index}
						data={img}
					/>
				))}
			</div>
		</div>
	);
};

export default ProductGrid;

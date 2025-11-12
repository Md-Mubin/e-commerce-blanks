'use client';
import { Flex, SectionTitleText } from '@/components/reusables';
import React, { useState } from 'react';
import { Card } from '../Homepage/ProductGrid';
// import { allProducts } from '../data/allProduct';
interface CSSVars extends React.CSSProperties {
  '--cols'?: number;
}
export const imgData = [
	{ image: '/product-2.jpg' },
	{ image: '/product-1.jpg' },
	{ image: '/product-3.jpg' },
	{ image: '/product-4.jpg' },
	{ image: '/product-5.jpg' },
	{ image: '/product-6.jpg' },
	{ image: '/product-7.jpg' },
	{ image: '/product-8.jpg' },
];
const ProductList = ({
	allProducts,
	selectedColumns,
	setSelectedColumns,
}: any) => {
	const [productTab, selectProductTab] = useState('featured');
	return (
		<div className='mb-[4rem] lg:mb-[6rem]'>
			{/* ✅ Responsive grid: 1–3 columns on mobile, dynamic on desktop */}
			<div
				className='grid gap-y-8 gap-x-2 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]'
				style={{ '--cols': selectedColumns } as CSSVars}
			>
				{allProducts?.map((data: any, index: number) => (
					<Card key={index} data={data} />
				))}
			</div>
		</div>
	);
};

export default ProductList;

// <div className='mb-[4rem] lg:mb-[6rem]'>
// 	{/* porduct card mapping*/}
// 	<div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-2'>
// 		{allProducts?.map((data: any, index: number) => (
// 			<Card key={index} data={data} />
// 		))}
// 	</div>
// </div>

'use client';
import React from 'react';
import { Card, ProductGrid } from '../Homepage/ProductGrid';
import { SectionHeader } from '../reusables';
import { allProducts } from '../data/allProduct';

const RelatedProducts = () => {
	return (
		<div className='mt-20'>
			{/* Heading with border box */}
			<SectionHeader title='Related Products' underlineMarginLeft='ml-36' />

			{/* Products grid */}
			<div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-2'>
				{allProducts?.doc?.map((img: any, index: number) => (
					<Card key={index} data={img} />
				))}
			</div>
		</div>
	);
};

export default RelatedProducts;

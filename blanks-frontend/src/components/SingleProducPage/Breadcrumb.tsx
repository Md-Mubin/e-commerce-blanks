import React from 'react';
import { Flex } from '../reusables';
import Link from 'next/link';
import { slugify } from '@/lib/slugify';

const Breadcrumb = ({ singleProductData }: any) => {
	console.log("breadcrunbs",singleProductData)
	return (
		<Flex className='text-sm text-primaryColor mb-6'>
			<Link href={"/"} className='font-semibold'>HOME</Link>
			<span className='mx-2'>/</span>
			<Link href={`/category/${slugify(singleProductData?.category?.name)}_${singleProductData?.category?.id}`} className='font-semibold'>{singleProductData?.category?.name}</Link>
			{/* <span className='mx-2'>/</span>
			<span className='font-semibold'>100% COTTON</span> */}
			<span className='mx-2'>/</span>
			<span className='text-secondaryColor'>
				{singleProductData?.name}
			</span>
		</Flex>
	);
};

export default Breadcrumb;

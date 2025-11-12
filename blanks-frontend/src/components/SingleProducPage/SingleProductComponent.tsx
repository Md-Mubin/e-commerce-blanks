"use client";
import { useEffect } from 'react';
import Container from '../reusables/Container';
import { Flex } from '../reusables';
import Breadcrumb from './Breadcrumb';
import ProductImage from './ProductImage';
import ProductDetails from './ProductDetails';
import RelatedProducts from './RelatedProducts';
import Description from './Description';
import { ProductStockTable } from './index';
import { addRecentView } from '@/lib/recentViews';

type SingleProductComponentProps = {
	singleProductData: any;
};

const SingleProductComponent = ({ singleProductData }: SingleProductComponentProps) => {
	 useEffect(() => {
    if (singleProductData) addRecentView(singleProductData);
  }, [singleProductData]);
	return (
		<Container className='mb-8'>
			<Breadcrumb singleProductData={singleProductData} />
			<Flex className='flex flex-col lg:flex-row gap-10 mb-10'>
				{/* Left - Product Image */}
				<div className=''>
					<ProductImage images={singleProductData?.images ?? singleProductData?.image} />
				</div>

				{/* Right - Product Details */}
				<div className='space-y-4 w-full'>
					<ProductDetails product={singleProductData} />
					{/* <SizeSelection /> */}
					{/* <ProductStockGrid data={singleProductData} /> */}
					<ProductStockTable data={singleProductData} />
					{/* Quantity No need to have this btn cause user typing in input*/}
					{/* <Quantity />
					<ButtonPrimary className=''>Add to cart</ButtonPrimary> */}
				</div>
			</Flex>
			<Description description={singleProductData?.description} />
			<RelatedProducts />
		</Container>
	);
};

export default SingleProductComponent;

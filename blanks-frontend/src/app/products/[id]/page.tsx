import { Layout, SingleProductComponent } from '@/components';
import { getSingleProduct } from '@/store/ssr/getSingleProduct';
import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata({ params }: any): Promise<Metadata> {
	const productData = await getSingleProduct(params?.id);
	const metaData = productData?.meta;

	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	return {
		title: metaData?.title || productData?.name,
		description: metaData?.description || productData?.description,
		keywords: metaData?.metaKeywords || productData?.tags,

		openGraph: {
			title: metaData?.title || productData?.name,
			description: metaData?.description || productData?.description,
			images: [productData?.metaImage],
			type: 'website',
			locale: 'en_US',
			url: `${BASE_URL}/product/${params?.id}`,
			siteName: `My Store`, // better to use a brand name than the raw URL
		},
	};
}

const SingleProductPage = async ({ params }: any) => {
	const singleProductData = await getSingleProduct(params?.id);
	// console.log('sing p data:',singleProductData)
	return (
		<Layout>
			<SingleProductComponent singleProductData={singleProductData} />
		</Layout>
	);
};

export default SingleProductPage;

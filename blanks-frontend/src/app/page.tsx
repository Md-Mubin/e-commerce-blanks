import { BannerSlider, Flex, Layout, PrimaryText, SectionLayout } from '@/components';
import { ProductGrid } from '@/components/Homepage/ProductGrid';
import Container from '@/components/reusables/Container';
import { Subscription } from '@/components/Subscription';
import { getAll } from '@/lib/ssr';
// import { getProducts } from '@/store/ssr/getProducts';
import React from 'react';
searchParams: Promise<{
	sort?: string;
	search?: string;
	limit?: string;
	page?: string;
	SIZE?: string;
	size?: string;
	price_btwn?: string;
	price_gte?: string;
	price_lte?: string;
}>;
type HomePageProps = {
	searchParams?: Promise<{
		productAttribute?: string;
	}>;
};
//
const Home = async ({ searchParams }: HomePageProps) => {
	const searchParamsVal = await searchParams;
	// isBestSelling
	// isFeatured
	// console.log('searchparams val::', searchParamsVal?.productAttribute);

	const productData = await getAll({
		path: 'products',
		filters: {
			isFeatured: true,
		},
	});
	const categoryData = await getAll({ path: 'categories' });
	const bannerData = await getAll({ path: 'banners', sort: '-priority' });

	return (
		<Flex className='w-full flex-col'>
			<header className='hidden bg-headerBg py-2 lg:block'>
				<Container>
					<PrimaryText className='uppercase text-center font-normal tracking-[1px]  text-[14px]'>
						Your trusted source for customizable blank clothing
					</PrimaryText>
				</Container>
			</header>
			<Layout>
				<SectionLayout categoryData={categoryData?.doc}>
					<BannerSlider bannerData={bannerData?.doc} />
					<ProductGrid products={productData?.doc ?? []} />
				</SectionLayout>
				<Subscription />
			</Layout>

			{/* <Footer /> */}
		</Flex>
	);
};

export default Home;

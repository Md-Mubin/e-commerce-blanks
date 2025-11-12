import { SingleCategoryPage } from '@/components';
import { getAll } from '@/lib/ssr';

type CategoryPageProps = {
	params: Promise<{ slug: string }>;
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
};
const Page = async ({ params, searchParams }: CategoryPageProps) => {
	const categoryData = await getAll({ path: 'categories' });
	const resolvedParams = await params;
	const resolvedSearchParams = await searchParams;
	const categoryId = resolvedParams.slug.split('_')[1];
	const sizeFilter =
		resolvedSearchParams?.SIZE || resolvedSearchParams?.size || '';
	const sortVal = resolvedSearchParams?.sort || '-createdAt';
	const searchVal = resolvedSearchParams?.search || '';
	const pageVal = Number(resolvedSearchParams?.page) || 1;
	const limitVal = Number(resolvedSearchParams?.limit) || 4;
	// ✅ Extract price filters (support all patterns)
	const priceBtwn = resolvedSearchParams?.price_btwn || '';
	const priceGte = resolvedSearchParams?.price_gte || '';
	const priceLte = resolvedSearchParams?.price_lte || '';
	
	// ✅ Using backend filter syntax (category._id)
	const data = await getAll({
		path: 'products',
		filters: {
			category: categoryId,
			sort: sortVal,
			search: searchVal,
			page: pageVal,
			limit: limitVal,
			SIZE: sizeFilter ? sizeFilter : '',
			price_btwn: priceBtwn ? priceBtwn : '',
			price_gte: priceGte ? priceGte : '',
			price_lte: priceLte ? priceLte : '',
		},
	});
	// console.log('data of id cat:::', data?.doc);

	return (
		<SingleCategoryPage
			products={data?.doc || []}
			sortValue={sortVal}
			searchValue={searchVal}
			categoryData={categoryData?.doc}
			pagination={{
				page: pageVal,
				totalPages: data?.totalPages || 1,
				totalDocs: data?.totalDocs || 0,
				limit: limitVal,
				docsInPage: data?.docsInPage || 0,
			}}
		/>
	);
};

export default Page;

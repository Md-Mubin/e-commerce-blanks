export const fields = [
	'name',
	'description',
	'image',
	'priority',
	'status',
	'parentCategory',
	'isFeatured',
	'metaTitle',
	'metaDescription',
	'metaKeywords',
	'_id',
	'createdAt',
	'updatedAt',
];

export const tableFields = [
	'name',
	'description',
	'image',
	'priority',
	'status',
	'isFeatured',
	'metaTitle',
	'parentCategory',
	'metaDescription',
	'metaKeywords',
	'createdAt',
	'updatedAt',
];

export const formFields = [
	{
		sectionTitle: 'Category Details',
		fields: [
			'name',
			'parentCategory',
			'description',
			'image',
			'priority',
			'status',
			'isFeatured',
		],
	},
	{
		sectionTitle: 'SEO Details',
		fields: ['metaTitle', 'metaDescription', 'metaKeywords'],
	},
];
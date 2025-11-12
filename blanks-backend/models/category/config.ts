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

const route = {
	title: 'Categories',
	path: 'categories',
	button: {
		title: 'Add Category',
		isModal: true,
		layout: formFields,
	},
	fields: tableFields,

	menu: [
		{ type: 'view-modal', title: 'View', fields },
		{ type: 'view-item', title: 'Go To Post' },
		{
			title: 'Edit',
			type: 'edit-modal',
			layout: formFields,
		},

		{ type: 'delete', title: 'Delete' },
	],
};
const config = {
	fields,
	table: tableFields,
	form: formFields,
	route,
};

export default config;

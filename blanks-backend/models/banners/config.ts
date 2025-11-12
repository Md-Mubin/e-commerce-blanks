export const fields = [
	'name',
	'image',
	'images',
	'slug',
	'bannerPosition',
	'show',
	'bannerType',
	'link',
	'priority',
	'createdAt',
	'updatedAt',
];

export const tableFields = [
	'name',
	'image',
	'images',
	'slug',
	'bannerPosition',
	'show',
	'bannerType',
	'link',
	'priority',
	'createdAt',
	'updatedAt',
];

export const formFields = [
	{
		sectionTitle: 'Banner Basic',
		fields: [
			'image',
			'name',
			'slug',
			'bannerType',
			'bannerPosition',
			'link',
			'priority',
			'images',
		],
	},
	{
		sectionTitle: 'Banner Show/Hide',
		fields: ['show'],
	},
];

const route = {
	title: 'Banner Managemet',
	subTitle: 'Manage your banners here',
	path: 'banners',
	button: {
		title: 'Add Banner',
		isModal: true,
	},

	menu: [
		{ type: 'view-server-modal', title: 'View' },
		{ type: 'view-item', title: 'Go To Post' },
		{
			title: 'Edit Details',
			type: 'edit-server-modal',
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

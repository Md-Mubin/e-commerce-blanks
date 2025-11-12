import Category from './category.model.js';
const settings: any = {
	name: {
		title: 'Name',
		type: 'string',
		sort: false,
		search: true,
		edit: true,
		trim: true,
		schema: {
			sort: true,
			default: true,
		},
	},

	parentCategory: {
		edit: true,
		sort: true,
		title: 'Parent Category',
		type: 'string',
		populate: {
			path: 'parentCategory',
			select: 'name',
		},
		filter: {
			name: 'parentCategory',
			field: 'parentCategory_in',
			type: 'multi-select',
			label: 'Parent Category',
			title: 'Sort by parent category',
			category: 'model',
			model: Category,
			key: 'name',
		},
		schema: {
			type: 'data-menu',
			tableType: 'string',
			tableKey: 'parentCategory.name',
			model: 'categorys', // categories
			sort: true,
			displayInTable: true,
		},
	},
	description: {
		title: 'Description',
		type: 'string',
		sort: false,
		search: true,
		edit: true,
		trim: true,
		schema: {
			type: 'textarea',
			sort: false,
			default: false,
		},
	},

	image: {
		title: 'Image',
		type: 'string',
		sort: false,
		search: true,
		edit: true,
		trim: true,
		schema: {
			type: 'image',
			sort: false,
			default: false,
		},
	},
	priority: {
		title: 'Priority',
		type: 'number',
		sort: false,
		search: false,
		edit: true,
		schema: {
			sort: false,
			default: true,
		},
	},
	status: {
		title: 'Status',
		type: 'string',
		sort: true,
		search: true,
		edit: true,
		filter: {
			name: 'status',
			field: 'status_in',
			type: 'multi-select',
			label: 'Status',
			title: 'Filter by Status',
			options: [
				{
					label: 'Active',
					value: 'active',
				},
				{
					label: 'Inactive',
					value: 'inactive',
				},
			],
		},
		schema: {
			type: 'select',
			options: [
				{
					label: 'Active',
					value: 'active',
				},
				{
					label: 'Inactive',
					value: 'inactive',
				},
			],
		},
	},
	isFeatured: {
		title: 'Is featured',
		type: 'boolean',
		sort: true,
		search: false,
		edit: true,
		filter: {
			name: 'isFeatured',
			type: 'boolean',
			label: 'Is featured',
			title: 'Filter by Is featured',
		},
		schema: {
			sort: false,
			default: false,
		},
	},
	metaTitle: {
		title: 'Meta title',
		type: 'string',
		sort: false,
		search: true,
		edit: true,
		trim: true,
		schema: {
			sort: false,
			default: false,
		},
	},
	metaDescription: {
		title: 'Meta description',
		type: 'string',
		sort: false,
		search: true,
		edit: true,
		trim: true,
		schema: {
			sort: false,
			default: false,
		},
	},
	metaKeywords: {
		title: 'Meta keywords',
		type: 'array',
		sort: false,
		search: false,
		edit: true,
		schema: {
			type: 'tag',
			sort: false,
			default: false,
		},
	},
	createdAt: {
		title: 'Created at',
		type: 'date',
		sort: true,
		search: false,
		edit: true,
		filter: {
			name: 'createdAt',
			type: 'date',
			label: 'Created at',
			title: 'Filter by Created at',
		},
		schema: {
			type: 'date',
			tableType: 'date-only',
		},
	},
};

export default settings;

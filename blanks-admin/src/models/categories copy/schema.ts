import { SchemaProps } from '@/components/library';

const schema: SchemaProps = {
	image: {
		type: 'image',
		label: 'Image',
	},
	name: {
		isRequired: true,
		type: 'string',
		label: 'Name',
		inputLabel: 'Product Name',
		sort: true,
		tableType: 'image-text',
		imageKey: 'image',
		default: true,
		displayInTable: true,
	},
	// not required
	parentCategory: {
		type: 'data-menu',
		label: 'Parent Category',
		sort: true,
		tableKey: 'parentCategory.name',
		tableType: 'string',
		displayInTable: true,
		model: 'categories',
	},

	slug: {
		label: 'Slug',
		type: 'slug',
		tableType: 'text',
		displayInTable: true,
		sort: true,
		readOnlyOnUpdate: true,
		helperText:
			'This text will be used as part of the URL for this category. Leave it empty to auto-generate.',
	},
	products: {
		label: 'Products',
		type: 'number',
		displayInTable: true,
		default: true,
	},
	shortDescription: {
		label: 'Description',
		type: 'textarea',
	},
	longDescription: {
		label: 'Long Description',
		type: 'textarea',
	},

	priority: {
		label: 'Priority',
		type: 'number',
		displayInTable: true,
		default: true,
	},
	isActive: {
		label: 'Is Active',
		type: 'checkbox',
		displayInTable: true,
		colorScheme: (isActive: boolean) => (isActive ? 'green' : 'red'),
	},
	isFeatured: {
		label: 'Is Featured',
		type: 'checkbox',
		default: true,
		displayInTable: true,
		colorScheme: (isActive: boolean) => (isActive ? 'green' : 'red'),
	},

	displayInHomePage: {
		label: 'Display In Home Page',
		type: 'checkbox',
		displayInTable: true,
		colorScheme: (isActive: boolean) => (isActive ? 'green' : 'red'),
	},

	displayInMenu: {
		label: 'Display In Menu',
		type: 'checkbox',
		displayInTable: true,
		default: true,
		colorScheme: (isActive: boolean) => (isActive ? 'green' : 'red'),
	},
	createdAt: {
		label: 'Created At',
		type: 'date',
		default: true,
		displayInTable: true,
	},
	metaKeywords: {
		label: 'Meta Keywords',
		isRequired: false,
		type: 'tag',
	},
	'meta.title': {
		label: 'Meta Title',
		type: 'text',
	},
	'meta.description': {
		label: 'Meta Description',
		type: 'textarea',
	},
	metaImage: {
		label: 'Meta Image',
		type: 'image',
	},
};

export default schema;

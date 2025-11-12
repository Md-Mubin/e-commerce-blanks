import Category from '../category/category.model.js';
import Brand from '../brand/brand.model.js';

const settings: any = {
	name: {
		type: 'string',
		required: true,
		title: 'Name',
		edit: true,
		search: true,
		unique: true,
	},
	description: {
		type: 'string',
		title: 'Long Descripion',
		edit: true,
	},
	shortDescription: {
		type: 'string',
		title: 'Short Description',
		edit: true,
	},
	variations: {
		type: 'array-object',
		title: 'Variations',
		edit: true,
	},
	discountTiers: {
		type: 'array-object',
		title: 'Discount Tiers',
		edit: true,
	},

	category: {
		edit: true,
		sort: true,
		title: 'Category',
		type: 'string',
		required: true,
		populate: {
			path: 'category',
			select: 'name',
		},

		filter: {
			name: 'category',
			field: 'category_in',
			type: 'multi-select',
			label: 'Category',
			title: 'Sort by category',
			options: [],
			category: 'model',
			model: Category,
			key: 'name',
		},
	},
	brand: {
		edit: true,
		sort: true,
		title: 'Brand',
		type: 'string',

		populate: {
			path: 'brand',
			select: 'name',
		},

		filter: {
			name: 'brand',
			field: 'brand_in',
			type: 'multi-select',
			label: 'Brand',
			title: 'Sort by Brand',
			category: 'model',
			model: Brand,
			key: 'name',
		},
	},
	image: {
		type: 'uri',
		title: 'Image',
		edit: true,
	},

	images: {
		type: 'array-string',
		title: 'Image',
		edit: true,
	},

	tags: {
		type: 'array-string',
		title: 'Tags',
		edit: true,
	},

	customAttributes: {
		type: 'array-object',
		title: 'Custom Attributes',
		edit: true,
	},

	faq: {
		type: 'array-object',
		title: 'Custom Attributes',
		edit: true,
	},

	stock: {
		type: 'number',
		title: 'Stock',
		edit: true,
		sort: true,
		filter: {
			name: 'Stock',
			field: 'stock',
			type: 'range',
			label: 'Stock',
			title: 'Sort by stock',
		},
	},

	damage: {
		type: 'number',
		title: 'Damage',
		edit: true,
		sort: true,
	},

	lowStockAlert: {
		type: 'number',
		title: 'Low Stock Alert',
		edit: true,
		sort: true,
	},
	cost: {
		type: 'number',
		title: 'Cost Price',
		required: true,
		edit: true,
		sort: true,
		filter: {
			name: 'cost',
			field: 'cost',
			type: 'range',
			label: 'Cost',
			title: 'Sort by cost price',
		},
	},

	price: {
		type: 'number',
		title: 'Price',
		required: true,
		edit: true,
		sort: true,
		filter: {
			name: 'Price',
			field: 'price',
			type: 'range',
			label: 'Price',
			title: 'Sort by price',
		},
	},

	isActive: {
		type: 'boolean',
		edit: true,
		title: 'Active Status',
		sort: true,
		filter: {
			name: 'active',
			field: 'isActive',
			type: 'boolean',
			label: 'Active',
			title: 'Sort by active',
		},
	},
	isDiscount: {
		type: 'boolean',
		edit: true,
		title: 'Discount',
		sort: true,
		filter: {
			name: 'Discount',
			field: 'isDiscount',
			type: 'boolean',
			label: 'Discount',
			title: 'Sort by discount',
		},
	},
	status: {
		type: 'string',
		title: 'Status',
		edit: true,
		sort: true,
		filter: {
			name: 'Status',
			field: 'status',
			type: 'multi-select',
			label: 'Status',
			title: 'Sort by status',
			options: [
				{
					label: 'Published',
					value: 'published',
				},
				{
					label: 'Draft',
					value: 'draft',
				},
				{
					label: 'Archived',
					value: 'archived',
				},
			],
		},
	},
	discountType: {
		type: 'string',
		title: 'Discount Type',
		edit: true,
		sort: true,
		filter: {
			name: 'discountType',
			field: 'discountType',
			type: 'multi-select',
			label: 'Discount Type',
			title: 'Sort by discount type',
			options: [
				{
					label: 'Percentage',
					value: 'percentage',
				},
				{
					label: 'Flat',
					value: 'flat',
				},
			],
		},
	},
	discount: {
		type: 'number',
		title: 'Discounted Price',
		edit: true,
		sort: true,
		filter: {
			name: 'Discount',
			field: 'discount',
			type: 'boolean',
			label: 'Discount',
			title: 'Sort by discount',
		},
	},
	isFeatured: {
		type: 'boolean',
		title: 'Featured',
		edit: true,
		sort: true,
		filter: {
			name: 'Featured',
			field: 'isFeatured',
			type: 'boolean',
			label: 'Featured',
			title: 'Sort by featured',
		},
	},
	sku: {
		type: 'string',
		title: 'SKU',
		edit: true,
		search: true,
		sort: true,
	},
	barcode: {
		type: 'string',
		title: 'Barcode',
		edit: true,
		search: true,
	},
	slug: {
		type: 'string',
		title: 'Slug',
		edit: true,
		unique: true,
		search: true,
	},

	unit: {
		type: 'string',
		title: 'Unit',
		edit: true,
	},

	unitValue: {
		type: 'number',
		title: 'Unit Value',
		edit: true,
	},

	vat: {
		type: 'number',
		title: 'VAT',
		edit: true,
	},

	isDeleted: {
		type: 'boolean',
		title: 'Deleted',
	},
	isVisible: {
		type: 'boolean',
		title: 'Visible',
	},
	createdAt: {
		type: 'string',
		title: 'Created At',
		sort: true,
		filter: {
			name: 'Created At',
			field: 'createdAt',
			type: 'date',
			label: 'Created At',
			title: 'Sort by created at',
		},
	},
	weight: { 	
		title: 'Weight',
		type: 'number',
		sort: false,
		search: false,
		edit: true,
		schema: {},
	},
	length: {
		title: 'Dimensions Length',
		type: 'number',
		sort: false,
		search: false,
		edit: true,
		schema: {},
	},
	width: {
		title: 'Dimensions Width',
		type: 'number',
		sort: false,
		search: false,
		edit: true,
		schema: {},
	},
	height: {
		title: 'Dimensions Height',
		type: 'number',
		sort: false,
		search: false,
		edit: true,
		schema: {},
	},
	meta: {
		title: 'Meta',
		type: 'object',
		edit: true,
	},
	metaImage: {
		type: 'uri',
		title: 'Image',
		edit: true,
	},

	metaKeywords: {
		type: 'array-string',
		title: 'Tags',
		edit: true,
	},
};

export default settings;

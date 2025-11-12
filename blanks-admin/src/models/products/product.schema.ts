import { convertToFormFields } from '@/components/library';
import { createBrandModel } from '../brand/brand.model';
// import productUnitOptions from '../util/productUnitOptions';
import categorySchema from '@/models/categories/schema';

const categoryScehma = convertToFormFields({
	schema: categorySchema,
	layout: [
		{
			sectionTitle: 'Category Details',
			fields: ['name'],
		},
	],
});
const schema = {
	image: { label: 'Thumbnail', type: 'image' },
	images: { label: 'Images', type: 'image-array', limit: 6 },
	metaImage: { label: 'Meta Image', type: 'image' },

	name: {
		isRequired: true,
		type: 'text',
		label: 'Product Name',
		sort: true,
		tableType: 'image-text',
		imageKey: 'image',
		displayInTable: true,
	},

	shortDescription: { label: 'Short Description', type: 'textarea' },
	description: { label: 'Description', type: 'textarea' },

	category: {
		label: 'Category',
		isRequired: true,
		type: 'data-menu',
		model: 'categories',
		displayInTable: true,
		tableKey: 'category.name',
		tableType: 'text',
		dataModel: categoryScehma,
	},
	brand: {
		label: 'Brand',
		type: 'data-menu',
		model: 'brands',
		displayInTable: true,
		tableKey: 'brand.name',
		tableType: 'text',
		dataModel: createBrandModel,
	},

	cost: {
		label: 'Cost Price',
		type: 'number',
		required: true,
		displayInTable: true,
	},
	price: {
		label: 'Price',
		type: 'number',
		required: true,
		displayInTable: true,
	},

	stock: { label: 'Stock', type: 'number', displayInTable: true },
	damage: { label: 'Damage', type: 'number' },
	lowStockAlert: { label: 'Low Stock Alert', type: 'number' },

	variations: {
		label: 'Product Variations',
		type: 'section-data-array',
		section: {
			title: 'Variations',
			addBtnText: 'Add Variation',
			display: { title: 'name', description: 'price' },
			dataModel: [
				{ name: 'name', label: 'Name', type: 'text', isRequired: true },
				{ name: 'description', label: 'Description', type: 'textarea' },
				{ name: 'sku', label: 'SKU', type: 'text' },
				{ name: 'price', label: 'Price', type: 'number', isRequired: true },
				{ name: 'cost', label: 'Cost', type: 'number' },
				{ name: 'stock', label: 'Stock', type: 'number' },
				{ name: 'lowStockAlert', label: 'Low Stock Alert', type: 'number' },
				{ name: 'images', label: 'Images', type: 'image-array', limit: 6 },
				// {
				// 	name: 'warehouseInventory',
				// 	label: 'Warehouse Inventory',
				// 	type: 'section-data-array',
				// 	section: {
				// 		addBtnText: 'Add Warehouse Stock',
				// 		title: 'Warehouse Inventory',
				// 		display: { title: 'warehouse', description: 'stock' },
				// 		dataModel: [
				// 			{
				// 				name: 'warehouse',
				// 				label: 'Warehouse',
				// 				type: 'data-menu',
				// 				model: 'warehouse',
				// 			},
				// 			{
				// 				name: 'stock',
				// 				label: 'Stock',
				// 				type: 'number',
				// 				isRequired: true,
				// 			},
				// 			{
				// 				name: 'reservedStock',
				// 				label: 'Reserved Stock',
				// 				type: 'number',
				// 			},
				// 			{
				// 				name: 'lowStockAlert',
				// 				label: 'Low Stock Alert',
				// 				type: 'number',
				// 			},
				// 		],
				// 	},
				// },
				{
					name: 'discountTiers',
					label: 'Bulk Discount',
					type: 'section-data-array',
					section: {
						title: 'Discount Tiers',
						addBtnText: 'Add Discount Tier',
						display: { title: 'minQuantity', description: 'discountValue' },
						dataModel: [
							{
								name: 'minQuantity',
								label: 'Min Quantity',
								type: 'number',
								isRequired: true,
							},
							{
								name: 'maxQuantity',
								label: 'Max Quantity',
								type: 'number',
								isRequired: true,
							},
							{
								name: 'price',
								label: 'Price',
								type: 'number',
								isRequired: true,
							},
						],
					},
				},
				{
					name: 'attributes',
					label: 'Attributes',
					type: 'custom-attribute',
				},
			],
		},
	},

	discountTiers: {
		label: 'Bulk Discounts',
		type: 'section-data-array',
		section: {
			title: 'Discount Tiers',
			addBtnText: 'Add Discount Tier',
			display: { title: 'minQuantity', description: 'discountValue' },
			dataModel: [
				{
					name: 'minQuantity',
					label: 'Min Quantity',
					type: 'number',
					isRequired: true,
				},
				{
					name: 'maxQuantity',
					label: 'Max Quantity',
					type: 'number',
					isRequired: true,
				},
				{
					name: 'price',
					label: 'Price',
					type: 'number',
					isRequired: true,
				},
			],
		},
	},

	isFeatured: { label: 'Featured', type: 'checkbox', displayInTable: true },
	isVisible: { label: 'Visible', type: 'checkbox', displayInTable: true },
	status: {
		label: 'Status',
		type: 'select',
		options: [
			{ label: 'Draft', value: 'draft' },
			{ label: 'Published', value: 'published' },
			{ label: 'Archived', value: 'archived' },
		],
		displayInTable: true,
	},

	tags: { label: 'Tags', type: 'tag' },
	metaKeywords: { label: 'Meta Keywords', type: 'tag' },
	'meta.title': { label: 'Meta Title', type: 'text' },
	'meta.description': { label: 'Meta Description', type: 'textarea' },

	weight: {
		label: 'Weight (kg)',
		type: 'number',
	},
	width: {
		label: 'Dimensions Length',
		type: 'number',
	},
	length: {
		label: 'Dimensions Width',
		type: 'number',
	},
	height: {
		label: 'Dimensions Height',
		type: 'number',
	},

	customAttributes: { label: 'Custom Attributes', type: 'custom-attribute' },
	faq: {
		label: 'FAQs',
		type: 'custom-section-array',
		section: { addBtnText: 'Add FAQ', title: 'FAQs' },
	},

	vat: { label: 'VAT %', type: 'number' },
	createdAt: { label: 'Created At', type: 'date', sort: true },
};

export default schema;

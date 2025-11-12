'use client';

import {
	convertToTableFields,
	convertToViewFields,
	createFormFields,
	TableObjectProps,
} from '@/components/library';
import schema from './product.schema';
import multiSelectMenu from './data/multiSelect';
import itemMenu from './data/itemMenu';

const layout = [
	{
		sectionTitle: 'Product Information',
		fields: ['image', 'name', 'status'],
	},
	{
		sectionTitle: 'Product Description',
		fields: [
			'category',
			'brand',
			'slug',
			'shortDescription',
			'tags',
			['cost', 'price'],
			'vat',
			['unitValue', 'unit'],
			['sku', 'barcode'],
			['isFeatured'],
		],
	},
	{
		sectionTitle: 'Stock Information',
		fields: [['stock', 'lowStockAlert']],
	},
	{
		sectionTitle: 'Discount Information',
		fields: ['isDiscount', ['discountType', 'discount']],
	},

	{
		sectionTitle: 'Detailed Description',
		fields: ['description'],
	},
	{
		sectionTitle: 'Media',
		fields: ['images'],
	},
	{
		sectionTitle: 'Product Variations',
		description: 'Add variations for this product',
		fields: ['variations'],
	},
	{
		sectionTitle: 'Custom Fields',
		fields: ['customAttributes', 'customSections'],
	},
	{
		sectionTitle: 'Frequently Asked Questions',
		fields: ['faq'],
	},
	{
		sectionTitle: 'SEO',
		description: 'SEO settings for this product',
		fields: ['metaImage', 'meta.title', 'meta.description', 'metaKeywords'],
	},
];

const tableLayout: any[] = [
	'name',
	'price',
	'cost',
	'category',
	'brand',
	'vat',
	'isActive',
	'slug',
	'status',
	//
	'stock',
	'sku',
	'isFeatured',
	'isDiscount',
	'discount',
	'createdAt',
	'faq',
];

const createProductFormFields = createFormFields({ schema, layout });
export const viewAllDataFields = convertToTableFields({ schema, fields: tableLayout });
export const viewPreviewFields = convertToViewFields({ schema });

export const viewProductFields = convertToViewFields({ schema });

const form = {
	type: 'add',
	title: 'Add New Product',
	path: 'products',
	fields: createProductFormFields,
};

const updateForm = {
	type: 'add',
	title: 'Update Product Details',
	path: 'products',
	fields: createProductFormFields,
};

const viewAll: TableObjectProps = {
	title: 'Products',
	path: 'products',
	export: true,
	select: {
		show: true,
		menu: multiSelectMenu,
	},
	button: {
		title: 'Add Product',
		path: '/products/create',
	},
	menu: itemMenu,
	data: viewAllDataFields,
};

export { form as formTable, viewAll as viewAll, updateForm };

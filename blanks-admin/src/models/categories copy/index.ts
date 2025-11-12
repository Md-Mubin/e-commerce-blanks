import {
	convertToTableFields,
	convertToViewFields,
	createFormFields,
	TableObjectProps,
} from '@/components/library';

export { default as edit } from './editCategories.model';
export { default as create } from './editCategories.model';
// export { default as getAll } from './getAllCategories.model';
export { default as getById } from './getCategoryById.model';
export { default as createModal } from './editCategories.model';

import schema from './schema';
import categoriesSelectMenu from './categoriesSelectMenu';

const createLayout = [
	{
		sectionTitle: 'Category Details',

		fields: ['image', 'name', 'slug'],
	},
	{
		sectionTitle: 'Description',
		fields: ['shortDescription'],
	},
	{
		sectionTitle: 'Parent Category',
		fields: ['parentCategory'],
	},
	{
		sectionTitle: 'Display Settings',
		description: 'Select the display settings for this category',
		fields: [
			'priority',
			['isActive', 'isFeatured'],
			['displayInMenu', 'displayInHomePage'],
		],
	},
	{
		sectionTitle: 'SEO',
		description: 'SEO settings for this category',
		fields: ['metaImage', 'meta.title', 'meta.description', 'metaKeywords'],
	},
];

const tableFields = [
	'name',
	'slug',
	// 'products',
	'parentCategory',
	'priority',
	'isActive',
	'displayInHomePage',
	'displayInMenu',
	'isFeatured',
	'createdAt',
];

const createModel = createFormFields({ schema, layout: createLayout });
const editModel = createFormFields({
	schema,
	layout: createLayout,
	type: 'update',
});
const viewFields = convertToTableFields({ schema, fields: tableFields });

const getAll: TableObjectProps = {
	title: 'Categories',
	path: 'categories',
	export: true,
	filters: true,

	select: {
		show: true,
		menu: categoriesSelectMenu,
	},

	button: {
		title: 'Add Category',
		isModal: true,
		dataModel: createModel,
		prompt: {
			title: 'Add New Category',
			successMsg: 'Category Added Successfully',
		},
	},

	menu: [
		{
			title: 'Edit',
			type: 'edit-modal',
			dataModel: editModel,
		},
		{
			title: 'View',
			type: 'view-modal',
			dataModel: convertToViewFields({ schema }),
		},
		{
			title: 'Mark as Active',
			type: 'update-api',
			body: {
				isActive: true,
			},
			prompt: {
				title: 'Mark as Active',
				body: 'Are you sure you want to mark this category as active?',
				successMsg: 'Category marked as active successfully',
			},
			renderCondition: (data: any) => !data.isActive,
		},
		{
			title: 'Mark as Inactive',
			type: 'update-api',
			body: {
				isActive: false,
			},
			prompt: {
				title: 'Mark as Inactive',
				body: 'Are you sure you want to mark this category as inactive?',
				successMsg: 'Category marked as inactive successfully',
			},
			renderCondition: (data: any) => data.isActive,
		},
		{
			title: 'Mark as Featured',
			type: 'update-api',
			body: {
				isFeatured: true,
			},
			prompt: {
				title: 'Mark as Featured',
				body: 'Are you sure you want to mark this category as featured?',
				successMsg: 'Category marked as featured successfully',
			},
			renderCondition: (data: any) => !data.isFeatured,
		},
		{
			title: 'Unfeature Category',
			type: 'update-api',
			body: {
				isFeatured: false,
			},
			prompt: {
				title: 'Unfeature Category',
				body: 'Are you sure you want to un-feature this category?',
				successMsg: 'Category marked as unfeatured',
			},
			renderCondition: (data: any) => data.isFeatured,
		},
		{
			title: 'Update priority',
			type: 'update-key',
			key: 'priority',
			prompt: {
				title: 'Update Priority',
				body: 'Please enter the new priority for this category',
				successMsg: 'Priority updated successfully',
			},
			keyType: 'number',
		},
		{
			title: 'Update Name',
			type: 'update-key',
			key: 'name',
			prompt: {
				title: 'Update Name',
				body: 'Please enter the new name for this category',
				successMsg: 'Name updated successfully',
			},
			keyType: 'string',
		},
		{
			title: 'Delete',
			type: 'delete',
			prompt: {
				title: 'Delete Category',
				body: 'Are you sure you want to delete this category?',
				successMsg: 'Category deleted successfully',
			},
		},
	],

	data: viewFields,
};

export { getAll };

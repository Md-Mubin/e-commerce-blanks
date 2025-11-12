'use client';
import React from 'react';
import { NextPage } from 'next';
import {
	BackendPageTable,
	BackendTableObjectProps,
} from '@/components/library';
import { formFields, fields, tableFields } from './config';

const table: BackendTableObjectProps = {
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

const CategoryPage: NextPage = () => {
	return <BackendPageTable table={table} />;
};

export default CategoryPage;

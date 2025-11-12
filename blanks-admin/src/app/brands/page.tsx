'use client';
import React from 'react';
import { NextPage } from 'next';
import { FormLayout, BackendPageTable, BackendTableObjectProps } from '@/components/library';

const formLayout: FormLayout = [
	{
		sectionTitle: 'Brand Details',
		fields: ['image', 'name'],
	},
	{
		sectionTitle: 'Description',
		fields: ['description', 'tags'],
	},
];

const brandsTable: BackendTableObjectProps = {
	title: 'Brands',
	path: 'brands',
	export: true,

	button: {
		title: 'Add Brand',
		isModal: true,
		layout: formLayout,
	},
	fields: ['name', 'description', 'createdAt'],

	menu: [
		{
			type: 'edit-modal',
			title: 'Edit',
			layout: formLayout,
		},

		{ type: 'view-modal', title: 'View', fields: ['name', 'description', 'tags', 'createdAt'] },
	],
};

const BrandPage: NextPage = () => {
	return <BackendPageTable table={brandsTable} />;
};

export default BrandPage;

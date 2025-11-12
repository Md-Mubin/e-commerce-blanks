'use client';
import React from 'react';
import { NextPage } from 'next';
import {
	convertToFormFields,
	convertToTableFields,
	convertToViewFields,
	PageTable,
	TableObjectProps,
} from '@/components/library';
import schema from '@/models/coupons/coupons.schema';

const fields = [
	'name',
	'description',
	'code',
	'isActive',
	'isFlat',
	'percentage',
	'maxUse',
	'maxAmount',
	'minOrderValue',
	'validFrom',
	'validTill',
];

const tableFields = convertToTableFields({
	schema,
	fields: [
		'name',
		'code',
		'isActive',
		'isFlat',
		'maxAmount',
		'minOrderValue',
		'validFrom',
		'validTill',
	],
});

const viewFields = convertToViewFields({
	schema,
	fields,
});

const formFields = convertToFormFields({
	schema: schema,
	layout: [
		{
			sectionTitle: 'Basic Information',
			fields: ['name', 'code', 'description', ['isActive', 'maxUse']],
		},
		{
			sectionTitle: 'Discount Information',
			fields: ['isFlat', 'percentage', ['maxAmount', 'minOrderValue'], ['validFrom', 'validTill']],
		},
	],
});

const editFields = convertToFormFields({
	schema: schema,
	layout: [
		{
			sectionTitle: 'Basic Information',
			fields: ['name', 'description', ['isActive', 'maxUse']],
		},
		{
			sectionTitle: 'Discount Information',
			fields: [
				['maxAmount', 'minOrderValue'],
				['validFrom', 'validTill'],
			],
		},
	],
});

const table: TableObjectProps = {
	path: 'coupons',
	title: 'Coupons',
	data: tableFields,
	isModal: true,
	createModel: formFields,
	button: {
		title: 'Add Coupon',
	},
	menu: [
		{
			title: 'View',
			type: 'view-modal',
			dataModel: viewFields,
		},
		{
			title: 'Edit',
			type: 'edit-modal',
			dataModel: editFields,
		},
	],
};

const page: NextPage = () => {
	return <PageTable table={table} />;
};

export default page;

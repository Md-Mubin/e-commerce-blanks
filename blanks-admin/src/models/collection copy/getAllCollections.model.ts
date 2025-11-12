import { TableObjectProps } from '@/components/library';
import createCollection from './createCollection.model';
import getCollectionById from './getCollectionById.model';
import menuSelect from './data/menuSelect';

const viewCollections: TableObjectProps = {
	title: 'Product Collections',
	path: 'collections',
	isModal: true,
	createModel: createCollection,
	export: false,

	button: {
		title: 'Add Collection',
	},
	select: {
		show: true,
		menu: menuSelect,
	},
	menu: [
		{
			title: 'Edit',
			type: 'edit-modal',
			dataModel: createCollection,
		},

		{
			title: 'View',
			type: 'view-modal',
			dataModel: getCollectionById,
		},
		{
			type: 'update-api',
			title: 'Mark as Inactive',
			path: 'collections',
			id: (data: any) => data?._id,
			body: { isActive: false },
			renderCondition: (data: any) => data?.isActive,
			prompt: {
				title: 'Mark as Inactive',
				body: 'Are you sure you want to mark this collection as inactive, this will hide the collection from all collections page on the website?',
				btnText: 'Proceed',
				successMsg: 'Collection hidden successfully',
			},
		},
		{
			type: 'update-api',
			title: 'Mark as Active',
			path: 'collections',
			id: (data: any) => data?._id,
			body: { isActive: true },
			renderCondition: (data: any) => !data?.isActive,
			prompt: {
				title: 'Mark as Active',
				body: 'Are you sure you want to mark this collection as active, this will show the collection from all collections page on the website?',
				btnText: 'Proceed',
				successMsg: 'Collection is made visible successfully',
			},
		},
	],

	data: [
		{
			title: 'Name',
			dataKey: 'name',
			sort: 'name',
			// type: 'image-text',
			// imageKey: 'image',
			default: true,
		},
		// {
		// 	title: 'Key',
		// 	dataKey: 'dataKey',
		// 	sort: 'dataKey',
		// 	default: true,
		// },
		{
			title: 'isActive',
			dataKey: 'isActive',
			type: 'tag',
			sort: 'isActive',
			default: true,
			colorScheme: (isActive: boolean) => (isActive ? 'green' : 'red'),
		},
		{
			title: 'Display In Home',
			dataKey: 'displayInHome',
			type: 'tag',
			sort: 'displayInHome',
			colorScheme: (isActive: boolean) => (isActive ? 'green' : 'red'),
		},
		{
			title: 'Display In Menu',
			dataKey: 'displayInMenu',
			type: 'tag',
			sort: 'displayInMenu',
			colorScheme: (isActive: boolean) => (isActive ? 'green' : 'red'),
		},
		{
			title: 'Priority',
			dataKey: 'priority',
			sort: 'priority',
		},
		{ title: 'Created', dataKey: 'createdAt', type: 'date', sort: 'createdAt' },
		{ title: '...', type: 'menu' },
	],
};

export default viewCollections;

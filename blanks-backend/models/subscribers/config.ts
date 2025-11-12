export const fields = ['email', 'createdAt', 'updatedAt'];

export const tableFields = ['email', 'createdAt', 'updatedAt'];

export const formFields = [
	{
		sectionTitle: 'Banner Basic',
		fields: ['email'],
	},
];

const route = {
	title: 'Subscribers',
	subTitle: 'Manage your subscribers here',
	path: 'subscribers',
	button: {
		title: 'Add Subscriber',
		isModal: true,
	},

	menu: [
		{ type: 'view-server-modal', title: 'View' },
		{ type: 'view-item', title: 'Go To Post' },
		{
			title: 'Edit Details',
			type: 'edit-server-modal',
		},

		{ type: 'delete', title: 'Delete' },
	],
};
const config = {
	fields,
	table: tableFields,
	form: formFields,
	route,
};

export default config;

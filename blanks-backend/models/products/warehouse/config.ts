const fields = [
	'name',
	'location.address',
	'location.city',
	'location.state',
	'location.country',
	'location.zipCode',
	'isActive',
	'createdAt',
	'updatedAt',
];
const tableFields = [
	'name',
	'location.address',
	'location.city',
	'location.state',
	'location.country',
	'location.zipCode',
	'isActive',
	'createdAt',
	'updatedAt',
];

const formFields = [
	{
		sectionTitle: 'Warehouse Info',
		fields: [
			['name', 'location.address'],
			['location.city', 'location.state'],
			['location.country', 'location.zipCode'],
			'isActive',
		],
	},
];
const route = {
	title: 'Warehouse Management',
	subTitle: 'Manage your warehouse here',
	path: 'warehouse',
	button: {
		title: 'Add Warehouse',
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
    route
};

export default config;
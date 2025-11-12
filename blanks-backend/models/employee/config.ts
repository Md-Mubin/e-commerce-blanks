const fields = [
	'name',
	'phone',
	'email',
	'password',
	// 'preferences',
	'role',
	'isActive',
	'joiningDate',
	'image',
	'nid',
	'nidImage',
	'createdAt',
	'updatedAt',
];
const tableFields = [
	'name',
	'phone',
	'email',
	'password',

	// 'preferences',
	'role',
	'isActive',

	'joiningDate',
	'image',
	'nid',
	'nidImage',

	'createdAt',
	'updatedAt',
];
const formFields = [
	{
		sectionTitle: 'Employee Info',
		fields: [
			['name', 'phone'],
			['email', 'password'],
			['role', 'isActive'],
			'joiningDate',
		],
	},

	{
		sectionTitle: 'Employee NID',
		fields: ['nid', 'nidImage'],
	},
	{
		sectionTitle: 'Employee Image',
		fields: ['image'],
	},
];

const route = {
	title: 'Employee Management',
	subTitle: 'Manage your employee here',
	path: 'employees',
	button: {
		title: 'Add Employee',
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

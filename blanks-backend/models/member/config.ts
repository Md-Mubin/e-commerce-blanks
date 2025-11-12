const fields = [
	'code',
	'name',
	'email',
	'phone',
	'gender',
	'age',
	'dateOfBirth',
	'height',
	'weight',
	'image',
	'status',
	'nid',
	'plan',
	'joiningDate',
	'address',
	'nidImage',
	'note',
	'createdAt',
	'updatedAt',
];
const tableFields = [
	'code',

	'name',
	'email',
	'phone',
	'gender',
	'age',
	'dateOfBirth',
	'height',
	'weight',

	'status',
	'plan',
	'joiningDate',
	'address',
	'note',

	'nid',
	'nidImage',

	'image',
	'createdAt',
	'updatedAt',
];

const formFields = [
	{
		sectionTitle: 'Member Info',
		fields: [
			['name', 'email'],
			['phone', 'gender'],
			['age', 'dateOfBirth'],
			['height', 'weight'],
		],
	},
	{
		sectionTitle: 'Member Details',
		fields: [['status', 'plan'], 'joiningDate', 'address', 'note'],
	},
	{
		sectionTitle: 'Member NID',
		fields: ['nid', 'nidImage'],
	},
	{
		sectionTitle: 'Member Image',
		fields: ['image'],
	},
];

const config = {
	fields,
	table: tableFields,
	form: formFields,
};

export default config;

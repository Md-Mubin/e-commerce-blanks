const settings: any = {
	code: {
		title: 'Code',
		type: 'string',
		sort: false,
		search: true,
		edit: true,
		schema: {},
	},
	name: {
		title: 'Name',
		type: 'string',
		sort: false,
		search: true,
		edit: true,
		required: true,
		trim: true,
		schema: {},
	},
	email: {
		title: 'Email',
		type: 'string',
		sort: false,
		search: true,
		edit: true,
		trim: true,
		schema: {},
	},
	phone: {
		title: 'Phone',
		type: 'string',
		sort: false,
		search: true,
		edit: true,
		required: true,
		trim: true,
		schema: {},
	},
	gender: {
		title: 'Gender',
		type: 'string',
		edit: true,
		required: true,
		filter: {
			name: 'gender',
			field: 'gender_in',
			type: 'multi-select',
			label: 'Gender',
			title: 'Filter by Gender',
			options: [
				{
					label: 'Male',
					value: 'male',
				},
				{
					label: 'Female',
					value: 'female',
				},
				{
					label: 'Others',
					value: 'others',
				},
			],
		},
		schema: {
			type: 'select',
			options: [
				{
					label: 'Male',
					value: 'male',
				},
				{
					label: 'Female',
					value: 'female',
				},
				{
					label: 'Others',
					value: 'others',
				},
			],
		},
	},
	age: {
		title: 'Age',
		type: 'number',
		sort: false,
		search: false,
		edit: true,
		filter: {
			name: 'dateOfageBirth',
			type: 'range',
			label: 'Age Filter',
			title: 'Filter By Age Range',
		},
		// schema: {
		// 	type: 'date',
		// 	tableType: 'string',
		// },
	},
	dateOfBirth: {
		title: 'Date of birth',
		type: 'date',
		sort: true,
		search: false,
		edit: true,
		filter: {
			name: 'dateOfBirth',
			type: 'date',
			label: 'Date of birth',
			title: 'Filter by Date of birth',
		},
		schema: {
			type: 'date-only',
			tableType: 'string',
		},
	},
	height: {
		title: 'Height',
		type: 'number',
		sort: false,
		search: false,
		edit: true,
		schema: {},
	},
	weight: {
		title: 'Weight',
		type: 'number',
		sort: false,
		search: false,
		edit: true,
		schema: {},
	},
	image: {
		title: 'Image',
		type: 'uri',
		sort: false,
		search: true,
		edit: true,
		schema: {
			type: 'image',
		},
	},
	status: {
		title: 'Status',
		type: 'string',
		edit: true,
		required: true,
		filter: {
			name: 'status',
			field: 'status_in',
			type: 'multi-select',
			label: 'Status',
			title: 'Filter by Status',
			options: [
				{
					label: 'Active',
					value: 'active',
				},
				{
					label: 'Inactive',
					value: 'inactive',
				},
			],
		},
		schema: {
			type: 'select',
			options: [
				{
					label: 'Active',
					value: 'active',
				},
				{
					label: 'Inactive',
					value: 'inactive',
				},
			],
		},
	},
	nid: {
		title: 'Nid',
		type: 'string',
		sort: false,
		search: true,
		edit: true,
		schema: {},
	},

	joiningDate: {
		title: 'Joining date',
		type: 'date',
		sort: true,
		search: false,
		edit: true,
		required: true,
		filter: {
			name: 'joiningDate',
			type: 'date',
			label: 'Joining date',
			title: 'Filter by Joining date',
		},
		schema: {
			type: 'date-only',
			tableType: 'string',
		},
	},
	address: {
		title: 'Address',
		type: 'string',
		sort: false,
		search: true,
		edit: true,
		schema: {
			type: 'textarea',
		},
	},
	nidImage: {
		title: 'Nid image',
		type: 'string',
		sort: false,
		search: true,
		edit: true,
		schema: {
			type: 'file',
		},
	},
	note: {
		title: 'Note',
		type: 'string',
		sort: false,
		search: true,
		edit: true,
		schema: {
			type: 'textarea',
		},
	},
	createdAt: {
		title: 'Created at',
		type: 'date',
		sort: true,
		search: false,
		edit: true,
		filter: {
			name: 'createdAt',
			type: 'date',
			label: 'Created at',
			title: 'Filter by Created at',
		},
		schema: {
			type: 'date-only',
			tableType: 'string',
		},
	},
};
export default settings;

const settings: any = {
	name: {
		title: 'Name',
		type: 'string',
		sort: false,
		search: true,
		edit: true,
		required: true,
		schema: {
			sort: true,
			default: true,
		},
	},
	image: {
		title: 'Image',
		type: 'uri',
		sort: false,
		search: true,
		edit: true,
		schema: {
			type: 'image',
			sort: false,
			default: false,
			displayInTable: false,
		},
	},
	images: {
		title: 'Images',
		type: 'array-string',
		sort: false,
		search: false,
		edit: true,
		// required: true,
		schema: {
			type: 'image-array',
			sort: false,
			default: false,
			displayInTable: false,
		},
	},
	slug: {
		title: 'Slug',
		type: 'string',
		edit: true,
		schema: {
			sort: false,
			default: false,
		},
	},
	bannerPosition: {
		title: 'Banner position',
		type: 'string',
		sort: true,
		// search: true,
		edit: true,
		required: true,
		filter: {
			name: 'bannerPosition',
			field: 'bannerPosition_in',
			type: 'multi-select',
			label: 'BannerPosition',
			title: 'Filter by BannerPosition',
			options: [
				{
					label: 'Hero',
					value: 'hero',
				},
				{
					label: 'Body',
					value: 'body',
				},
			],
		},
		schema: {
			type: 'select',
			options: [
				{
					label: 'Hero',
					value: 'hero',
				},
				{
					label: 'Body',
					value: 'body',
				},
			],
		},
	},
	show: {
		title: 'Show/Hide',
		type: 'boolean',
		sort: true,
		edit: true,
		filter: {
			name: 'show',
			type: 'boolean',
			label: 'Show',
			title: 'Filter by Show',
		},
		schema: {
			sort: false,
			default: true,
		},
	},
	// bannerType: {
	// 	title: 'Banner type',
	// 	type: 'string',
	// 	sort: false,
	// 	search: true,
	// 	edit: true,
	// 	required: true,
	// 	schema: {
	// 		sort: false,
	// 		default: false,
	// 	},
	// },
	bannerType: {
		title: 'Banner type',
		type: 'string',
		sort: true,
		search: true,
		edit: true,
		// required: true,
		filter: {
			name: 'bannerType',
			field: 'bannerType_in',
			type: 'multi-select',
			label: 'BannerType',
			title: 'Filter by BannerType',
			options: [
				{
					label: 'Image',
					value: 'image',
				},
				{
					label: 'Video',
					value: 'video',
				},
			],
		},
		schema: {
			type: 'select',
			options: [
				{
					label: 'Image',
					value: 'image',
				},
				{
					label: 'Video',
					value: 'video',
				},
			],
		},
	},
	link: {
		title: 'Video Link',
		type: 'string',
		sort: false,
		edit: true,
		// required: true,
		schema: {
			sort: false,
			default: false,
		},
	},
	priority: {
		title: 'Priority',
		type: 'number',
		sort: true,
		edit: true,
		required: true,
		schema: {
			sort: false,
			default: true,
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
			type: 'date',
			tableType: 'date-only',
		},
	},
};

export default settings;

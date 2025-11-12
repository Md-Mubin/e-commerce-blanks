// categoriesData.ts
// also think about how to navigate for all-categoryName not id? like 'all-t-shirts' not 100% cotton
export const categoriesData = [
	{
		_id: '1',
		name: 'T-shits',
		description: 'T-shits',
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	{
		_id: '2',
		name: 'Sweashirts & Hoodies',
		description: 'Sweashirts & Hoodies',
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	{
		_id: '3',
		name: 'Polo Shirts',
		description: 'Polo Shirts',
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	// Subcategories T-shirts
	{
		_id: '4',
		name: 'All T-shits',
		parentCategory: {
			_id: '1',
			name: 'T-shits',
		},
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	{
		_id: '5',
		name: '100% Cotton',
		parentCategory: {
			_id: '1',
			name: 'T-shits',
		},
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	{
		_id: '6',
		name: '100% Polyester',
		parentCategory: {
			_id: '1',
			name: 'T-shits',
		},
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	{
		_id: '7',
		name: 'Youth',
		parentCategory: {
			_id: '1',
			name: 'T-shits',
		},
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	// Subcategories of Sweashirts & Hoodies
	{
		_id: '8',
		name: 'All Sweashirts & Hoodies',
		parentCategory: {
			_id: '2',
			name: 'Sweashirts & Hoodies',
		},
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	{
		_id: '9',
		name: 'Hooded',
		parentCategory: {
			_id: '2',
			name: 'Sweashirts & Hoodies',
		},
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	{
		_id: '10',
		name: 'Full & Half Zips',
		parentCategory: {
			_id: '2',
			name: 'Sweashirts & Hoodies',
		},
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
];

export const brandsData = [
	{
		_id: '1',
		name: 'Gildan',
		// product quantity
		quantity: 12,
		description: 'Gildan',
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	{
		_id: '2',
		// product quantity
		quantity: 14,
		name: 'Next Level',
		description: 'Next Level',
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	{
		_id: '3',
		// product quantity
		quantity: 18,
		name: 'Threadfast',
		description: 'Threadfast',
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	{
		_id: '4',
		// product quantity
		quantity: 12,
		name: 'Team 365',
		description: 'Team 365',
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	{
		_id: '5',
		// product quantity
		quantity: 18,
		name: 'Rabbit Skins',
		description: 'Rabbit Skins',
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	{
		_id: '6',
		// product quantity
		quantity: 13,
		name: 'Champion',
		description: 'Champion',
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	// {
	// 	_id: '7',
	// 	// product quantity
	// 	quantity: 18,
	// 	name: 'View All',
	// 	description: 'View All',
	// 	priority: 0,
	// 	status: 'active',
	// 	isFeatured: false,
	// },
];
export const colorsData = [
	{ _id: '1', name: 'seagreen', quantity: 12 },
	{ _id: '2', name: 'crimson', quantity: 8 },
	{ _id: '3', name: 'royalblue', quantity: 15 },
	{ _id: '4', name: 'goldenrod', quantity: 10 },
	{ _id: '5', name: 'darkorchid', quantity: 5 },
	{ _id: '6', name: 'coral', quantity: 14 },
	{ _id: '7', name: 'forestgreen', quantity: 6 },
	{ _id: '8', name: 'steelblue', quantity: 9 },
	{ _id: '9', name: 'indigo', quantity: 4 },
	{ _id: '10', name: 'firebrick', quantity: 11 },
	{ _id: '11', name: 'slategray', quantity: 7 },
	{ _id: '12', name: 'chocolate', quantity: 13 },
	{ _id: '13', name: 'mediumvioletred', quantity: 3 },
	{ _id: '14', name: 'dodgerblue', quantity: 16 },
	{ _id: '15', name: 'teal', quantity: 12 },
	{ _id: '16', name: 'olive', quantity: 5 },
	{ _id: '17', name: 'peru', quantity: 9 },
	{ _id: '18', name: 'tomato', quantity: 8 },
	{ _id: '19', name: 'orchid', quantity: 10 },
	{ _id: '20', name: 'darkcyan', quantity: 14 },
];
// xs,s,m,l,xl,xxl
export const sizesData = [
	{ _id: '1', name: 'xs', quantity: 79 },
	{ _id: '2', name: 's', quantity: 78 },
	{ _id: '3', name: 'm', quantity: 78 },
	{ _id: '4', name: 'l', quantity: 77 },
	{ _id: '5', name: 'xl', quantity: 68 },
	{ _id: '6', name: 'xxl', quantity: 51 },
	// { _id: '7', name: 'XS', quantity: 40 },
	// { _id: '8', name: '4XL', quantity: 19 },
	// { _id: '9', name: '5XL', quantity: 9 },
	// { _id: '10', name: '2T', quantity: 1 },
	// { _id: '11', name: '2XT', quantity: 1 },
	// { _id: '12', name: '3T', quantity: 1 },
	// { _id: '13', name: '3XT', quantity: 1 },
	// { _id: '14', name: '4T', quantity: 1 },
	// { _id: '15', name: '5T', quantity: 1 },
	// { _id: '16', name: '6XL', quantity: 1 },
	// { _id: '17', name: 'LT', quantity: 1 },
	// { _id: '18', name: 'XLT', quantity: 1 },
];

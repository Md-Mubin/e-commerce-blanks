// navData.ts
export type NavItemType = {
	label: string;
	href: string;
	submenu?: NavItemType[];
};
export const navDataMobile = [
	{
		_id: '1',
		name: 'About Us',
		description: 'About Us',
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	{
		_id: '2',
		name: 'News & Updates',
		description: 'News & Updates',
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	{
		_id: '3',
		name: 'Help & Support',
		description: 'Help & Support',
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	// about
	{
		_id: '4',
		name: 'Sustainability',
		parentCategory: {
			_id: '1',
			name: 'About Us',
		},
		description: 'Sustainability',
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	{
		_id: '5',
		name: 'Privacy Policy',
		parentCategory: {
			_id: '1',
			name: 'About Us',
		},
		description: 'Privacy Policy',
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	{
		_id: '6',
		name: 'Terms & Conditions',
		parentCategory: {
			_id: '1',
			name: 'About Us',
		},
		description: 'Terms & Conditions',
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
	{
		_id: '7',
		name: 'User Agreement',
		parentCategory: {
			_id: '1',
			name: 'About Us',
		},
		description: 'User Agreement',
		priority: 0,
		status: 'active',
		isFeatured: false,
	},
];

export const navData: NavItemType[] = [
	{
		label: 'About Us',
		href: '/about-us',
		submenu: [
			{
				label: 'Privacy Policy',
				href: '/privacy-policy',
			},
			{ label: 'Terms & Conditions', href: '/terms-conditions' },
		],
	},
	{
		label: 'Help & Support',
		href: '/',
		submenu: [
			{ label: 'Shipping Info', href: '/shipping-info' },
			{ label: 'Retrun Policy', href: '/return-policy' },
			{ label: 'Contact Us', href: '/contact-us' },
		],
	},
	// {label: 'Help & Support',
	// 	href: '/help-support',}
];

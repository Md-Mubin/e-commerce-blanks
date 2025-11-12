type SidebarItemType = {
	title: string;
	href: string;
	icon: string;
	path: string;
	startOfSection?: boolean;
	sectionTitle?: string;
	isLocked?: boolean;
	permission?: {
		hide?: boolean;
		key?: string;
		label?: string;
		options?: string[];
	};
};

const sidebar: SidebarItemType[] = [
	{
		title: 'Dashboard',
		href: '/',
		icon: 'dashboard',
		path: 'dashboard',
		permission: {
			key: 'analytics',
			label: 'Analytics',
			options: ['view', 'edit', 'delete'],
		},
	},
	{
		startOfSection: true,
		sectionTitle: 'Analytics',
		title: 'Page Views',
		href: '/views',
		icon: 'analytics',
		path: 'views',
		permission: {
			key: 'views',
			label: 'Page Views',
			options: ['view', 'edit', 'delete'],
		},
	},

	{
		title: 'User',
		href: '/sellers',
		icon: 'order',
		path: 'sellers',
		permission: {
			key: 'sellers',
			label: 'Mint Retail Users',
			options: ['view', 'edit'],
		},
	},

	{
		startOfSection: true,
		sectionTitle: 'Admin Management',
		title: 'Admin List',
		href: '/admins',
		icon: 'customer',
		path: 'admins',
		permission: {
			key: 'admins',
			label: 'Admin Users',
			options: ['create', 'view', 'edit', 'delete'],
		},
	},
	{
		title: 'Roles',
		href: '/roles',
		icon: 'role',
		path: 'roles',
		permission: {
			key: 'roles',
			label: 'Admin Roles',
			options: ['create', 'view', 'edit', 'delete'],
		},
	},
	{
		startOfSection: true,
		sectionTitle: 'Admin Settings',
		title: 'Sidebar Item',
		href: '/sidebaritems',
		icon: 'sidebaritems',
		path: 'sidebaritems',
	},
	{
		title: 'Sidebar Categories',
		href: '/sidebarcategories',
		icon: 'sidebarcategories',
		path: 'sidebarcategories',
	},

	{
		startOfSection: true,
		sectionTitle: 'Account Settings',
		title: 'Settings',
		href: '/settings',
		icon: 'settings-fill',
		path: 'settings',
		permission: {
			hide: true,
		},
	},
];

export default sidebar;

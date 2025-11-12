'use server';

type GetAllProps = {
	limit?: number;
	sort?: string;
	status?: string;
	path: string;
	page?: number;
	params?: any;
	categoryId?: any;
	subCategoryId?: any;
	filters?: Record<string, any>;
};

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND;

async function getAll({
	limit = 10,
	sort = '-createdAt',
	status = '',
	path,
	page = 1,
	filters = {},
}: GetAllProps) {
	const token = process.env.NEXT_PUBLIC_TOKEN;

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
	};

	if (token) headers['authorization'] = `Bearer ${token}`;

	// ✅ Flatten nested filters like { category: { _id: '123' } } → { 'category._id': '123' }
	const flatFilters: Record<string, any> = {};
	Object.entries(filters).forEach(([key, value]) => {
		if (typeof value === 'object' && value !== null) {
			Object.entries(value).forEach(([subKey, subVal]) => {
				flatFilters[`${key}.${subKey}`] = subVal;
			});
		} else {
			flatFilters[key] = value;
		}
	});
	// console.log('filters val:::', filters);
	// console.log('filters val flat:::', flatFilters);
	// ✅ Build query params
	const queryParams = new URLSearchParams({
		limit: limit.toString(),
		sort,
		page: page.toString(),
		status,
		...flatFilters, // apply properly formatted filters
	});

	const api = `${BASE_URL}/${path}?${queryParams.toString()}`;
	// console.log('API URL Now:', api);

	const res = await fetch(api, {
		method: 'GET',
		next: { revalidate: 60 },
		headers,
	});

	if (!res.ok) {
		console.error(`Failed to fetch ${path}. Status: ${res.status}`);
		const errorText = await res.text();
		console.error('Error response:', errorText);
		return { doc: [] };
	}

	const data = await res.json();
	return data;
}

export default getAll;

// 'use server';
// type GetAllProps = {
// 	limit?: number;
// 	sort?: string;
// 	status?: string;
// 	path: string;
// 	page?: number;
// 	filters?: any;
// };
// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND;

// async function getAll({
// 	limit = 10,
// 	sort = '-createdAt',
// 	status = 'published',
// 	path,
// 	page = 1,
// 	filters = '',
// }: GetAllProps) {
// 	const token = process.env.NEXT_PUBLIC_TOKEN;

// 	const headers: Record<string, string> = {
// 		'Content-Type': 'application/json',
// 	};

// 	if (token) {
// 		headers['authorization'] = `Bearer ${token}`; // Bearer prefix (adjust if not needed)
// 	}

// 	// Build query parameters
// 	const params = new URLSearchParams({
// 		limit: limit.toString(),
// 		sort,
// 		status,
// 		page: page.toString(),
// 		...filters
// 	});

// 	// Always add the published status (assuming this is for published properties)
// 	// params.append('status', 'published');

// 	const api = `${BASE_URL}/${path}?${params.toString()}`;
// 	console.log('api::', api); // Debug log to see the URL

// 	const res = await fetch(api, {
// 		method: 'GET',
// 		next: { revalidate: 60 }, // ISR with 60-second revalidation
// 		headers,
// 	});

// 	if (!res.ok) {
// 		console.error(`Failed to fetch contents, Status: ${res.status}`);
// 		const errorText = await res.text();
// 		console.error('Error response:', errorText);
// 		return { doc: [] }; // Fallback to prevent crashes
// 	}

// 	const data = await res.json();
// 	return data; // Expected format: { doc: [...] }
// }

// export default getAll;

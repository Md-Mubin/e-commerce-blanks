'use server';

import { unstable_cache } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND;

const getCachedSingleProduct = unstable_cache(
	async (id: any) => {
		const token = process.env.NEXT_PUBLIC_TOKEN;

		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
		};

		if (token) {
			headers['authorization'] = `Bearer ${token}`;
		}

		const api = `${BASE_URL}/products/${id}`;
		const res = await fetch(api, {
			headers,
		});

		if (!res.ok) {
			return { doc: [] };
		}

		const data = await res.json();
		return data;
	},
	['single-product'],
	{
		revalidate: 900,
		tags: ['single-product'],
	}
);

export async function getSingleProduct(id: any) {
	return getCachedSingleProduct(id);
}

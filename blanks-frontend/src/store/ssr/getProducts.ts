'use server'

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND

export async function getProducts() {
  const token = process.env.NEXT_PUBLIC_TOKEN

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['authorization'] = `Bearer ${token}`; // Bearer prefix (adjust if not needed)
  }

  const api = `${BASE_URL}/products`;
  const res = await fetch(api, {
    next: { revalidate: 60 }, // ISR with 60-second revalidation
    headers,
  });

  if(!res.ok) {
    return { doc: [] }
  }

  const data = await res.json()
  return data
}
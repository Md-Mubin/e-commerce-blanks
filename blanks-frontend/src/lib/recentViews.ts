export interface RecentProduct {
  _id: string;
  name: string;
  price: number;
  image?: string;
}

const RECENT_VIEWS_KEY = 'recent_views';

// ➕ Add a product to recent views
export const addRecentView = (product: RecentProduct): void => {
  if (typeof window === 'undefined') return;

  try {
    const existing: RecentProduct[] = JSON.parse(
      localStorage.getItem(RECENT_VIEWS_KEY) || '[]'
    );

    // Remove if product already exists
    const filtered = existing.filter((p) => p._id !== product._id);

    // Add new one at start
    const updated = [product, ...filtered];

    // Keep only 5 most recent
    const limited = updated.slice(0, 5);

    localStorage.setItem(RECENT_VIEWS_KEY, JSON.stringify(limited));
  } catch (err) {
    console.error('Error updating recent views:', err);
  }
};

// 📦 Get recent views
export const getRecentViews = (): RecentProduct[] => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_VIEWS_KEY) || '[]');
  } catch {
    return [];
  }
};

// 🧹 Clear all recent views
export const clearRecentViews = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(RECENT_VIEWS_KEY);
};
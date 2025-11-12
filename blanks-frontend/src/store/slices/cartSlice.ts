// src/features/cart/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const CART_NAME = 'BLANKBASIC_CART_v1';

// Define the DiscountTier type
export interface DiscountTier {
	minQuantity: number;
	maxQuantity: number;
	price: number;
}

// Define the CartItem type based on your requirements
export interface CartItem {
	_id: string;
	id?: string; // Unique ID, e.g., `${productName}-${color}-${warehouseName}-${size}`
	image?: string;
	productName?: string;
	warehouseName?: string;
	selectedColor?: string; // Or object if more details
	size?: string; // Added based on your component
	qty?: number;
	productId?: number | string;
	price?: number;
	discountTiers?: DiscountTier[]; // Added discount tiers
}

// Initial state
export interface CartState {
	items: CartItem[];
}

const initialState: CartState = {
	items: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(CART_NAME) || '[]') : [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		// Add to cart: If item exists (same product, color, warehouse, size), increment quantity
		addToCart: (state, action: PayloadAction<Omit<CartItem, 'id'>>) => {
			const {
				productName,
				selectedColor,
				warehouseName,
				size,
				qty,
				image,
				productId,
				price,
				_id,
				discountTiers,
			} = action.payload;

			const itemId = `${productName}-${selectedColor}-${warehouseName}-${size}`;

			const existingItem = state.items.find(item => item.id === itemId);

			if (existingItem) {
				existingItem.qty = (existingItem.qty || 0) + Number(qty);
			} else {
				state.items.push({
					_id: _id,
					id: itemId,
					productId,
					productName,
					selectedColor,
					warehouseName,
					size,
					image,
					price,
					qty: Number(qty) || 1,
					discountTiers: discountTiers || [], // Store discount tiers
				});
			}

			// Save to localStorage
			if (typeof window !== 'undefined') {
				localStorage.setItem(CART_NAME, JSON.stringify(state.items));
			}
		},

		// Update quantity for an item by ID
		updateQuantity: (
			state,
			action: PayloadAction<{
				id: string;
				qty: number;
				price: number;
			}>
		) => {
			const { id, qty, price } = action.payload;
			const item = state.items.find(item => item.id === id);

			if (item && qty > 0) {
				item.qty = qty;
				item.price = price;
			} else if (item && qty <= 0) {
				state.items = state.items.filter(i => i.id !== id);
			}

			if (typeof window !== 'undefined') {
				localStorage.setItem(CART_NAME, JSON.stringify(state.items));
			}
		},

		// Remove item by ID
		removeFromCart: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter(item => item.id !== action.payload);

			// Save to localStorage
			if (typeof window !== 'undefined') {
				localStorage.setItem(CART_NAME, JSON.stringify(state.items));
			}
		},

		// Optional: clearCart if needed
		clearCart: state => {
			state.items = [];

			// Save to localStorage
			if (typeof window !== 'undefined') {
				localStorage.setItem(CART_NAME, JSON.stringify(state.items));
			}
		},
	},
});

// Export actions for dispatch
export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

// Export reducer for store
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: any) => state.cart.items;
export const selectCartTotal = (state: any) =>
	state.cart.items.reduce((total: number, item: CartItem) => total + (item.qty || 0), 0);

// Helper function to calculate discounted price based on quantity
export const calculateDiscountedPrice = (item: CartItem): number => {
	if (!item.discountTiers || item.discountTiers.length === 0) {
		return item.price || 0;
	}

	const qty = item.qty || 0;

	// Find applicable discount tier
	const applicableTier = item.discountTiers.find(
		tier => qty >= tier.minQuantity && qty <= tier.maxQuantity
	);

	return applicableTier ? applicableTier.price : item.price || 0;
};

// Selector to get cart total with discounts applied
export const selectCartTotalWithDiscount = (state: any) =>
	state.cart.items.reduce((total: number, item: CartItem) => {
		const discountedPrice = calculateDiscountedPrice(item);
		return total + discountedPrice * (item.qty || 0);
	}, 0);

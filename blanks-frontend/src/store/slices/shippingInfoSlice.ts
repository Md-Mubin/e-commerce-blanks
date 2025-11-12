import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
	_id: string;
	name: string;
	price: number;
	qty: number;
	image?: string;
	variationId?: string;
}

interface ShippingInfo {
	address?: string;
	city?: string;
	postalCode?: string;
	country?: string;
	shippingCost?: number;
	[key: string]: any;
}

interface CartState {
	success: boolean;
	userType: 'registered' | 'guest';
	subTotal: number;
	total: number;
	vat: number;
	discount: number;
	coupon: string | null;
	couponCodeId: string | null;
	shippingInfo: ShippingInfo | null;
	totalItems: number;
	items: CartItem[];
}

// ✅ Load from localStorage (consistent key)
const loadState = (): CartState => {
	try {
		const saved = localStorage.getItem('shippingInfo');
		if (saved) return JSON.parse(saved);
	} catch (e) {
		console.error('Failed to load shipping info from localStorage', e);
	}
	return {
		success: false,
		userType: 'guest',
		subTotal: 0,
		total: 0,
		vat: 0,
		discount: 0,
		coupon: null,
		couponCodeId: null,
		shippingInfo: null,
		totalItems: 0,
		items: [],
	};
};

const initialState: CartState = loadState();

const shippingInfoSlice = createSlice({
	name: 'shippingInfo', // ✅ singular
	initialState,
	reducers: {
		setShippingInfo: (state, action: PayloadAction<CartState>) => {
			Object.assign(state, action.payload);
			localStorage.setItem('shippingInfo', JSON.stringify(state)); // ✅ consistent key
		},
		resetShippingInfo: () => {
			localStorage.removeItem('shippingInfo'); // ✅ remove from storage
			return initialState; // ✅ reset Redux state
		},
	},
});

export const { setShippingInfo, resetShippingInfo } = shippingInfoSlice.actions;
export default shippingInfoSlice.reducer;

// // src/store/cartSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface CartItem {
// 	_id: string;
// 	name: string;
// 	price: number;
// 	qty: number;
// 	image?: string;
// 	variationId?: string;
// }

// interface ShippingInfo {
// 	address: string;
// 	city: string;
// 	postalCode: string;
// 	country: string;
// 	[key: string]: any;
// }

// interface CartState {
// 	success: boolean;
// 	userType: 'registered' | 'guest';
// 	subTotal: number;
// 	total: number;
// 	vat: number;
// 	discount: number;
// 	coupon: string | null;
// 	couponCodeId: string | null;
// 	shippingInfo: ShippingInfo | null;
// 	totalItems: number;
// 	items: CartItem[];
// }

// // Load from localStorage (if exists)
// const loadState = (): CartState => {
// 	try {
// 		const saved = localStorage.getItem('shippingInfo');
// 		if (saved) return JSON.parse(saved);
// 	} catch (e) {
// 		console.error('Failed to load cart from localStorage', e);
// 	}
// 	return {
// 		success: false,
// 		userType: 'guest',
// 		subTotal: 0,
// 		total: 0,
// 		vat: 0,
// 		discount: 0,
// 		coupon: null,
// 		couponCodeId: null,
// 		shippingInfo: null,
// 		totalItems: 0,
// 		items: [],
// 	};
// };

// const initialState: CartState = loadState();

// const shippingInfoSlice = createSlice({
// 	name: 'shippingInfos',
// 	initialState,
// 	reducers: {
// 		setShippingInfo: (state, action: PayloadAction<CartState>) => {
// 			Object.assign(state, action.payload);
// 			localStorage.setItem('shippingInfos', JSON.stringify(state));
// 		},
// 	},
// });

// export const { setShippingInfo } = shippingInfoSlice.actions;
// export default shippingInfoSlice.reducer;

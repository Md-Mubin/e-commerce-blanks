import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define interfaces for type safety
interface Customer {
	email: string;
	phone?: string;
}

interface Address {
	fullName: string;
	street: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
}

interface PaymentInfo {
	method: 'credit_card' | 'paypal' | 'apple_pay' | 'interac' | 'stripe';
	cardNumber?: string;
	expiry?: string;
	cvv?: string;
	nameOnCard?: string;
}
//.
interface OrderItem {
	id: string;
	name: string;
	quantity: number;
	price: number;
}

interface CheckoutState {
	currentStep: 0 | 1 | 2 | 3;
	customer: Customer;
	shippingAddress: Address;
	billingAddress: Address | null;
	useShippingAsBilling: boolean;
	paymentInfo: PaymentInfo;
	orderItems: OrderItem[];
	subtotal: number;
	shippingCost: number;
	tax: number;
	grandTotal: number;
	isPickup: boolean;
	pickupDate?: string;
	pickupTime?: string;
}

// Initial state
const initialState: CheckoutState = {
	currentStep: 0,
	customer: {
		email: '',
	},
	shippingAddress: {
		fullName: '',
		street: '',
		city: '',
		state: '',
		postalCode: '',
		country: '',
	},
	billingAddress: null,
	useShippingAsBilling: true,
	paymentInfo: {
		method: 'credit_card',
	},
	isPickup: false,
	orderItems: [],
	subtotal: 0,
	shippingCost: 0,
	tax: 0,
	grandTotal: 0,
	pickupDate: '',
	pickupTime: '',
};

// Helper function to calculate totals (mock logic)
const calculateTotals = (state: CheckoutState) => {
	state.subtotal = state.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	state.shippingCost = state.shippingAddress.country?.toLowerCase().includes('canada')
		? 12.37
		: 15.0;
	state.tax = state.shippingAddress.country?.toLowerCase().includes('canada')
		? 0.13 * (state.subtotal + state.shippingCost)
		: 0;
	state.grandTotal = state.subtotal + state.shippingCost + state.tax;
};

// Create the RTK slice
const checkoutSlice = createSlice({
	name: 'checkout',
	initialState,
	reducers: {
		setCurrentStep: (state, action: PayloadAction<0 | 1 | 2 | 3>) => {
			state.currentStep = action.payload;
		},
		updateCustomer: (state, action: PayloadAction<Partial<Customer>>) => {
			state.customer = { ...state.customer, ...action.payload };
		},
		updatePickup: (state, action: PayloadAction<boolean>) => {
			state.isPickup = action.payload;
		},
		updatePickupDate: (state, action: PayloadAction<string>) => {
			state.pickupDate = action.payload;
		},
		updatePickupTime: (state, action: PayloadAction<string>) => {
			state.pickupTime = action.payload;
		},
		updateShippingAddress: (state, action: PayloadAction<Partial<Address>>) => {
			state.shippingAddress = { ...state.shippingAddress, ...action.payload };
			// console.log('state.useShippingAsBilling', state.useShippingAsBilling);
			// console.log('state.billingAddress', action.payload);
			if (state.useShippingAsBilling) {
				state.billingAddress = { ...state.shippingAddress };
			}
			calculateTotals(state);
		},
		updateBillingAddress: (state, action: PayloadAction<any>) => {
			state.billingAddress = state.billingAddress
				? { ...state.billingAddress, ...action.payload }
				: { ...action.payload };
			state.useShippingAsBilling = false;
			calculateTotals(state);
		},
		toggleUseShippingAsBilling: (state, action: PayloadAction<boolean>) => {
			state.useShippingAsBilling = action.payload;
			if (action.payload) {
				state.billingAddress = { ...state.shippingAddress };
			} else {
				state.billingAddress = null;
			}
			calculateTotals(state);
		},
		updatePaymentInfo: (state, action: PayloadAction<Partial<PaymentInfo>>) => {
			state.paymentInfo = { ...state.paymentInfo, ...action.payload };
		},
		setOrderItems: (state, action: PayloadAction<OrderItem[]>) => {
			state.orderItems = action.payload;
			calculateTotals(state);
		},
		resetCheckout: () => initialState,
	},
});

// Export actions
export const {
	setCurrentStep,
	updateCustomer,
	updateShippingAddress,
	updateBillingAddress,
	toggleUseShippingAsBilling,
	updatePaymentInfo,
	setOrderItems,
	resetCheckout,
	updatePickup,
	updatePickupDate,
	updatePickupTime,
} = checkoutSlice.actions;

// Export reducer
export default checkoutSlice.reducer;

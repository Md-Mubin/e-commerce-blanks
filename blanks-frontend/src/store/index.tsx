import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authSlice } from './slices/authSlice';
import mainApi from './services/mainApi';
import cartReducer from './slices/cartSlice';
import shippingInfoReducer from './slices/shippingInfoSlice';
import checkoutReducer from './slices/checkoutSlice';
import { tableSlice } from './slices/tableSlice';
import uiReducder from './slices/uiSlice';

// import { routeSlice, tableSlice, cartSlice, authSlice } from '@/components/library/store';

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		table: tableSlice.reducer,
		cart: cartReducer,
		shippingInfo: shippingInfoReducer,
		checkout: checkoutReducer,
		ui: uiReducder,
		[mainApi.reducerPath]: mainApi.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(mainApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

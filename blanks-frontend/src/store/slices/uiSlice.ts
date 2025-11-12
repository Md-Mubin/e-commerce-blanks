// uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        showCartModal: false,
    },
    reducers: {
        showCartModal: (state) => {
            state.showCartModal = true;
        },
        hideCartModal: (state) => {
            state.showCartModal = false;
        },
        toggleCartModal: (state) => {
            state.showCartModal = !state.showCartModal;
        },
    },
});

export const { showCartModal, hideCartModal, toggleCartModal } = uiSlice.actions;
export default uiSlice.reducer;

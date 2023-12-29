import { createSlice } from '@reduxjs/toolkit';

export const UISlice = createSlice({
    name: 'UI',
    initialState: {
        showError: false,
        showCountdownAnimation: true
    },
    reducers: {
        setShowError: (state, action) => {
            state.showError = action.payload;
        },
        setShowCountdownAnimation: (state, action) => {
            state.showCountdownAnimation = action.payload;
        },
        resetUI: (state) => {
            state.showError = false;
            state.showCountdownAnimation = true;
        }
    }
});

export const {
    setShowError,
    setShowCountdownAnimation,
    resetUI
} = UISlice.actions;

export default UISlice.reducer;
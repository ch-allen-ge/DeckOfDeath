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
        }
    }
});

export const {
    setShowError,
    setShowCountdownAnimation
} = UISlice.actions;

export default UISlice.reducer;
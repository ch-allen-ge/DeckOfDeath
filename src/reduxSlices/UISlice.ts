import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    showError: boolean;
    showCountdownAnimation: boolean;
    loggedIn: boolean;
};

const initialState: UIState = {
    showError: false,
    showCountdownAnimation: true,
    loggedIn: false
};

export const UISlice = createSlice({
    name: 'UI',
    initialState,
    reducers: {
        setShowError: (state, action: PayloadAction<boolean>) => {
            state.showError = action.payload;
        },
        setShowCountdownAnimation: (state, action: PayloadAction<boolean>) => {
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
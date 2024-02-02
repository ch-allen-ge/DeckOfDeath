import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    showError: boolean;
    showCountdownAnimation: boolean;
    loggedIn: boolean;
    selectedTab: string
};

const getCurrentTab = () => {
    const url: string = window.location.href;

    const tabArray = ['profile', 'coach', 'savedWorkouts'];

    for (const suffix of tabArray) {
        if (url.includes(suffix)) return suffix;
    }

    return '';
}

const initialState: UIState = {
    showError: false,
    showCountdownAnimation: true,
    loggedIn: false,
    selectedTab: getCurrentTab()
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
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.loggedIn = action.payload;
        },
        setSelectedTab: (state, action: PayloadAction<'home' | 'profile' | 'savedWorkouts' | 'coach' | 'logout' | 'login' | 'register'>) => {
            state.selectedTab = action.payload;
        },
        resetUI: (state) => {
            state.showError = false;
            state.showCountdownAnimation = true;
            state.selectedTab = '';
        }
    }
});

export const {
    setShowError,
    setShowCountdownAnimation,
    setLoggedIn,
    setSelectedTab,
    resetUI
} = UISlice.actions;

export default UISlice.reducer;
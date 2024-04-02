import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OptionsState {
    breakoutAces: boolean;
    easyDeck: boolean;
};

const initialState: OptionsState = {
    breakoutAces: false,
    easyDeck: false
};

export const workoutOptionsSlice = createSlice({
    name: 'workoutOptions',
    initialState,
    reducers: {
        setBreakoutAces: (state, action: PayloadAction<boolean>) => {
            state.breakoutAces = action.payload;
        },
        setEasyDeck: (state, action: PayloadAction<boolean>) => {
            state.easyDeck = action.payload;
        },
        resetOptions: (state) => {
            state.breakoutAces = false;
            state.easyDeck = false;
        }
    }
});

export const {
    setBreakoutAces,
    setEasyDeck,
    resetOptions
} = workoutOptionsSlice.actions;

export default workoutOptionsSlice.reducer;
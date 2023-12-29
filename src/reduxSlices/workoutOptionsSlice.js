import { createSlice } from '@reduxjs/toolkit';

export const workoutOptionsSlice = createSlice({
    name: 'workoutOptions',
    initialState: {
        breakoutAces: false,
        oneHandedSuit: false,
        easyDeck: false
    },
    reducers: {
        setBreakoutAces: (state, action) => {
            state.breakoutAces = action.payload;
        },
        setOneHandedSuit: (state, action) => {
            state.oneHandedSuit = action.payload;
        },
        setEasyDeck: (state, action) => {
            state.easyDeck = action.payload;
        },
        resetOptions: (state) => {
            state.breakoutAces = false;
            state.oneHandedSuit = false;
            state.easyDeck = false;
        }
    }
});

export const {
    setBreakoutAces,
    setOneHandedSuit,
    setEasyDeck,
    resetOptions
} = workoutOptionsSlice.actions;

export default workoutOptionsSlice.reducer;
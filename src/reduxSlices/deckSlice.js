import { createSlice } from '@reduxjs/toolkit';

export const DeckSlice = createSlice({
    name: 'deck',
    initialState: {
        deckId: null,
        currentCard: null,
        cardsFinished: 0,
        cardsRemaining: 51
    },
    reducers: {
        setDeckId: (state, action) => {
            state.deckId = action.payload;
        },
        setCurrentCard: (state, action) => {
            state.currentCard = action.payload;
        },
        setCardsFinished: (state, action) => {
            state.cardsFinished = action.payload;
        },
        setCardsRemaining: (state, action) => {
            state.cardsRemaining = action.payload;
        },
        resetDeck: (state) => {
            state.deckId = null;
            state.currentCard = null;
            state.cardsFinished = 0;
            state.cardsRemaining = 51;
        }
    }
});

export const {
    setDeckId,
    setCurrentCard,
    setCardsFinished,
    setCardsRemaining,
    resetDeck
} = DeckSlice.actions;

export default DeckSlice.reducer;
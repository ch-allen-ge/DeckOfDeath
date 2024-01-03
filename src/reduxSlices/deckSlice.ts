import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeckState {
    deckId: string,
    currentCard: any,
    cardsFinished: number,
    cardsRemaining: number
}

const initialState: DeckState = {
    deckId: '',
    currentCard: null,
    cardsFinished: 0,
    cardsRemaining: 51
}

export const DeckSlice = createSlice({
    name: 'deck',
    initialState,
    reducers: {
        setDeckId: (state, action: PayloadAction<string>) => {
            state.deckId = action.payload;
        },
        setCurrentCard: (state, action: PayloadAction<any>) => {
            state.currentCard = action.payload;
        },
        setCardsFinished: (state, action: PayloadAction<number>) => {
            state.cardsFinished = action.payload;
        },
        setCardsRemaining: (state, action: PayloadAction<number>) => {
            state.cardsRemaining = action.payload;
        },
        resetDeck: (state) => {
            state.deckId = '';
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
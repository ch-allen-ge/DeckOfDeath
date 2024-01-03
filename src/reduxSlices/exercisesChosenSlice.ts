import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface exerciseChosenState {
    clubs: string,
    diamonds: string,
    hearts: string,
    spades: string,
    aces: {
        exercise: string,
        timerUsed: boolean,
        minutesToDo: string | number,
        secondsToDo: string | number
    }
}

const initialState: exerciseChosenState = {
    clubs: '',
    diamonds: '',
    hearts: '',
    spades: '',
    aces: {
        exercise: '',
        timerUsed: false,
        minutesToDo: '',
        secondsToDo: ''
    }
};

export const exercisesChosenSlice = createSlice({
    name: 'exercisesChosen',
    initialState,
    reducers: {
        setClubsExercise: (state, action: PayloadAction<string>) => {
            state.clubs = action.payload;
        },
        setDiamondsExercise: (state, action: PayloadAction<string>) => {
            state.diamonds = action.payload;
        },
        setHeartsExercise: (state, action: PayloadAction<string>) => {
            state.hearts = action.payload;
        },
        setSpadesExercise: (state, action: PayloadAction<string>) => {
            state.spades = action.payload;
        },
        setAcesExercise: (state, action: PayloadAction<string>) => {
            state.aces.exercise = action.payload;
        },
        setAcesTimerUsed: (state, action: PayloadAction<boolean>) => {
            state.aces.timerUsed = action.payload;
        },
        setAcesMinutesToDo: (state, action: PayloadAction<string | number>) => {
            state.aces.minutesToDo = action.payload;
        },
        setAcesSecondsToDo: (state, action: PayloadAction<string | number>) => {
            state.aces.secondsToDo = action.payload;
        },
        resetExercises: (state) => {
            state.clubs = '';
            state.diamonds = '';
            state.hearts = '';
            state.spades = '';
            state.aces = {
                exercise: '',
                timerUsed: false,
                minutesToDo: '',
                secondsToDo: ''
            }
        }
    }
});

export const {
    setClubsExercise,
    setDiamondsExercise,
    setHeartsExercise,
    setSpadesExercise,
    setAcesExercise,
    setAcesTimerUsed,
    setAcesMinutesToDo,
    setAcesSecondsToDo,
    resetExercises
} = exercisesChosenSlice.actions;

export default exercisesChosenSlice.reducer;
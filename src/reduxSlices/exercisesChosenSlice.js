import { createSlice } from '@reduxjs/toolkit';

export const exercisesChosenSlice = createSlice({
    name: 'exercisesChosen',
    initialState: {
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
    },
    reducers: {
        setClubsExercise: (state, action) => {
            state.clubs = action.payload;
        },
        setDiamondsExercise: (state, action) => {
            state.diamonds = action.payload;
        },
        setHeartsExercise: (state, action) => {
            state.hearts = action.payload;
        },
        setSpadesExercise: (state, action) => {
            state.spades = action.payload;
        },
        setAcesExercise: (state, action) => {
            state.aces.exercise = action.payload;
        },
        setAcesTimerUsed: (state, action) => {
            state.aces.timerUsed = action.payload;
        },
        setAcesMinutesToDo: (state, action) => {
            state.aces.minutesToDo = action.payload;
        },
        setAcesSecondsToDo: (state, action) => {
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
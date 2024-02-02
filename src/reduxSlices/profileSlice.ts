import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Workout {
    name: string,
    clubs_exercise: string,
    diamonds_exercise: string,
    hearts_exercise: string,
    spades_exercise: string,
    aces_exercise: string,
    breakout_aces: boolean,
    timer_used: boolean,
    aces_minutes_to_do: number,
    aces_seconds_to_do: number
}

interface ProfileState {
    totalTimeSpent: string;
    numberWorkoutsCompleted: number;
    savedWorkouts: Workout[];
}

const initialState: ProfileState = {
    totalTimeSpent: '',
    numberWorkoutsCompleted: 0,
    savedWorkouts: []
}

export const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setTotalTimeSpent: (state, action: PayloadAction<string>) => {
            state.totalTimeSpent = action.payload;
        },
        setNumberWorkoutsCompleted: (state, action: PayloadAction<number>) => {
            state.numberWorkoutsCompleted = action.payload;
        },
        setSavedWorkouts: (state, action: PayloadAction<Workout[]>) => {
            state.savedWorkouts = action.payload;
        },
        addSavedWorkout: (state, action: PayloadAction<Workout>) => {
            state.savedWorkouts = state.savedWorkouts.concat(action.payload);
        },
        resetProfile: (state) => {
            state.totalTimeSpent = '';
            state.numberWorkoutsCompleted = 0;
        }
    }
});

export const {
    setTotalTimeSpent,
    setNumberWorkoutsCompleted,
    resetProfile,
    setSavedWorkouts,
    addSavedWorkout
} = ProfileSlice.actions;

export default ProfileSlice.reducer;
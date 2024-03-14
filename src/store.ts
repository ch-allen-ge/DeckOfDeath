import { configureStore } from '@reduxjs/toolkit';
import workoutOptionsReducer from './reduxSlices/workoutOptionsSlice';
import exercisesChosenReducer from './reduxSlices/exercisesChosenSlice';

export const store = configureStore({
  reducer: {
    workoutOptions: workoutOptionsReducer,
    exercisesChosen: exercisesChosenReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
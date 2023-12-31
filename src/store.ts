import { configureStore } from '@reduxjs/toolkit';
import workoutOptionsReducer from './reduxSlices/workoutOptionsSlice';
import exercisesChosenReducer from './reduxSlices/exercisesChosenSlice';
import UIReducer from './reduxSlices/UISlice';
import deckReducer from './reduxSlices/deckSlice';

export const store = configureStore({
  reducer: {
    workoutOptions: workoutOptionsReducer,
    exercisesChosen: exercisesChosenReducer,
    UI: UIReducer,
    deck: deckReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
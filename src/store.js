import { configureStore } from '@reduxjs/toolkit';
import workoutOptionsReducer from './reduxSlices/workoutOptionsSlice';
import exercisesChosenReducer from './reduxSlices/exercisesChosenSlice';
import UIReducer from './reduxSlices/UISlice';
import deckReducer from './reduxSlices/deckSlice';

export default configureStore({
  reducer: {
    workoutOptions: workoutOptionsReducer,
    exercisesChosen: exercisesChosenReducer,
    UI: UIReducer,
    deck: deckReducer
  },
});
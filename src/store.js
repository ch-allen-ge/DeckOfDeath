import { configureStore } from '@reduxjs/toolkit';
import workoutOptionsReducer from './reduxSlices/workoutOptionsSlice';
import exercisesChosenReducer from './reduxSlices/exercisesChosenSlice';
import UIReducer from './reduxSlices/UISlice';

export default configureStore({
  reducer: {
    workoutOptions: workoutOptionsReducer,
    exercisesChosen: exercisesChosenReducer,
    UI: UIReducer
  },
});
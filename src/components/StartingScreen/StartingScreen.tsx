import { useEffect, useState } from "react";
import ExerciseSelection from "../ExerciseSelection";
import Button from "../Button";
import OptionsModal from "../OptionsModal";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../hooks';
import { resetExercises } from "../../reduxSlices/exercisesChosenSlice";
import { resetOptions } from "../../reduxSlices/workoutOptionsSlice";
import './startingScreenStyles.scss';

const StartingScreen = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const clubsExercise = useAppSelector((state) => state.exercisesChosen.clubs);
    const diamondsExercise = useAppSelector((state) => state.exercisesChosen.diamonds);
    const heartsExercise = useAppSelector((state) => state.exercisesChosen.hearts);
    const spadesExercise = useAppSelector((state) => state.exercisesChosen.spades);
    const acesExercise = useAppSelector((state) => state.exercisesChosen.aces.exercise);
    const breakoutAces = useAppSelector((state) => state.workoutOptions.breakoutAces);
    const acesTimerUsed = useAppSelector((state) => state.exercisesChosen.aces.timerUsed);
    const acesMinutesToDo = useAppSelector((state) => state.exercisesChosen.aces.minutesToDo);
    const acesSecondsToDo = useAppSelector((state) => state.exercisesChosen.aces.secondsToDo);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    
    useEffect(() => {
      dispatch(resetExercises());
      dispatch(resetOptions());
    }, []);

    const allFilledIn = () => {
      const exerciseArray = [clubsExercise, diamondsExercise, heartsExercise, spadesExercise];

      for (const card of exerciseArray) {
        if (card === '' ||
          (breakoutAces && (acesExercise === '' || (acesTimerUsed && acesMinutesToDo === 0 && acesSecondsToDo == 0)))) 
        {
          return false;
        }
      }

      return true;
    }


    return (
      <div className="startingscreen">
        <div className="startingscreen__descriptiontext">
          <div className="startingscreen__descriptiontext__title">
            Customize Your Workout
          </div>
          <div className="startingscreen__descriptiontext__description">
            Each card in a deck will represent the number of reps you have to do of your chosen exercise.
            For example, if you set clubs to push ups, drawing a 10 of clubs means you have to do 10 push ups.
            This is a very challenging workout with many reps, so choose wisely and have fun!
          </div>
        </div>
        
        <div className='startingscreen__deathrow'>
          {
            ['clubs', 'diamonds', 'hearts', 'spades'].map((suit) => (
              <ExerciseSelection
                key={suit}
                suit={suit}
                showError={showError}
              />
            ))
          }
          {(breakoutAces || acesExercise) && <ExerciseSelection suit='aces' showError={showError}/>
          }
        </div>

        <div className={`errorRow ${showError ? 'visbile' : 'invisible'}`}>
          *Please fill in all exercises*
        </div>
        
        <div className="startingscreen__buttonrow">
            <Button
              onClick={() => {
                dispatch(resetExercises());
                dispatch(resetOptions());
              }}
            >
              Clear
            </Button>

            <div
              className="startingscreen__buttonrow__start-button"
              onClick={() => {
                if (allFilledIn()) {
                  if (showError) {
                    setShowError(false);
                  }
                  navigate('/workout');
                } else {
                  setShowError(true);
                }
              }}
            />

            <Button
              onClick={() => {setModalOpen(true)}}
            >
              Options
            </Button>
        </div>

        <OptionsModal
          modalOpen={modalOpen}
          handleClose={() => {setModalOpen(false)}}
        />
      </div>
    );
}

export default StartingScreen;
import { useState } from "react";
import ExerciseSelection from "../ExerciseSelection";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import OptionsModal from "../OptionsModal";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../hooks';
import {resetExercises} from "../../reduxSlices/exercisesChosenSlice";
import { resetOptions } from "../../reduxSlices/workoutOptionsSlice";
import { resetUI } from "../../reduxSlices/UISlice";
import { setShowError } from "../../reduxSlices/UISlice";
import './startingScreenStyles.scss';
import SaveWorkoutModal from "../SaveWorkoutModal";

const StartingScreen = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useAppSelector((state) => state.UI.loggedIn);
    const clubsExercise = useAppSelector((state) => state.exercisesChosen.clubs);
    const diamondsExercise = useAppSelector((state) => state.exercisesChosen.diamonds);
    const heartsExercise = useAppSelector((state) => state.exercisesChosen.hearts);
    const spadesExercise = useAppSelector((state) => state.exercisesChosen.spades);
    const acesExercise = useAppSelector((state) => state.exercisesChosen.aces.exercise);
    const breakoutAces = useAppSelector((state) => state.workoutOptions.breakoutAces);
    const acesTimerUsed = useAppSelector((state) => state.exercisesChosen.aces.timerUsed);
    const acesMinutesToDo = useAppSelector((state) => state.exercisesChosen.aces.minutesToDo);
    const acesSecondsToDo = useAppSelector((state) => state.exercisesChosen.aces.secondsToDo);
    const showError = useAppSelector((state) => state.UI.showError);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
    const [showSaveError, setShowSaveError] = useState<boolean>(false);

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
      <>
        <div className="siteContainer">
          <div className="deathZone">
            <div className='deathRow'>
              {
                ['clubs', 'diamonds', 'hearts', 'spades'].map((suit) => <ExerciseSelection key={suit} suit={suit} />)
              }
              {
                (breakoutAces || acesExercise) && <ExerciseSelection suit='aces'/>
              }
            </div>
            {showError &&
              <div className="errorRow">
                *Please fill in all exercises*
              </div>
            }
            <div className="buttonRow">
              <ButtonGroup variant="text">
                {isLoggedIn && 
                  <Button
                    variant="text"
                    onClick={() => {
                      setShowSaveError(false);
                      if (allFilledIn()) {
                        setSaveModalOpen(true);
                      } else {
                        setShowSaveError(true);
                      }
                    }}
                  >
                    Save
                  </Button>
                }
                <Button
                  variant="text"
                  onClick={() => {
                    dispatch(resetExercises());
                    dispatch(resetOptions());
                    dispatch(resetUI());
                  }}
                >
                  Clear
                </Button>
                <Button
                  variant="text"
                  onClick={() => {setModalOpen(true)}}
                >
                  Options
                </Button>
                <Button
                  variant="text"
                  size="large"
                  onClick={() => {
                    if (allFilledIn()) {
                      dispatch(setShowError(false));
                      navigate('/workout');
                    } else {
                      dispatch(setShowError(true));
                    }
                  }}
                  >
                  Start
                </Button>
              </ButtonGroup>
            </div>

            {showSaveError &&
              <div className="saveWorkoutError errorText">
                Failed to save workout, fields incorrect
              </div>
            }
          </div>

          <OptionsModal
            modalOpen={modalOpen}
            handleClose={() => {setModalOpen(false)}}
          />

          {allFilledIn() && 
            <SaveWorkoutModal
              modalOpen={saveModalOpen}
              handleClose={() => {setSaveModalOpen(false)}}
            />
          }
        </div>
      </>
    )
}

export default StartingScreen;
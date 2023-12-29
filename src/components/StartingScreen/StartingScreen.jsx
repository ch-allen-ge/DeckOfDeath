import {useState } from "react";
import ExerciseSelection from "../ExerciseSelection";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import OptionsModal from "../OptionsModal";
import CoachZone from "../CoachZone/CoachZone";
import './startingScreenStyles.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import {
  setClubsExercise,
  setDiamondsExercise,
  setHeartsExercise,
  setSpadesExercise,
  setAcesExercise,
  resetExercises
} from "../../reduxSlices/exercisesChosenSlice";

import { resetOptions } from "../../reduxSlices/workoutOptionsSlice";

import { setShowError } from "../../reduxSlices/UISlice";

const StartingScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clubsExercise = useSelector((state) => state.exercisesChosen.clubs);
    const diamondsExercise = useSelector((state) => state.exercisesChosen.diamonds);
    const heartsExercise = useSelector((state) => state.exercisesChosen.hearts);
    const spadesExercise = useSelector((state) => state.exercisesChosen.spades);
    const acesExercise = useSelector((state) => state.exercisesChosen.aces.exercise);
    const breakoutAces = useSelector((state) => state.workoutOptions.breakoutAces);
    const acesTimerUsed = useSelector((state) => state.exercisesChosen.aces.timerUsed);
    const acesMinutesToDo = useSelector((state) => state.exercisesChosen.aces.minutesToDo);
    const acesSecondsToDo = useSelector((state) => state.exercisesChosen.aces.secondsToDo);
    const showError = useSelector((state) => state.UI.showError);

    const [modalOpen, setModalOpen] = useState(false);

    const allFilledIn = () => {
      const exerciseArray = [clubsExercise, diamondsExercise, heartsExercise, spadesExercise];

      for (const card of exerciseArray) {
        if (card === '' ||
          (breakoutAces && (acesExercise === '' || (acesTimerUsed && acesMinutesToDo === '' && acesSecondsToDo == '')))) 
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
              <ExerciseSelection key='clubs' suit='clubs' exercise={clubsExercise} setExercise={setClubsExercise}/>
              <ExerciseSelection key='diamonds' suit='diamonds' exercise={diamondsExercise} setExercise={setDiamondsExercise}/>
              <ExerciseSelection key='hearts' suit='hearts' exercise={heartsExercise} setExercise={setHeartsExercise}/>
              <ExerciseSelection key='spades' suit='spades' exercise={spadesExercise} setExercise={setSpadesExercise}/>
              {
                (breakoutAces || acesExercise) && <ExerciseSelection key='aces' suit='aces' exercise={acesExercise} setExercise={setAcesExercise}/>
              }
            </div>
            {showError &&
              <div className="errorRow">
                *Please fill in all exercises*
              </div>
            }
            <div className="buttonRow">
              <ButtonGroup variant="text">
                <Button
                  variant="text"
                  onClick={() => {
                    dispatch(resetExercises());
                    dispatch(resetOptions());
                  }}
                >
                  Reset
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
                      //setShowStartingScreen(false);
                      // setExercisesChosen({
                      //     clubs: clubsExercise,
                      //     diamonds: diamondsExercise,
                      //     hearts: heartsExercise,
                      //     spades: spadesExercise,
                      //     aces: acesExercise
                      // });
                    } else {
                      dispatch(setShowError(true));
                    }
                  }}
                  >
                  Start
                </Button>
              </ButtonGroup>
            </div>
          </div>

          <div className="coachZone">
            <CoachZone />
          </div>
          
          <OptionsModal
            modalOpen={modalOpen}
            handleClose={() => {setModalOpen(false)}}
          />
        </div>
      </>
    )
}

export default StartingScreen;
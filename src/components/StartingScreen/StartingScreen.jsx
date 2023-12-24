import { useEffect, useState } from "react";

import ExerciseSelection from "../ExerciseSelection";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import OptionsModal from "../OptionsModal";
import { suitsArray } from "../../constants";
import './startingScreenStyles.css';

const StartingScreen = ({setShowStartingScreen, setExercisesChosen, workoutOptions, setWorkoutOptions}) => {
    const [clubsExercise, setClubExercise] = useState({});
    const [diamondsExercise, setDiamondExercise] = useState({});
    const [heartsExercise, setHeartExercise] = useState({});
    const [spadesExercise, setSpadeExercise] = useState({});
    const [acesExercise, setAcesExercise] = useState({});
    const [showError, setShowError] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    
    useEffect(() => {
      if (clubsExercise && diamondsExercise && heartsExercise && spadesExercise) {
        setShowError(false);
      }
    }, [clubsExercise, diamondsExercise, heartsExercise, spadesExercise]);

    const setExercise = (suit, exerciseObj) => {
      switch (suit) {
        case 'clubs':
          setClubExercise(exerciseObj);
          break;
        case 'diamonds':
          setDiamondExercise(exerciseObj);
          break;
        case 'hearts':
          setHeartExercise(exerciseObj);
          break;
        case 'spades':
          setSpadeExercise(exerciseObj);
          break;
        case 'aces':
          setAcesExercise(exerciseObj);
          break;
      }
    }

    const allFilledIn = () => {
      const exerciseArray = [clubsExercise, diamondsExercise, heartsExercise, spadesExercise, acesExercise];
      let allGood = true;

      for (const suitAndExercise of exerciseArray) {
        if (suitAndExercise.exerciseText === '' ||
          (suitAndExercise.suit === 'aces' && suitAndExercise.timerUsed && (suitAndExercise.minutesToDo === '' && suitAndExercise.secondsToDo === '')))
        {
          allGood =  false;
          break;
        }
      }

      return allGood;
    }

    return (
      <>
        <div className='deathRow'>
          {
            suitsArray.map((suit) => <ExerciseSelection key={suit} suit={suit} setExercise={setExercise} showError={showError}/>)
          }
          {
            workoutOptions.breakOutAces && <ExerciseSelection key='aces' suit='aces' setExercise={setExercise} showError={showError}/>
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
              onClick={() => {setModalOpen(true)}}
            >
              Options
            </Button>
            <Button
              variant="text"
              size="large"
              onClick={() => {
                if (allFilledIn()) {
                  setShowStartingScreen(false);
                  setExercisesChosen({
                      clubs: clubsExercise,
                      diamonds: diamondsExercise,
                      hearts: heartsExercise,
                      spades: spadesExercise,
                      aces: acesExercise
                  });
                } else {
                  setShowError(true);
                }
              }}
              >
              Start
            </Button>
          </ButtonGroup>
        </div>
        
        <OptionsModal
          modalOpen={modalOpen}
          handleClose={() => {setModalOpen(false)}}
          options={workoutOptions}
          setWorkoutOptions={setWorkoutOptions}
        />
      </>
    )
}

export default StartingScreen;
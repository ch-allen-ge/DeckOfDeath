import { useState } from "react";

import ExerciseSelection from "../ExerciseSelection";
import Button from '@mui/material/Button';
import './startingScreenStyles.css';

const StartingScreen = ({setShowStartingScreen, setExercisesChosen}) => {
    const suitsArray = ['clubs', 'diamonds', 'hearts', 'spades'];
    const [clubsExercise, setClubExercise] = useState('');
    const [diamondsExercise, setDiamondExercise] = useState('');
    const [heartsExercise, setHeartExercise] = useState('');
    const [spadesExercise, setSpadeExercise] = useState('');

    const setExercise = (suit, text) => {
        switch (suit) {
          case 'clubs':
            setClubExercise(text);
            break;
          case 'diamonds':
            setDiamondExercise(text);
            break;
          case 'hearts':
            setHeartExercise(text);
            break;
          case 'spades':
            setSpadeExercise(text);
            break;
        }
    }

    return (
      <>
        <div className='titleSection'>
          <h1>Deck Of Death</h1>
        </div>
        <div className='deathRow'>
          {
            suitsArray.map((suit) => <ExerciseSelection key={suit} suit={suit} setExercise={setExercise} />)
          }
        </div>
        <div className='startButton'>
            <Button
                variant="contained"
                onClick={() => {
                    setShowStartingScreen(false);
                    setExercisesChosen({
                        clubs: clubsExercise,
                        diamonds: diamondsExercise,
                        hearts: heartsExercise,
                        spades: spadesExercise
                    });
                }}
            >
            Start
          </Button>
        </div>
      </>
    )
}

export default StartingScreen;
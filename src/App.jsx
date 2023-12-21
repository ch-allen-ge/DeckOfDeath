import { useState } from 'react';
import StartingScreen from './components/StartingScreen';
import Countdown from './components/Countdown';
import DeckOfDeathGame from './components/DeckOfDeathGame';

function App() {
  const [showStartingScreen, setShowStartingScreen] = useState(true);
  const [exercisesChosen, setExercisesChosen] = useState({});
  const [workoutOptions, setWorkoutOptions] = useState({
    breakOutAces: false,
    oneHandedSuit: {
      set: false,
      suit: null,
    },
    easyDeck: false
  });
  const [showCountdownAnimation, setShowCountdownAnimation] = useState(true);

  return (
    <>
      {showStartingScreen &&
        <StartingScreen
          setShowStartingScreen={setShowStartingScreen}
          setExercisesChosen={setExercisesChosen}
          setWorkoutOptions={setWorkoutOptions}
        />
      }
      {!showStartingScreen &&
        <>
          <Countdown
            setShowCountdownAnimation={setShowCountdownAnimation}
          />
          {!showCountdownAnimation && 
            <DeckOfDeathGame exercisesChosen={exercisesChosen} workoutOptions={workoutOptions}/> //this is created 3 times on a new game for some reason
          }
        </>
        
      }
    </>
  )
}

export default App;
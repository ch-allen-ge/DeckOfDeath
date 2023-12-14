import { useState } from 'react';
import StartingScreen from './components/StartingScreen';
import Countdown from './components/Countdown';
import DeckOfDeathGame from './components/DeckOfDeathGame';

function App() {
  const [showStartingScreen, setShowStartingScreen] = useState(true);
  const [exercisesChosen, setExercisesChosen] = useState({});
  const [animationFinished, setAnimationFinished] = useState(false);

  return (
    <>
      {showStartingScreen &&
        <StartingScreen
          setShowStartingScreen={setShowStartingScreen}
          setExercisesChosen={setExercisesChosen}
        />
      }
      {!showStartingScreen &&
        <>
          <Countdown
            setAnimationFinished={setAnimationFinished}
          />
          {animationFinished && 
            <DeckOfDeathGame exercisesChosen={exercisesChosen}/>
          }
        </>
        
      }
    </>
  )
}

export default App;
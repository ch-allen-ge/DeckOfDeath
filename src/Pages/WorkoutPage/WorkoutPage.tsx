import Countdown from "../../components/Countdown";
import DeckOfDeathGame from "../../components/DeckOfDeathGame";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../../hooks';

import './workoutPageStyles.scss';

const WorkoutPage = () => {
    const navigate = useNavigate();

    const exercisesChosen = useAppSelector((state) => state.exercisesChosen);
    const showCountdownAnimation = useAppSelector((state) => state.UI.showCountdownAnimation);

    useEffect(() => {
      if (
          exercisesChosen.clubs === '' &&
          exercisesChosen.diamonds === '' &&
          exercisesChosen.hearts === '' &&
          exercisesChosen.spades === ''
      ) {
          navigate('/');
      }
  }, []);

    return (
        <div className='workoutPageContainer'>
          <Countdown />
          {!showCountdownAnimation && 
            <DeckOfDeathGame />
          }
        </div>
    )
}

export default WorkoutPage;
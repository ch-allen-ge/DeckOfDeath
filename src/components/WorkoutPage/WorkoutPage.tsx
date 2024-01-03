import Countdown from "../Countdown";
import DeckOfDeathGame from "../DeckOfDeathGame";

import { useEffect, FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../../hooks';

import Navbar from "../Navbar";

const WorkoutPage: FC = (): ReactElement => {
    const navigate = useNavigate();

    const exercisesChosen = useAppSelector((state) => state.exercisesChosen);
    const showCountdownAnimation = useAppSelector((state) => state.UI.showCountdownAnimation);

    useEffect(() => {
      //if no exercises  in state, navigate back to homepage
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
        <>
          <Navbar />
          <Countdown />
          {!showCountdownAnimation && 
            <DeckOfDeathGame />
          }
        </>
    )
}

export default WorkoutPage;
import Countdown from "../Countdown";
import DeckOfDeathGame from "../DeckOfDeathGame";

import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import Navbar from "../Navbar";

//need to get/set UI state showCountdownAnimation
const WorkoutPage = () => {
    const navigate = useNavigate();

    const exercisesChosen = useSelector((state) => state.exercisesChosen);
    const showCountdownAnimation = useSelector((state) => state.UI.showCountdownAnimation);

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
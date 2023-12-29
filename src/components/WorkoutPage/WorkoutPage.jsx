import Countdown from "../Countdown";
import DeckOfDeathGame from "../DeckOfDeathGame";

import { useSelector } from 'react-redux';
import Navbar from "../Navbar";

//need to get/set UI state showCountdownAnimation
const WorkoutPage = () => {
    const showCountdownAnimation = useSelector((state) => state.UI.showCountdownAnimation);

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
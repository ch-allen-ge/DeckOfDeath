import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { dodGet } from "../../axios-config";
import { setSavedWorkouts } from "../../reduxSlices/profileSlice";
import WorkoutDisplay from "../../components/WorkoutDisplay";
import './savedWorkoutsPageStyles.scss';
import { Button } from "@mui/material";
import { 
    setClubsExercise,
    setDiamondsExercise,
    setHeartsExercise,
    setSpadesExercise,
    setAcesExercise,
    setAcesTimerUsed,
    setAcesMinutesToDo,
    setAcesSecondsToDo } 
from "../../reduxSlices/exercisesChosenSlice";
import { setBreakoutAces } from "../../reduxSlices/workoutOptionsSlice";
import { useNavigate } from "react-router-dom";
import LoginRegisterPage from "../LoginReigsterPage";

interface WorkoutInterface {
    name: string,
    clubs_exercise: string,
    diamonds_exercise: string,
    hearts_exercise: string,
    spades_exercise: string,
    aces_exercise: string,
    breakout_aces: boolean,
    timer_used: boolean,
    aces_minutes_to_do: number,
    aces_seconds_to_do: number
}

const SavedWorkoutPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const savedWorkoutsArray = useAppSelector((state) => state.profile.savedWorkouts);
    const isLoggedIn = useAppSelector((state) => state.UI.loggedIn);

    useEffect(() => {
        const getCustomWorkouts = async () => {
          const response = await dodGet('/workouts/getCustomWorkouts');
          const savedWorkouts = response.data;
          dispatch(setSavedWorkouts(savedWorkouts));
        }
        
        getCustomWorkouts();
    }, []);

    const handleClick = (selectedWorkout: WorkoutInterface) => {
        dispatch(setClubsExercise(selectedWorkout.clubs_exercise));
        dispatch(setDiamondsExercise(selectedWorkout.diamonds_exercise));
        dispatch(setHeartsExercise(selectedWorkout.hearts_exercise));
        dispatch(setSpadesExercise(selectedWorkout.spades_exercise));
        dispatch(setAcesExercise(selectedWorkout.aces_exercise));
        dispatch(setBreakoutAces(selectedWorkout.breakout_aces));
        dispatch(setAcesTimerUsed(selectedWorkout.timer_used));
        dispatch(setAcesMinutesToDo(selectedWorkout.aces_minutes_to_do));
        dispatch(setAcesSecondsToDo(selectedWorkout.aces_seconds_to_do));
        navigate('/workout');
    }

    return (
        <div className="savedWorkoutsPageContainer">
            {isLoggedIn ? 
                <div className='savedWorkoutsContainer'>
                    <div className='savedWorkoutsTextContainer'>
                        <h1 className='savedWorkoutsText'>Saved Workouts</h1>
                    </div>

                    <div className="rowDisplay">
                        {savedWorkoutsArray.map((workout: WorkoutInterface, index) => 
                            <div className="savedWorkoutContainer" key={index}>
                                <div>{workout.name}</div>
                                <WorkoutDisplay workout={workout} index={index} />
                                <Button onClick={() => handleClick(workout)}>
                                    Start
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            :
                <LoginRegisterPage />
            }
        </div>
    )

}

export default SavedWorkoutPage;
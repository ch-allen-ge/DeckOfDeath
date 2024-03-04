import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { dodGet } from "../../axios-config";
import { setSavedWorkouts } from "../../reduxSlices/profileSlice";
import './savedWorkoutsPageStyles.scss';
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
import Button from "../../components/Button";
import { setUsername } from "../../reduxSlices/userSlice";
import { setLoggedIn } from "../../reduxSlices/UISlice";

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
        const checkUserLoggedIn = async () => {
            try {
                const response = await dodGet('/authenticateToken');
    
                if (response && response.status === 200) {
                    const getCustomWorkouts = async () => {
                        const response = await dodGet('/workouts/getCustomWorkouts');
                        const savedWorkouts = response.data;
                        dispatch(setSavedWorkouts(savedWorkouts));
                    }
    
                    dispatch(setLoggedIn(true));
                    getCustomWorkouts();
                } else {
                    dispatch(setLoggedIn(false));
                }
            } catch (e) {
            
            }
        };

        checkUserLoggedIn();
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
                    <div className="savedWorkoutsText">
                        Saved Workouts
                    </div>
                    <div className="rowDisplay">
                        {savedWorkoutsArray.map((workout: WorkoutInterface, index) => 
                            <div className="card">
                                <div className="card__side card__side--front">
                                    {/* <div className="card__picture card__picture--1"></div> */}
                                    <span className="card__heading">
                                        <span className="card__heading-span card__heading-span--1">
                                            {workout.name}
                                        </span>
                                    </span>
                                    <div className="card__details">
                                        <span>{workout.clubs_exercise}</span>
                                        <span>{workout.diamonds_exercise}</span>
                                        <span>{workout.hearts_exercise}</span>
                                        <span>{workout.spades_exercise}</span>
                                        {workout.breakout_aces &&
                                            <span>
                                                {workout.aces_exercise} {workout.timer_used && `for ${workout.aces_minutes_to_do} min ${workout.aces_seconds_to_do} sec`}
                                            </span>
                                        }
                                    </div>
                                </div>
                                <div className="card__side card__side--back card__side--back-1">
                                    <div className="card__cta">
                                        <Button
                                            onClick={() => handleClick(workout)}
                                        >
                                            Start
                                        </Button>
                                    </div>
                                </div>
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
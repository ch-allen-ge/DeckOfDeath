import { useAppDispatch } from "../../hooks";
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
import { useAuth } from "../../auth/AuthContext";
import { getSavedWorkouts } from "../../api/getRoutes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { deleteTheCustomWorkout } from "../../api/deleteRoutes";

interface WorkoutInterface {
    saved_custom_workout_id: number,
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
    const { isLoggedIn } = useAuth();
    const queryClient = useQueryClient();

    const deleteWorkout = useMutation({
        mutationFn: async (saved_custom_workout_id: number) => {
            await deleteTheCustomWorkout(saved_custom_workout_id);
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['savedWorkouts']})
    });

    const {
        data: savedWorkouts,
        status: savedWorkoutsStatus
    } = useQuery({
        queryKey: ['savedWorkouts'],
        queryFn: getSavedWorkouts,
        enabled: isLoggedIn,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });

    if (!isLoggedIn) {
        return (<LoginRegisterPage />);
    }
    
    if (savedWorkoutsStatus === 'pending') {
        return (<CircularProgress />);
    };

    const startWorkout = (selectedWorkout: WorkoutInterface) => {
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
    };

    return (
        <div className="savedWorkoutsPageContainer">
            <div className='savedWorkoutsContainer'>
                <div className="savedWorkoutsText">
                    Saved Workouts
                </div>
                {savedWorkouts.length === 0 ?
                    <div className="noSavedWorkouts">
                        Save a workout after completion to quick start it again here!
                    </div>
                    :
                    <div className="rowDisplay">
                        {savedWorkouts.map((workout: WorkoutInterface, index: number) => 
                            <div className="card" key={index}>
                                <div className="card__side card__side--front">
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
                                            onClick={() => deleteWorkout.mutate(workout.saved_custom_workout_id)}
                                            styles={{
                                                color: 'red'
                                            }}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            onClick={() => startWorkout(workout)}
                                        >
                                            Start
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    )

}

export default SavedWorkoutPage;
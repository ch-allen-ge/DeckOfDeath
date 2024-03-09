import { TextField } from '@mui/material';
import './finishedPageStyles.scss';
import Button from '../../components/Button';
import { useAppSelector } from '../../hooks';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetExercises } from '../../reduxSlices/exercisesChosenSlice';
import { resetOptions } from '../../reduxSlices/workoutOptionsSlice';
import { resetUI } from '../../reduxSlices/UISlice';
import { resetDeck } from '../../reduxSlices/deckSlice';
import WorkoutDisplay from '../../components/WorkoutDisplay';
import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuth } from '../../auth/AuthContext';
import { saveTheCustomWorkout } from '../../api/postRoutes';
import { useMutation } from '@tanstack/react-query';

interface FinishedPageProps {
    totalTimeSpent?: string
}

interface CompletedWorkout {
    name?: string
    time_spent?: string,
    clubs_exercise: string,
    diamonds_exercise: string,
    hearts_exercise: string,
    spades_exercise: string,
    aces_exercise: string,
    breakout_aces: boolean,
    timer_used: boolean,
    aces_minutes_to_do: number,
    aces_seconds_to_do: number
};

const FinishedPage = ({totalTimeSpent} : FinishedPageProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();
  const clubs_exercise = useAppSelector((state) => state.exercisesChosen.clubs);
  const diamonds_exercise = useAppSelector((state) => state.exercisesChosen.diamonds);
  const hearts_exercise = useAppSelector((state) => state.exercisesChosen.hearts);
  const spades_exercise = useAppSelector((state) => state.exercisesChosen.spades);
  const aces_exercise = useAppSelector((state) => state.exercisesChosen.aces.exercise);
  const breakout_aces = useAppSelector((state) => state.workoutOptions.breakoutAces);
  const timer_used = useAppSelector((state) => state.exercisesChosen.aces.timerUsed);
  const aces_minutes_to_do = useAppSelector((state) => state.exercisesChosen.aces.minutesToDo);
  const aces_seconds_to_do = useAppSelector((state) => state.exercisesChosen.aces.secondsToDo);

  const workoutCompleted = {
    clubs_exercise,
    diamonds_exercise,
    hearts_exercise,
    spades_exercise,
    aces_exercise,
    breakout_aces,
    timer_used,
    aces_minutes_to_do,
    aces_seconds_to_do
  };

  const [saveWorkoutName, setSaveWorkoutName] = useState('');
  const [saveWorkoutError, setSaveWorkoutError] = useState(false);
  const [savedWorkout, setSavedWorkout] = useState(false);
  
  const returnHome = () => {
    dispatch(resetExercises());
    dispatch(resetOptions());
    dispatch(resetUI());
    dispatch(resetDeck());
    navigate('/');
  }

  const saveWorkout = useMutation({
    mutationFn: async () => {
        if(saveWorkoutName !== '') {
            const workout: CompletedWorkout = {
                name: saveWorkoutName,
                clubs_exercise,
                diamonds_exercise,
                hearts_exercise,
                spades_exercise,
                aces_exercise,
                breakout_aces,
                timer_used,
                aces_minutes_to_do,
                aces_seconds_to_do
            };
    
            await saveTheCustomWorkout(workout);
        }
    },
    onSuccess: () => {
        setSavedWorkout(true);
    },
    onError: () => {
        setSaveWorkoutError(true);
    }
  });

  return (
    <div className='finished-page'>
        <div
            className='finished-page__finished-text'
        >
            Workout Completed
        </div>

        <div className="finished-page__information">
            <div className='finished-page__information__element finished-page__information__section borderRight'>
                <div className='finished-page__information__section__label'>Time Spent</div>
                <div className='finished-page__information__section__data'>{totalTimeSpent}</div>
                <div className='finished-page__information__section__label'>Workout Details</div>
                <WorkoutDisplay workout={workoutCompleted}/>
            </div>

            {isLoggedIn && (
                <>
                    <div className='finished-page__information__element finished-page__information__vertical-divider' />

                    <div className='finished-page__information__element finished-page__information__section'>
                        <div className="saveWorkout">
                            <div className='finished-page__information__section__label'>Save Workout</div>
                            <div className='finished-page__information__section__data'>
                                Saving a workout allows you to replay it by selecting it in the Saved tab
                            </div>
                            <div className='workoutNameInput'>
                                <TextField
                                    label='Workout Name'
                                    variant="outlined"
                                    autoComplete='off'
                                    onChange={(e) => {
                                        setSaveWorkoutError(false);
                                        setSaveWorkoutName(e.target.value);
                                    }}
                                    error={saveWorkoutError}
                                />

                                {savedWorkout
                                    ?
                                    <div>
                                        <CheckCircleIcon />
                                    </div>
                                    :
                                    <Button
                                        onClick={() => saveWorkout.mutate()}
                                    >
                                        Save
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>
                </>
           )}
        </div>

        <div className='homeButton'>
            <Button
                onClick={returnHome}
            >
                Back Home
            </Button>
        </div>
    </div>
  )
}

export default FinishedPage;
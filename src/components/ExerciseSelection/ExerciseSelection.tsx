import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import TimerIcon from '@mui/icons-material/Timer';

import { useAppSelector, useAppDispatch } from '../../hooks';
import {
    setClubsExercise,
    setDiamondsExercise,
    setHeartsExercise,
    setSpadesExercise,
    setAcesExercise,
    setAcesTimerUsed,
    setAcesMinutesToDo,
    setAcesSecondsToDo,
} from "../../reduxSlices/exercisesChosenSlice";

import './exerciseSelection.scss';

interface ExerciseSelectionProps {
    suit: string;
    showError: boolean,
}

const ExerciseSelection = ({suit, showError} : ExerciseSelectionProps) => {
    const dispatch = useAppDispatch();

    const breakoutAces = useAppSelector((state) => state.workoutOptions.breakoutAces);
    const exercisesChosen = useAppSelector((state) => state.exercisesChosen);
    const acesExercise = useAppSelector((state) => state.exercisesChosen.aces.exercise);
    const acesTimerUsed = useAppSelector((state) => state.exercisesChosen.aces.timerUsed);
    const acesMinutesToDo = useAppSelector((state) => state.exercisesChosen.aces.minutesToDo);
    const acesSecondsToDo = useAppSelector((state) => state.exercisesChosen.aces.secondsToDo);
    const exercise = useAppSelector((state) => {
        switch (suit) {
            case 'clubs':
                return state.exercisesChosen.clubs;
            case 'diamonds':
                return state.exercisesChosen.diamonds;
            case 'hearts':
                return state.exercisesChosen.hearts;
            case 'spades':
                return state.exercisesChosen.spades;
            case 'aces':
                return state.exercisesChosen.aces;
        }
    });

    const setExerciseState = (exerciseText: string) => {
        switch (suit) {
            case 'clubs':
                dispatch(setClubsExercise(exerciseText));
                break;
            case 'diamonds':
                dispatch(setDiamondsExercise(exerciseText));
                break;
            case 'hearts':
                dispatch(setHeartsExercise(exerciseText));
                break;
            case 'spades':
                dispatch(setSpadesExercise(exerciseText));
                break;
            case 'aces':
                dispatch(setAcesExercise(exerciseText));
                break;
        }
    }

    const getInputFields = () => {
        if (suit === 'aces') {
            return (
                <>
                    <TextField
                        label={`${suit} exercise*`}
                        variant="outlined"
                        value={acesExercise}
                        inputProps={{ maxLength: 70 }}
                        autoComplete='off'
                        onChange={(e) => {
                            setExerciseState(e.target.value);
                        }}
                        error={showError && breakoutAces && !acesExercise}
                    />

                    <div className="timer-row">
                        <ToggleButton
                            selected={acesTimerUsed}
                            value="left"
                            aria-label="left aligned"
                            onClick={() => {dispatch(setAcesTimerUsed(!acesTimerUsed))}}
                        >
                            {acesTimerUsed ? <TimerIcon /> : <TimerOffIcon />}
                        </ToggleButton>
                        {acesTimerUsed && (
                            <>
                                <TextField
                                    className="timer-row__num-input"
                                    type='number'
                                    label='minutes'
                                    variant="outlined"
                                    inputProps={{ maxLength: 3 }}
                                    value={acesMinutesToDo === 0 ? '' : acesMinutesToDo}
                                    autoComplete='off'
                                    onChange={(e) => {
                                        const minutes = e.target.value;
                                        dispatch(setAcesMinutesToDo(Number(minutes)));
                                    }}
                                    error={showError && acesTimerUsed && (acesMinutesToDo === 0 && acesSecondsToDo === 0)}
                                />
                                <TextField
                                    className="timer-row__num-input"
                                    type='number'
                                    label='seconds'
                                    variant="outlined"
                                    inputProps={{ maxLength: 2 }}
                                    value={acesSecondsToDo === 0 ? '' : acesSecondsToDo}
                                    autoComplete='off'
                                    onChange={(e) => {
                                        const seconds = e.target.value;
                                        dispatch(setAcesSecondsToDo(Number(seconds)));
                                    }}
                                    error={showError && acesTimerUsed && (acesMinutesToDo === 0 && acesSecondsToDo === 0)}
                                />
                            </>
                        )}
                    </div>
                </>
            );
        } else {
            return (
                <TextField
                    label={`${suit} exercise*`}
                    variant="outlined"
                    value={exercise}
                    inputProps={{ maxLength: 70 }}
                    autoComplete='off'
                    onChange={(e) => {
                        setExerciseState(e.target.value);
                    }}
                    error={showError && exercisesChosen[suit as keyof typeof exercisesChosen] === ''}
                />
            );
        }
    }

    return (
        <div className="exercise-selection">
            <div className="exercise-selection__suit-label">
                {suit}
            </div>
            <div className="exercise-selection__suit-contents">
                <img 
                    className='exercise-selection__suit-contents__suit-img'
                    src={`/images/suits/${suit}.svg`}
                />
                {getInputFields()}
            </div>
        </div>
    );
    
}

export default ExerciseSelection;
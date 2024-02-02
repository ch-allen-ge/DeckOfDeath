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
}

const ExerciseSelection = ({suit} : ExerciseSelectionProps) => {
    const dispatch = useAppDispatch();

    const breakoutAces = useAppSelector((state) => state.workoutOptions.breakoutAces);
    const exercisesChosen = useAppSelector((state) => state.exercisesChosen);
    const showError = useAppSelector((state) => state.UI.showError);
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

    if (suit === 'aces') {
        const acesExercise = useAppSelector((state) => state.exercisesChosen.aces.exercise);
        const acesTimerUsed = useAppSelector((state) => state.exercisesChosen.aces.timerUsed);
        const acesMinutesToDo = useAppSelector((state) => state.exercisesChosen.aces.minutesToDo);
        const acesSecondsToDo = useAppSelector((state) => state.exercisesChosen.aces.secondsToDo);

        return (
            <div className={`card ${suit === 'aces' ? 'acesCard' : ''}`}>
                <div className="suitLabel">
                    {suit}
                </div>
                <div className="suitColumn">
                    <img className='suitImg' src={`/images/suits/${suit}.svg`}/>
                    <TextField
                        label={`${suit} exercise*`}
                        variant="outlined"
                        value={acesExercise}
                        autoComplete='off'
                        className="suitExercise"
                        onChange={(e) => {
                            setExerciseState(e.target.value);
                        }}
                        error={showError && breakoutAces && !acesExercise}
                    />

                        <div className="timerRow">
                        <ToggleButton
                            selected={acesTimerUsed}
                            className="timerToggleButton"
                            value="left"
                            aria-label="left aligned"
                            onClick={() => {dispatch(setAcesTimerUsed(!acesTimerUsed))}}
                        >
                            {acesTimerUsed ? <TimerIcon /> : <TimerOffIcon />}
                        </ToggleButton>
                        {acesTimerUsed && (
                            <>
                                <TextField
                                    className="numInput"
                                    type='number'
                                    label='minutes'
                                    variant="outlined"
                                    inputProps={{ maxLength: 2 }}
                                    value={acesMinutesToDo === 0 ? '' : acesMinutesToDo}
                                    autoComplete='off'
                                    onChange={(e) => {
                                        const minutes = e.target.value;
                                        dispatch(setAcesMinutesToDo(Number(minutes)));
                                    }}
                                    error={showError && acesTimerUsed && (acesMinutesToDo === 0 && acesSecondsToDo === 0)}
                                />
                                <TextField
                                    className="numInput"
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
                </div>
            </div>
        )
    } else {
        return (
            <div className="card">
                <div className="suitLabel">
                    {suit}
                </div>
                <div className="suitColumn">
                    <img className='suitImg' src={`/images/suits/${suit}.svg`}/>
                    <TextField
                        label={`${suit} exercise*`}
                        variant="outlined"
                        value={exercise}
                        autoComplete='off'
                        className="suitExercise"
                        onChange={(e) => {
                            setExerciseState(e.target.value);
                        }}
                        error={showError && exercisesChosen[suit as keyof typeof exercisesChosen] === ''}
                    />
                </div>
            </div>
        );
    }
}

export default ExerciseSelection;
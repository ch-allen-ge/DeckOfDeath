import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import TimerIcon from '@mui/icons-material/Timer';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { FC, ReactElement } from 'react';
import {
    setAcesExercise,
    setAcesTimerUsed,
    setAcesMinutesToDo,
    setAcesSecondsToDo,
} from "../../reduxSlices/exercisesChosenSlice";

import './exerciseSelection.scss';

interface ExerciseSelectionProps {
    suit: string,
    exercise: string,
    setExercise: React.Dispatch<React.SetStateAction<string>>
}

const ExerciseSelection: FC<ExerciseSelectionProps> = ({suit, exercise, setExercise}): ReactElement => {
    const dispatch = useAppDispatch();

    const breakoutAces = useAppSelector((state) => state.workoutOptions.breakoutAces);
    const exercisesChosen = useAppSelector((state) => state.exercisesChosen);
    const showError = useAppSelector((state) => state.UI.showError);

    if (suit === 'aces') {
        const acesExercise = useAppSelector((state) => state.exercisesChosen.aces.exercise);
        const acesTimerUsed = useAppSelector((state) => state.exercisesChosen.aces.timerUsed);
        const acesMinutesToDo = useAppSelector((state) => state.exercisesChosen.aces.minutesToDo);
        const acesSecondsToDo = useAppSelector((state) => state.exercisesChosen.aces.secondsToDo);

        return (
            <div className="card">
                <div className="suitLabel">
                    {suit}
                </div>
                <div className="suitColumn">
                    <img className='suitImg' src={`/images/suits/${suit}.svg`}/>
                    <TextField
                        label={exercise ? '' : `${suit} exercise*`}
                        variant="outlined"
                        value={acesExercise}
                        autoComplete='off'
                        className="suitExercise"
                        onChange={(e) => {
                            dispatch(setAcesExercise(e.target.value));
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
                                    label='minutes'
                                    variant="outlined"
                                    inputProps={{ maxLength: 2 }}
                                    value={acesMinutesToDo}
                                    autoComplete='off'
                                    onChange={(e) => {
                                        const minutes = e.target.value;
                                        // @ts-ignore
                                        if (minutes > 0 || minutes === '') {
                                            dispatch(setAcesMinutesToDo(minutes));
                                        }
                                    }}
                                    error={showError && acesTimerUsed && (acesMinutesToDo === '' && acesSecondsToDo === '')}
                                />
                                <TextField
                                    className="numInput"
                                    label='seconds'
                                    variant="outlined"
                                    inputProps={{ maxLength: 2 }}
                                    value={acesSecondsToDo}
                                    autoComplete='off'
                                    onChange={(e) => {
                                        const seconds = e.target.value;
                                        // @ts-ignore
                                        if (seconds > 0 || seconds === '') {
                                            dispatch(setAcesSecondsToDo(seconds));
                                        }
                                    }}
                                    error={showError && acesTimerUsed && (acesMinutesToDo === '' && acesSecondsToDo === '')}
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
                        label={exercise ? '' : `${suit} exercise*`}
                        variant="outlined"
                        value={exercise}
                        autoComplete='off'
                        className="suitExercise"
                        onChange={(e) => {
                            // @ts-ignore
                            dispatch(setExercise(e.target.value));
                        }}
                        error={showError && exercisesChosen[suit as keyof typeof exercisesChosen] === ''}
                    />
                </div>
            </div>
        );
    }
}

export default ExerciseSelection;
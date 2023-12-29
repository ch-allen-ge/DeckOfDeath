import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import TimerIcon from '@mui/icons-material/Timer';
import { useSelector, useDispatch } from 'react-redux'

import {
    setAcesExercise,
    setAcesTimerUsed,
    setAcesMinutesToDo,
    setAcesSecondsToDo,
} from "../../reduxSlices/exercisesChosenSlice";

import './exerciseSelection.css';

const ExerciseSelection = ({suit, exercise, setExercise}) => {
    const dispatch = useDispatch();

    const breakoutAces = useSelector((state) => state.workoutOptions.breakoutAces);
    const exercisesChosen = useSelector((state) => state.exercisesChosen);
    const showError = useSelector((state) => state.UI.showError);
    // useEffect(() => {
    //     if (suit === 'aces') {
    //         setExercise('aces', {
    //             suit,
    //             exerciseText,
    //             timerUsed,
    //             minutesToDo,
    //             secondsToDo
    //         })
    //     } else {
    //         setExercise(suit, exerciseText);
    //     }
    // }, [exerciseText, timerUsed, minutesToDo, secondsToDo]);

    if (suit === 'aces') {
        const acesExercise = useSelector((state) => state.exercisesChosen.aces.exercise);
        const acesTimerUsed = useSelector((state) => state.exercisesChosen.aces.timerUsed);
        const acesMinutesToDo = useSelector((state) => state.exercisesChosen.aces.minutesToDo);
        const acesSecondsToDo = useSelector((state) => state.exercisesChosen.aces.secondsToDo);

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
                            dispatch(setExercise(e.target.value));
                        }}
                        error={showError && exercisesChosen[suit] === ''}
                    />
                </div>
            </div>
        );
    }
}

export default ExerciseSelection;
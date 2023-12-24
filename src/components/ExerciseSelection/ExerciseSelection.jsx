import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import TimerIcon from '@mui/icons-material/Timer';

import './exerciseSelection.css';

const ExerciseSelection = ({suit, setExercise, showError}) => {
    const [exercisesChosen, setExercisesChosen] = useState(false);
    const [exerciseText, setExerciseText] = useState('');
    const [timerUsed, setTimerUsed] = useState(false);
    const [minutesToDo, setMinutesToDo] = useState(''); 
    const [secondsToDo, setSecondsToDo] = useState('');

    useEffect(() => {
        if (suit === 'aces') {
            setExercise('aces', {
                suit,
                exerciseText,
                timerUsed,
                minutesToDo,
                secondsToDo
            })
        } else {
            setExercise(suit, {
                suit,
                exerciseText
            });
        }
    }, [exerciseText, timerUsed, minutesToDo, secondsToDo]);

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
                    autoComplete='off'
                    className="suitExercise"
                    onChange={(e) => {
                        const exercise = e.target.value;
                        setExerciseText(exercise);
                        if (exercise) {
                            setExercisesChosen(true);
                        } else {
                            setExercisesChosen(false);
                        }
                    }}
                    error={showError && !exercisesChosen}
                />
                {suit === 'aces' && (
                    <div className="timerRow">
                    <ToggleButton
                        selected={timerUsed}
                        className="timerToggleButton"
                        value="left"
                        aria-label="left aligned"
                        onClick={() => {setTimerUsed(!timerUsed)}}
                    >
                        {timerUsed ? <TimerIcon /> : <TimerOffIcon />}
                    </ToggleButton>
                    {timerUsed && (
                        <>
                            <TextField
                                className="numInput"
                                label='minutes'
                                variant="outlined"
                                inputProps={{ maxLength: 2 }}
                                value={minutesToDo}
                                autoComplete='off'
                                onChange={(e) => {
                                    const minutes = e.target.value;
                                    if (minutes > 0 || minutes === '') {
                                        setMinutesToDo(minutes);
                                    }
                                }}
                                error={showError && timerUsed && (minutesToDo === '' && secondsToDo === '')}
                            />
                            <TextField
                                className="numInput"
                                label='seconds'
                                variant="outlined"
                                inputProps={{ maxLength: 2 }}
                                value={secondsToDo}
                                autoComplete='off'
                                onChange={(e) => {
                                    const seconds = e.target.value;
                                    if (seconds > 0 || seconds === '') {
                                        setSecondsToDo(seconds);
                                    }
                                }}
                                error={showError && timerUsed && (minutesToDo === '' && secondsToDo === '')}
                            />
                        </>
                    )}
                </div>
                )}
                
            </div>
        </div>
    )
}

export default ExerciseSelection;
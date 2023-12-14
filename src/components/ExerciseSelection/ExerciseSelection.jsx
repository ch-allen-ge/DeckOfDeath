import { useState } from "react";
import TextField from '@mui/material/TextField';

import './exerciseSelection.css';

const ExerciseSelection = ({suit, setExercise}) => {

    const getIconColor = () => {
        if (suit === 'clubs' || suit === 'spades') {
            return 'blackIcon'
        } else {
            return 'redIcon';
        }
    }

    return (
        <div className="suitColumn">
            <img className={`suitImg ${getIconColor()}`} src={`/src/images/suits/${suit}.svg`}/>
            <TextField label={`${suit} exercise`} variant="outlined" required={true} onChange={(e) => setExercise(suit, e.target.value)}/>
        </div>
    )
}

export default ExerciseSelection;
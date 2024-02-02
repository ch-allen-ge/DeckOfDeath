import './saveWorkoutModalStyles.scss';

import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { TextField } from '@mui/material';
import { dodPost } from '../../axios-config';
import { useState } from 'react';
import { addSavedWorkout } from '../../reduxSlices/profileSlice';
import { validateSavedWorkoutName } from '../../utils/Validation';

interface Workout {
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


interface SaveWorkoutModalProps {
    modalOpen: boolean;
    handleClose: () => void
}

const SaveWorkoutModal = ({modalOpen, handleClose} : SaveWorkoutModalProps) => {
    const dispatch = useAppDispatch();

    //make sure not empty
    const [workoutName, setWorkoutName] = useState('');
    const [showError, setShowError] = useState(false);

    const clubsExercise = useAppSelector((state) => state.exercisesChosen.clubs);
    const diamondsExercise = useAppSelector((state) => state.exercisesChosen.diamonds);
    const heartsExercise = useAppSelector((state) => state.exercisesChosen.hearts);
    const spadesExercise = useAppSelector((state) => state.exercisesChosen.spades);
    const acesExercise = useAppSelector((state) => state.exercisesChosen.aces.exercise);
    const breakoutAces = useAppSelector((state) => state.workoutOptions.breakoutAces);
    const acesTimerUsed = useAppSelector((state) => state.exercisesChosen.aces.timerUsed);
    const acesMinutesToDo = useAppSelector((state) => state.exercisesChosen.aces.minutesToDo);
    const acesSecondsToDo = useAppSelector((state) => state.exercisesChosen.aces.secondsToDo);

    const handleSave = async () => {
        if(validateSavedWorkoutName(workoutName)) {
            const workout: Workout = {
                name: workoutName,
                clubs_exercise: clubsExercise,
                diamonds_exercise: diamondsExercise,
                hearts_exercise: heartsExercise,
                spades_exercise: spadesExercise,
                aces_exercise: acesExercise,
                breakout_aces: breakoutAces,
                timer_used: acesTimerUsed,
                aces_minutes_to_do: acesMinutesToDo,
                aces_seconds_to_do: acesSecondsToDo,
            };

            dodPost('/workouts/saveCustomWorkout', workout);

            dispatch(addSavedWorkout(workout))
            handleClose();
        } else {
            setShowError(true);
        }
    }

    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
        >
            <div className='saveWorkoutContainer'>
                <div className='saveWorkoutModalLabel'>
                    Name your workout!
                </div>
                <div className='contents'>
                    <TextField
                        label="Name"
                        variant="standard"
                        onChange={(e) => {
                            setWorkoutName(e.target.value);
                            setShowError(false);
                        }}
                        error={showError}
                    />

                    {showError && <div className='errorText'>*Workout name cannot be empty</div>}

                    <Button
                        className='saveButton'
                        variant="contained"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                    
                </div>
            </div>
        </Modal>
    );
};

export default SaveWorkoutModal;
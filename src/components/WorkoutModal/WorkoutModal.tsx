import './workoutModalStyles.scss';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../../hooks';
import {
    setClubsExercise,
    setDiamondsExercise,
    setHeartsExercise,
    setSpadesExercise,
    setAcesExercise,
    setAcesTimerUsed,
    setAcesMinutesToDo,
    setAcesSecondsToDo
  } from "../../reduxSlices/exercisesChosenSlice";

import { setBreakoutAces } from '../../reduxSlices/workoutOptionsSlice';

interface WorkoutModalProps {
    workout: {
        name: string,
        equipment?: string,
        difficulty?: number,
        clubs_exercise: string,
        diamonds_exercise: string,
        hearts_exercise: string,
        spades_exercise: string,
        aces_exercise: string,
        breakout_aces: boolean,
        timer_used: boolean,
        aces_minutes_to_do: number,
        aces_seconds_to_do: number,
    },
    modalOpen: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorkoutModal = ({workout, modalOpen, handleClose} : WorkoutModalProps) => {
    const dispatch = useAppDispatch();
    
    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
        >
            <div className='workoutModalContainer'>
                <div className="workoutModalLabel">
                    {workout.name}
                </div>
                <div className='workoutModalGrid'>
                    <div className='workoutModalSection'>
                        <u>Equipment</u>
                        <div className='description'>
                            {workout.equipment}
                        </div>
                    </div>
                    <div className='workoutModalSection'>
                        <u>Difficulty</u>
                        <div className='description'>
                            {`${workout.difficulty} star`}
                        </div>
                    </div>
                    <div className='workoutModalSection'>
                        <img src='/images/suits/clubs.svg' className='icon'/>
                        <div className='description'>
                            {workout.clubs_exercise}
                        </div>
                    </div>
                    <div className='workoutModalSection'>
                        <img src='/images/suits/diamonds.svg' className='icon'/>
                        <div className='description'>
                            {workout.diamonds_exercise}
                        </div>
                    </div>
                    <div className='workoutModalSection'>
                        <img src='/images/suits/hearts.svg' className='icon'/>
                        <div className='description'>
                            {workout.hearts_exercise}
                        </div>
                    </div>
                    <div className='workoutModalSection'>
                        <img src='/images/suits/spades.svg' className='icon'/>
                        <div className='description'>
                            {workout.spades_exercise}
                        </div>
                    </div>
                    {workout.aces_exercise && (
                        <div className='workoutModalSection wholeRowModal'>
                            <div className='aceColumn'>
                                <img src='/images/suits/aces.svg' className='icon'/>
                                <div className='description'>
                                    {workout.aces_exercise}
                                </div>
                            </div>
                            <div className='aceColumn'>
                                <span className='timeText'>Time</span>
                                <div className='description'>
                                    {workout.timer_used ? 
                                        <div>{`${workout.aces_minutes_to_do} minute(s) ${workout.aces_seconds_to_do} second(s)`}</div>
                                    :
                                        <div>No timer set</div>
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className='selectButtonContainer'>
                    <Button
                        variant="contained"
                        className='selectButton'
                        onClick={() => {
                            dispatch(setClubsExercise(workout.clubs_exercise));
                            dispatch(setDiamondsExercise(workout.diamonds_exercise));
                            dispatch(setHeartsExercise(workout.hearts_exercise));
                            dispatch(setSpadesExercise(workout.spades_exercise));
                            dispatch(setAcesExercise(workout.aces_exercise));
                            dispatch(setBreakoutAces(workout.breakout_aces));
                            dispatch(setAcesTimerUsed(workout.timer_used));
                            dispatch(setAcesMinutesToDo(workout.aces_minutes_to_do));
                            dispatch(setAcesSecondsToDo(workout.aces_seconds_to_do));
                        }}
                    >
                        Select
                    </Button>
                </div>
            </div>
        </Modal>
    );

}

export default WorkoutModal;
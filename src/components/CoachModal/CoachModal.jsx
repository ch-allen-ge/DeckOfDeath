import './coachModal.css';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux'

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

const CoachModal = ({workout, modalOpen, handleClose}) => {
    const dispatch = useDispatch();

    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
        >
            <div className='coachModalContainer'>
                <div className="coachModalLabel">
                    {workout.title}
                </div>
                <div className='coachModalGrid'>
                    <div className='coachModalSection'>
                        <u>Equipment</u>
                        <div className='description'>
                            {workout.equipment}
                        </div>
                    </div>
                    <div className='coachModalSection'>
                        <u>Difficulty</u>
                        <div className='description'>
                            {`${workout.difficulty} star`}
                        </div>
                    </div>
                    <div className='coachModalSection'>
                        <img src='/images/suits/clubs.svg' className='icon'/>
                        <div className='description'>
                            {workout.clubs}
                        </div>
                    </div>
                    <div className='coachModalSection'>
                        <img src='/images/suits/diamonds.svg' className='icon'/>
                        <div className='description'>
                            {workout.diamonds}
                        </div>
                    </div>
                    <div className='coachModalSection'>
                        <img src='/images/suits/hearts.svg' className='icon'/>
                        <div className='description'>
                            {workout.hearts}
                        </div>
                    </div>
                    <div className='coachModalSection'>
                        <img src='/images/suits/spades.svg' className='icon'/>
                        <div className='description'>
                            {workout.spades}
                        </div>
                    </div>
                    {workout.aces.exercise && (
                        <div className='coachModalSection wholeRow'>
                            <div className='aceColumn'>
                                <img src='/images/suits/aces.svg' className='icon'/>
                                <div className='description'>
                                    {workout.aces.exercise}
                                </div>
                            </div>
                            <div className='aceColumn'>
                                <span className='timeText'>Time</span>
                                <div className='description'>
                                    {workout.aces.timerUsed ? 
                                        <div>{`${workout.aces.minutesToDo} minute(s) ${workout.aces.secondsToDo} second(s)`}</div>
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
                            dispatch(setClubsExercise(workout.clubs));
                            dispatch(setDiamondsExercise(workout.diamonds));
                            dispatch(setHeartsExercise(workout.hearts));
                            dispatch(setSpadesExercise(workout.spades));
                            dispatch(setAcesExercise(workout.aces.exercise));
                            dispatch(setAcesTimerUsed(workout.aces.timerUsed));
                            dispatch(setAcesMinutesToDo(workout.aces.minutesToDo));
                            dispatch(setAcesSecondsToDo(workout.aces.secondsToDo));

                            if (workout.aces.exercise) {
                                dispatch(setBreakoutAces(true));
                            } else {
                                dispatch(setBreakoutAces(false));
                            }

                        }}
                    >
                        Select
                    </Button>
                </div>
            </div>
        </Modal>
    );

}

export default CoachModal;
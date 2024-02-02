import workouts from '../../utils/CoachWorkouts';
import './coachZone.scss';
import WorkoutDisplay from '../WorkoutDisplay/WorkoutDisplay.tsx';
import { useState } from 'react';
import Person4RoundedIcon from '@mui/icons-material/Person4Rounded';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../hooks.ts';
import { 
    setClubsExercise,
    setDiamondsExercise,
    setHeartsExercise,
    setSpadesExercise,
    setAcesExercise,
    setAcesTimerUsed,
    setAcesMinutesToDo,
    setAcesSecondsToDo
} from '../../reduxSlices/exercisesChosenSlice';
import { setBreakoutAces } from '../../reduxSlices/workoutOptionsSlice';
import Modal from '@mui/material/Modal';

interface CoachWorkout {
    name: string,
    equipment: string,
    difficulty: number,
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

const CoachZone = () => {
    const isMobile = window.innerWidth < 600;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [selectedWorkout, setSelectedWorkout] = useState<CoachWorkout>();
    const [modalOpen, setModalOpen] = useState(false);

    const CoachCard = ({workout} : {workout: CoachWorkout}) => {
        return (
            <div
                className='coachCard'
                onClick={() => {
                    setSelectedWorkout(workout);

                    if (isMobile) {
                        setModalOpen(true);
                    }
                }}>
                <Person4RoundedIcon />
                {workout.name}
            </div>
        )
    }

    const handleClick = () => {
        if (selectedWorkout) {
            dispatch(setClubsExercise(selectedWorkout.clubs_exercise));
            dispatch(setDiamondsExercise(selectedWorkout.diamonds_exercise));
            dispatch(setHeartsExercise(selectedWorkout.hearts_exercise));
            dispatch(setSpadesExercise(selectedWorkout.spades_exercise));
            dispatch(setAcesExercise(selectedWorkout.aces_exercise));
            dispatch(setBreakoutAces(selectedWorkout.breakout_aces));
            dispatch(setAcesTimerUsed(selectedWorkout.timer_used));
            dispatch(setAcesMinutesToDo(selectedWorkout.aces_minutes_to_do));
            dispatch(setAcesSecondsToDo(selectedWorkout.aces_seconds_to_do));
            navigate('/');
        }
    }

    const content = () => {
        if (selectedWorkout) {
            if (isMobile) {
                return (
                    <Modal
                        open={modalOpen}
                        onClose={() => {
                            setModalOpen(false);
                            setSelectedWorkout(undefined);
                        }}
                    >
                        {selectedWorkout ?
                            <div className='coachZoneModalContainer'>
                                <div>{selectedWorkout.name}</div>
                                <WorkoutDisplay workout={selectedWorkout} />
                                <div className='confirmButton'>
                                    <Button onClick={handleClick}>
                                        Select
                                    </Button>
                                </div>
                            </div>
                        : <div></div>
                        }
                    </Modal>
                );
            } else {
                return (
                    <div className='workoutDisplayWrapper'>
                        <WorkoutDisplay workout={selectedWorkout} />
                        <div className='confirmButton'>
                            <Button onClick={handleClick}>
                                Select
                            </Button>
                        </div>
                    </div>
                );
            }
        } else {
            return (
                <div className='selectAWorkout'>
                    Select a workout!
                </div>
            )
        }
    }

    return (
        <>
            <div className='coachZoneContainer'>
                <div className='coachZoneTextContainer'>
                    <h1 className='coachZoneText'>Coach Zone</h1>
                </div>

                <div className='coachWorkoutCards'>
                    {workouts.map((workout, index) =>
                        <CoachCard
                            workout={workout}
                            key={index}
                        />
                    )}
                </div>

                {content()}
            </div>
        </>
    )
}

export default CoachZone;
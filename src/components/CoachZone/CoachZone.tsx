import workouts from '../../utils/CoachWorkouts';
import './coachZone.scss';
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
import TimerIcon from '@mui/icons-material/Timer';
import { useRef, useState } from 'react';

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
    aces_seconds_to_do: number,
    icon: React.ReactNode
}

const CoachZone = () => {
    const isMobile = window.innerWidth < 1100;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleClick = (selectedWorkout : CoachWorkout) => {
        dispatch(setClubsExercise(selectedWorkout.clubs_exercise));
        dispatch(setDiamondsExercise(selectedWorkout.diamonds_exercise));
        dispatch(setHeartsExercise(selectedWorkout.hearts_exercise));
        dispatch(setSpadesExercise(selectedWorkout.spades_exercise));
        dispatch(setAcesExercise(selectedWorkout.aces_exercise));
        dispatch(setBreakoutAces(selectedWorkout.breakout_aces));
        dispatch(setAcesTimerUsed(selectedWorkout.timer_used));
        dispatch(setAcesMinutesToDo(selectedWorkout.aces_minutes_to_do));
        dispatch(setAcesSecondsToDo(selectedWorkout.aces_seconds_to_do));
        navigate('/workout');
    }

    const getWorkoutContent = (workout: CoachWorkout) => {
        return (
            <div className='coachworkout'>
                <div className="godBackground" />
                <div className='coachworkout__column'>
                    <div className='coachworkout__column__exercise'>
                        <img className='coachworkout__column__exercise__suit' src={`/images/suits/clubs.svg`}/>
                        {workout.clubs_exercise}
                    </div>
                    <div className='coachworkout__column__exercise'>
                        <img className='coachworkout__column__exercise__suit' src={`/images/suits/diamonds.svg`}/>
                        {workout.diamonds_exercise}
                    </div>
                    <div className='coachworkout__column__exercise'>
                        <img className='coachworkout__column__exercise__suit' src={`/images/suits/hearts.svg`}/>
                        {workout.hearts_exercise}
                    </div>
                    <div className='coachworkout__column__exercise'>
                        <img className='coachworkout__column__exercise__suit' src={`/images/suits/spades.svg`}/>
                        {workout.spades_exercise}
                    </div>
                    {workout.breakout_aces && (
                        <>
                            <div className='coachworkout__column__exercise'>
                                <img className='coachworkout__column__exercise__suit' src={`/images/suits/aces.svg`}/>
                                {workout.aces_exercise}
                                
                            </div>
                            {workout.timer_used && (
                                <div className='coachworkout__column__exercise'>
                                    <div className='coachworkout__column__exercise__row'>
                                        <img className='coachworkout__column__exercise__suit' src={`/images/suits/aces.svg`}/>
                                        <TimerIcon />
                                    </div>
                                    <div>
                                        {workout.aces_minutes_to_do}:{workout.aces_seconds_to_do}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    }

    const CoachCard = ({workout} : {workout: CoachWorkout}) => {
        const [selected, setSelected] = useState(false);

        return (
            <>
                <div
                    className={`coachcard ${selected ? 'selectedCoachcard' : ''}`}
                    onMouseEnter={() => {
                        if (!isMobile) {
                            setSelected(true)
                        }
                    }}
                    onClick={() => {
                        if (isMobile) {
                            const selectedCoachCard = document.querySelector('.selectedCoachcard');
                            selectedCoachCard?.classList.remove('selectedCoachcard');
                            setSelected((prevState) => !prevState);
                        }
                    }}
                >
                    <div className="godBackground" />
                    
                    <div className='coachcard__icons'>
                        <div className="coachcard__icons__wrapper">
                            {workout.icon}
                        </div>
                        <div className="coachcard__icons__wrapper">
                            {workout.icon}
                        </div>
                    </div>
                    {selected &&
                        <>
                            <div className='coachcard__workoutname'>
                                {workout.name}
                            </div>
                            <div className='coachcard__workout'>
                                {getWorkoutContent(workout)}
                            </div>
                            <div className='coachcard__confirmbutton'>
                                <Button className='big-button' onClick={() => {
                                    handleClick(workout);
                                }}>
                                    Start
                                </Button>
                            </div>
                        </>
                    }
                </div>
            </>
        )
    }

    return (
        <div className='coachzone'>
            <div className='coachzone__workout-container'>
                {workouts.map((workout, index) =>
                    <CoachCard
                        workout={workout}
                        key={index}
                    />
                )}
            </div>
        </div>
    )
}

export default CoachZone;
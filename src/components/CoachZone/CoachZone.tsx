import { useState, FC } from 'react';
import CoachModal from '../CoachModal';
import workouts from '../../coachWorkouts';
import './coachZone.scss';

interface workoutInterface {
    title: string,
    equipment: string,
    difficulty: number,
    clubs: string,
    diamonds: string,
    hearts: string,
    spades: string,
    aces: {
        exercise: string,
        timerUsed: boolean,
        minutesToDo: string | number,
        secondsToDo: string |number
    }
}

const CoachZone: FC = () => {
    const workoutBlock = (workout: workoutInterface, id: number) => {
        const [modalOpen, setModalOpen] = useState(false);
    
        const handleClick = () => {
            setModalOpen(!modalOpen);
        }
    
        return (
            <div className='coachCard' onClick={handleClick} key={id}>
                <div className='workoutTitle'>
                    {workout.title}
                </div>
                <div>
                    {`Difficulty: ${workout.difficulty}`}
                </div>
    
                <CoachModal workout={workout} modalOpen={modalOpen} handleClose={() => {setModalOpen(false)}} />
            </div>
        )
    }

    return (
        <>
            <div className='coachZoneTextContainer'>
                <h1 className='coachZoneText'>Coach Zone</h1>
            </div>
            <div className='coachZoneContainer'>
                {workouts.map((workout: workoutInterface, id: number) => {
                    return (
                        workoutBlock(workout, id)
                    );
                })}
            </div>
        </>
    )
}

export default CoachZone;
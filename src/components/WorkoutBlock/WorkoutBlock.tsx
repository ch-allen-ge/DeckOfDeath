import './workoutBlockStyles.scss';
import { useState } from 'react';
import WorkoutModal from '../WorkoutModal';

interface WorkoutBlockProps {
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
    id: number
}


const WorkoutBlock = ({workout, id}: WorkoutBlockProps) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleClick = () => {
        setModalOpen(!modalOpen);
    }

    const handleClose = () => {
        setModalOpen(false)
    }

    return (
        <div className='workoutBlockCard' onClick={handleClick} key={id}>
            <div className='workoutTitle'>
                {workout.name}
            </div>
            {workout.difficulty &&
                <div>
                    {`Difficulty: ${workout.difficulty}`}
                </div>
            }

            <WorkoutModal workout={workout} modalOpen={modalOpen} handleClose={handleClose} />
        </div>
    )
}

export default WorkoutBlock;
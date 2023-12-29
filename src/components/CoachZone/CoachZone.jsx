import { useState } from 'react';
import CoachModal from '../CoachModal';
import workouts from '../../coachWorkouts';
import './coachZone.css';

const CoachZone = () => {
    const workoutBlock = (workout, id) => {
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
                {workouts.map((workout, id) => {
                    return (
                        workoutBlock(workout, id)
                    );
                })}
            </div>
        </>
    )
}

export default CoachZone;

// {
//     title: 'Dumbell Easy',
//     background: '',
//     equipment: '2 light dumbells',
//     difficulty: 1,
//     duration: '???',
//     clubs: 'dumbell alternating presses each side',
//     diamonds: 'dumbell rows each side',
//     hearts: 'jump squats',
//     spades: 'dumbell lunges each side'
// }
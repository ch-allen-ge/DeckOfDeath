import './myZone.scss';
import { useEffect, useState } from 'react';
import { dodGet } from '../../axios-config';
import { useAppSelector, useAppDispatch } from '../../hooks';
import WorkoutBlock from '../WorkoutBlock';
import { setSavedWorkouts } from '../../reduxSlices/profileSlice';

interface WorkoutInterface {
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

const MyZone = () => {
    const dispatch = useAppDispatch();
    const totalTimeSpent = useAppSelector((state) => state.profile.totalTimeSpent);
    const numberWorkoutsCompleted = useAppSelector((state) => state.profile.numberWorkoutsCompleted);
    const savedWorkoutsArray = useAppSelector((state) => state.profile.savedWorkouts);

    useEffect(() => {
        const getCustomWorkouts = async () => {
          const response = await dodGet('/workouts/getCustomWorkouts');
          const savedWorkouts = response.data;
          dispatch(setSavedWorkouts(savedWorkouts));
        }
        
        getCustomWorkouts();
    }, []);

    return (
        <>
            <div className='myZoneContainer'>
                <div className='myCustomWorkoutsContainer'>
                    <div className='labelText'>Custom Workouts</div>
                </div>

                {savedWorkoutsArray.map((workout: WorkoutInterface, index) => 
                    <WorkoutBlock workout={workout} id={index} key={index}/>
                )}
            </div>
        </>
    )
}

export default MyZone;
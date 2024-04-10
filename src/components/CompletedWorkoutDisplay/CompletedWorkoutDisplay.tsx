import './completedWorkoutDisplayStyles.scss';
import StarRateIcon from '@mui/icons-material/StarRate';
import NotesSection from '../NotesSection';

interface CompletedWorkoutDisplayProps {
    workout: {
        workout_completed_id: number,
        username: string,
        clubs_exercise: string,
        diamonds_exercise: string,
        hearts_exercise: string,
        spades_exercise: string,
        aces_exercise: string,
        breakout_aces: boolean,
        timer_used: boolean,
        aces_minutes_to_do: number,
        aces_seconds_to_do: number,
        time_spent: {
            hours: number,
            minutes: number,
            seconds: number
        },
        date_completed: string,
        name: string,
        rating: number,
        notes: string,
        calories_burnt: number,
        power_score: number,
        average_heart_rate: number,
        hr_monitor_used: boolean
    },
    index: number
};

const CompletedWorkoutDisplay = ({workout, index} : CompletedWorkoutDisplayProps) => {
    const starColor = ['lightgray', 'lightgray', 'lightgray', 'lightgray', 'lightgray'].map((_, index) => index < workout.rating ? 'gold' : 'lightgray');
    
    return (
        <div className='completedWorkoutDisplay' key={index}>
            <div className='completedWorkoutDisplay__header'>
                <div className='title'>{workout.name}</div>
                <div>{new Date(workout.date_completed).toDateString()}</div>
            </div>

            <div className="completedWorkoutDisplay__body">
                <div className='completedWorkoutDisplay__body__section'>
                <div className='completedWorkoutDisplay__body__section__stats'>
                    <div>
                        <div className='data'>{`${workout.time_spent.hours ?? 0}h ${workout.time_spent.minutes ?? 0}m ${workout.time_spent.seconds ?? 0}s`}</div>
                        <div>Elapsed Time</div>
                    </div>

                    <div>
                        <div className='starSection'>
                            <StarRateIcon
                                sx={{color: starColor[0]}}
                                onClick={() => {
                                    //setStars(1);
                                }}
                            />
                            <StarRateIcon
                                sx={{color: starColor[1]}}
                                onClick={() => {
                                    //setStars(2);
                                }}
                            />
                            <StarRateIcon
                                sx={{color: starColor[2]}}
                                onClick={() => {
                                    //setStars(3);
                                }}
                            />
                            <StarRateIcon
                                sx={{color: starColor[3]}}
                                onClick={() => {
                                    //setStars(4);
                                }}
                            />
                            <StarRateIcon
                                sx={{color: starColor[4]}}
                                onClick={() => {
                                    //setStars(5);
                                }}
                            />
                        </div>
                        <div>Rating</div>
                    </div>

                    <div>
                        <div className='data'>{workout.power_score}</div>
                        <div>Power Score</div>
                    </div>

                    {workout.hr_monitor_used && (
                        <div>
                            <div className='data'>{workout.average_heart_rate}</div>
                            <div>Average HR</div>
                        </div>
                    )}
                    
                </div>
                </div>

                <div className='completedWorkoutDisplay__body__section'>
                    <div className='completedWorkoutDisplay__body__section__exerciseList'>
                        <div>{workout.clubs_exercise}</div>
                        <div>{workout.diamonds_exercise}</div>
                        <div>{workout.hearts_exercise}</div>
                        <div>{workout.spades_exercise}</div>

                        {workout.breakout_aces && (
                            <div>{workout.aces_exercise} {workout.timer_used ? `for ${workout.aces_minutes_to_do}m ${workout.aces_seconds_to_do}s` : ''}</div>
                        )}
                    </div>
                    
                </div>

                <div className='completedWorkoutDisplay__body__section'>
                    <NotesSection savedWorkoutId={workout.workout_completed_id} savedNote={workout.notes}/>
                </div>
            </div>
        </div>
    );
};

export default CompletedWorkoutDisplay;
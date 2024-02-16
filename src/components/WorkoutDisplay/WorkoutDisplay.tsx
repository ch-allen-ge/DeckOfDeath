import './workoutDisplayStyles.scss';
import TimerIcon from '@mui/icons-material/Timer';

//workout time is optional because a coach workout doesnt have one, but a completed workout does
interface WorkoutDisplayProps {
    children?: React.ReactNode,
    workout: {
        name?: string,
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
        time_spent?: {
            hours?: number,
            minutes: number,
            seconds: number
        },
        date_completed?: string
    },
    index?: number
}

const WorkoutDisplay = ({children, workout, index} : WorkoutDisplayProps) => {

    const acesTimerToString = () => {
        let minWithZero = '';
        let secondsWithZero = '';
        const minutes = workout.aces_minutes_to_do;
        const seconds = workout.aces_seconds_to_do;
    
        if (minutes < 10) {
            minWithZero = '0' + minutes;
        } else {
            minWithZero = '' + minutes;
        }
    
        if (seconds < 10) {
            secondsWithZero = '0' + seconds;
        } else {
            secondsWithZero = '' + seconds;
        }
    
        return `${minWithZero}:${secondsWithZero}`;
    }

    return (
        <div className='rowContainer' key={index}>
            {children}
            <div className='iconWorkoutSection'>
                <div className='element'>
                    <img className='img' src={`/images/suits/clubs.svg`}/>
                    {workout.clubs_exercise}
                </div>
                <div className='element'>
                    <img className='img' src={`/images/suits/diamonds.svg`}/>
                    {workout.diamonds_exercise}
                </div>
                <div className='element'>
                    <img className='img' src={`/images/suits/hearts.svg`}/>
                    {workout.hearts_exercise}
                </div>
                <div className='element'>
                    <img className='img' src={`/images/suits/spades.svg`}/>
                    {workout.spades_exercise}
                </div>
            </div>

            {workout.breakout_aces && 
                <div className='acesWorkoutSection'>
                    <div className={`element ${!workout.timer_used ? 'wholeRowDisplay' : ''}`}>
                        <img className='img' src={`/images/suits/aces.svg`}/>
                        {workout.aces_exercise}
                    </div>
                    {workout.timer_used &&
                        <div className='element'>
                            <TimerIcon fontSize='large'/>
                            {acesTimerToString()}
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default WorkoutDisplay;
import { TextField } from '@mui/material';
import './finishedPageStyles.scss';
import Button from '../../components/Button';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, useMatch } from 'react-router-dom';
import { resetExercises } from '../../reduxSlices/exercisesChosenSlice';
import { resetOptions } from '../../reduxSlices/workoutOptionsSlice';
import { useEffect, useRef, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuth } from '../../auth/AuthContext';
import { addTheWorkoutCompleted, saveTheCustomWorkout } from '../../api/postRoutes';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
    LinePlot,
    ChartsAxis,
    ChartsReferenceLine,
    ResponsiveChartContainer,
    BarChart
} from '@mui/x-charts';
import { getCurrentUser, getProPicUrl } from '../../api/getRoutes';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { calculateAvg, getDateString, getMaxHeartRate, timeStringToMinNumber } from '../../utils/utils';
import StarRateIcon from '@mui/icons-material/StarRate';
import { getPowerScore, getCaloriesBurned } from '../../utils/utils';
import {
    updateTheNumberWorkoutsCompleted,
    updateTheTotalTime,
    setTheRating,
    saveTheNote
} from '../../api/patchRoutes';

interface FinishedPageProps {
    totalTimeSpent: string,
    heartRateArray: number[],
    timeSpentEachCard: number[],
    progressionTimes: number[],
    workoutFinished: {
        time_spent: string,
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
}

const getGenericWorkoutName = () => {
    const today = new Date();
    const hours = today.getHours();

    if (hours > 6 && hours < 12) {
        return 'Morning Workout';
    } else if (hours >= 12 && hours < 18) {
        return 'Afternoon Workout';
    } else {
        return 'Night Workout';
    }
};

const NoteSection = ({savedWorkoutId} : {savedWorkoutId: number}) => {
    const [note, setNote] = useState('');
    const [addingNotes, setAddingNotes] = useState<boolean>(false);

    const saveNote = useMutation({
        mutationFn: async (note: string) => {
            if (savedWorkoutId) {
                await saveTheNote(savedWorkoutId, note);
            }
        }
    });

    return (
        <div className='subsection vertical'>
            <h3>
                {note === '' ? 'How did it go?' : 'Notes'}
            </h3>
            {addingNotes ? (
                <>
                    <TextareaAutosize
                        onChange={(e) => {
                            setNote(e.target.value);
                        }}
                        value={note}
                        minRows={3}
                        maxRows={3}
                        className='feedbackTextarea'
                    />
                    <div className='noteButtonRow'>
                        <Button
                            onClick={() => {
                                if (note !== '') {
                                    saveNote.mutate(note);
                                }
                                setAddingNotes(false);
                            }}
                            styles={{
                                fontSize: 'small'
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={() => {
                                setAddingNotes(false);
                            }}
                            styles={{
                                fontSize: 'small'
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </>
            ): (
                <>
                    {note === '' ? (
                        <Button
                            onClick={() => {
                                setAddingNotes(true);
                            }}
                            styles={{
                                fontSize: 'small'
                            }}
                        >
                            Add notes
                        </Button>
                    ) : (
                        <>
                            <div>{note}</div>
                            <Button
                                onClick={() => {
                                    setAddingNotes(true);
                                }}
                                styles={{
                                    fontSize: 'small'
                                }}
                            >
                                Edit
                            </Button>
                        </>
                        
                    )}
                </>
            )}
        </div>
    );
};

//is rerendered like, 5 times for some reason
const FinishedPage = () => {
    const { state } = useLocation();
    let {
        totalTimeSpent,
        heartRateArray,
        timeSpentEachCard,
        progressionTimes,
        workoutFinished
    } : FinishedPageProps = state;

    console.log(workoutFinished);

    const isMobile = window.innerWidth < 800;
    const onFinishedPage = useMatch('/finished');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const [workoutName, setWorkoutName] = useState<string>(() => getGenericWorkoutName());
    const [saveWorkoutError, setSaveWorkoutError] = useState<boolean>(false);
    const [savedWorkout, setSavedWorkout] = useState<boolean>(false);
    const [starColor, setStarColor] = useState<string[]>(['lightgray', 'lightgray', 'lightgray', 'lightgray', 'lightgray']);

    const savedWorkoutId = useRef<number>();

    const {
        data: currentUser
    } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser
    });

    const avgHeartRate = calculateAvg(heartRateArray);
    const totalMinSpent = timeStringToMinNumber(totalTimeSpent);
    const timeSpentEachCardMinutes = timeSpentEachCard.map((secondsTotal: number) => secondsTotal / 60);
    const maxHeartRate = getMaxHeartRate(currentUser.age);
    const powerScore = getPowerScore(heartRateArray, maxHeartRate, totalMinSpent);
    const caloriesBurned = getCaloriesBurned({
        avgHeartRate,
        totalMinSpent,
        gender: currentUser ? currentUser.gender : 'male',
        weight: currentUser ? currentUser.weight : 150,
        weightUnits: currentUser ? currentUser.weightUnits : 'lbs',
        age: currentUser ? currentUser.age : 30
    });
    const hrMonitorUsed = heartRateArray.length !== 0;

    const workoutCompleted = {
        name: workoutName,
        ...workoutFinished,
        caloriesBurned,
        powerScore,
        avgHeartRate,
        hrMonitorUsed
    };

    const addWorkoutCompleted = useMutation({
        mutationFn: async (completedWorkout: any) => {
            console.log(hrMonitorUsed);
            const response = await addTheWorkoutCompleted(completedWorkout);
            return response;
        }
    });

    const updateNumberWorkoutsCompleted = useMutation({
        mutationFn: async () => {
            await updateTheNumberWorkoutsCompleted();
        }
    });

    const updateTotalTime = useMutation({
        mutationFn: async (timeSpent: string) => {
            await updateTheTotalTime(timeSpent);
        }
    });

    const setRating = useMutation({
        mutationFn: async (starNumber: number) => {
            if (savedWorkoutId.current) {
                await setTheRating(savedWorkoutId.current, starNumber);
            }
        }
    });

    useEffect(() => {
        const saveWorkoutToDb = async () => {
            if (isLoggedIn) {
                try {
                    await updateTotalTime.mutateAsync(totalTimeSpent);
    
                    await updateNumberWorkoutsCompleted.mutateAsync();
    
                    const savedWorkoutIdFromDb = await addWorkoutCompleted.mutateAsync(workoutCompleted);
                    savedWorkoutId.current = savedWorkoutIdFromDb.data[0].workout_completed_id;
                } catch (e) {
                    throw e;
                }
            }
        };
        
        if (!onFinishedPage) {
            saveWorkoutToDb();
        };
    }, []);

    const setStars = (starNumber: number) => {
        setStarColor((prev) => prev.map((_, index) => index < starNumber ? 'gold' : 'lightgrey'));
        setRating.mutateAsync(starNumber);
    };

    const returnHome = () => {
        dispatch(resetExercises());
        dispatch(resetOptions());
        navigate('/');
    };

    const {
        data: proPicUrl
    } = useQuery({ 
        queryKey: ['proPicUrl'],
        queryFn: getProPicUrl
    });

    const saveWorkout = useMutation({
        mutationFn: async () => {
            if (workoutName !== '') {
                await saveTheCustomWorkout(workoutCompleted);
            }
        },
        onSuccess: () => {
            setSavedWorkout(true);
        },
        onError: () => {
            setSaveWorkoutError(true);
        }
    });

    return (
        <div className='finished-page'>
            <div className="finished-page__information">
                <div className='finished-page__information__element'>
                    <div className='finished-page__information__element--section'>
                        <div className='subsection'>
                            <div className='profilePic__container'>
                                <img className='profilePic' src={proPicUrl}/>
                            </div>
                            
                            <div className='info_block'>
                                <div className='smallText'>{getDateString()}</div>
                                <div className='bigText'>{workoutName}</div>
                            </div>
                        </div>

                        {isMobile ? (
                            <div className='subsection spaceAround'>
                                <div className='info_block center'>
                                    <div className='bigText'>{totalTimeSpent}</div>
                                    <div className='smallText'>Time Spent</div>
                                </div>
                                <div className='info_block center'>
                                    <div className='bigText'>{caloriesBurned}</div>
                                    <div className='smallText'>Calories Burned</div>
                                </div>
                                <div className='info_block center'>
                                    <div className='bigText'>{powerScore}</div>
                                    <div className='smallText'>Power Score</div>
                                </div>
                            </div>
                        ) : (
                            <NoteSection savedWorkoutId={savedWorkoutId.current as number} />
                        )}

                        <div className='subsection vertical'>
                            Rate this workout: 
                            <div className='starSection'>
                                <StarRateIcon
                                    sx={{color: starColor[0]}}
                                    onClick={() => {
                                        setStars(1);
                                    }}
                                />
                                <StarRateIcon
                                    sx={{color: starColor[1]}}
                                    onClick={() => {
                                        setStars(2);
                                    }}
                                />
                                <StarRateIcon
                                    sx={{color: starColor[2]}}
                                    onClick={() => {
                                        setStars(3);
                                    }}
                                />
                                <StarRateIcon
                                    sx={{color: starColor[3]}}
                                    onClick={() => {
                                        setStars(4);
                                    }}
                                />
                                <StarRateIcon
                                    sx={{color: starColor[4]}}
                                    onClick={() => {
                                        setStars(5);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='finished-page__information__element--section'>
                        {isMobile ? (
                            <NoteSection savedWorkoutId={savedWorkoutId.current as number} />
                        ) : (
                            <div className='subsection spaceAround'>
                                <div className='info_block center'>
                                    <div className='bigText'>{totalTimeSpent}</div>
                                    <div className='smallText'>Time Spent</div>
                                </div>
                                <div className='info_block center'>
                                    <div className='bigText'>{caloriesBurned}</div>
                                    <div className='smallText'>Calories Burned</div>
                                </div>
                                <div className='info_block center'>
                                    <div className='bigText'>{powerScore}</div>
                                    <div className='smallText'>Power Score</div>
                                </div>
                            </div>
                        )}
                        

                        {isLoggedIn && (
                            <div className='subsection vertical noPadding'>
                                <div className='exerciseDescription vertical'>
                                    <div>
                                        <span className='suitIcon'>&#9827;</span> {workoutCompleted.clubs_exercise}
                                    </div>
                                    <div>
                                        <span className='suitIcon'>&#9830;</span> {workoutCompleted.diamonds_exercise}
                                    </div>
                                    <div>
                                        <span className='suitIcon'>&#9829;</span> {workoutCompleted.hearts_exercise}{workoutCompleted.hearts_exercise}
                                    </div>
                                    <div>
                                        <span className='suitIcon'>&#9824;</span> {workoutCompleted.spades_exercise}
                                    </div>
                                    {workoutCompleted.aces_exercise && (
                                        <div>
                                            <span className='suitIcon'>&#x41;</span> {workoutCompleted.aces_exercise}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className='finished-page__information__element vertical'>
                    <div className='finished-page__information__element__label'>Time breakdown</div>
                    <div className='graphElement'>
                        <BarChart
                            yAxis={[{
                                scaleType: 'band',
                                data: [
                                    `${"\u2663"}`,
                                    `${"\u2666"}`,
                                    `${"\u2665"}`,
                                    `${"\u2660"}`,
                                ]
                            }]}
                            series={[{ data: timeSpentEachCardMinutes }]}
                            layout="horizontal"
                            slotProps={{
                                legend: { hidden: true },
                            }}
                            axisHighlight={{ x: 'none', y: 'none' }}
                            xAxis= {[
                                {
                                    label: 'Time spent (min)'
                                },
                            ]}
                            sx={{
                                '.MuiChartsAxis-directionY': {
                                    '.MuiChartsAxis-tickContainer': {
                                        'text': {
                                            '& > :first-of-type': {
                                                fontSize: '2rem !important'
                                            }
                                            
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                {heartRateArray.length > 0 && (
                    <div className='finished-page__information__element vertical'>
                        <div className='finished-page__information__element__label'>Heart Rate</div>
                        <div className='graphElement'>
                            <ResponsiveChartContainer
                                series={[{
                                    type: 'line',
                                    data: heartRateArray
                                }]}
                                xAxis={[{  data: Array.from({ length: heartRateArray.length }, (_, index) => index) }]}
                                sx={{
                                    '.MuiLineElement-root': {
                                        stroke: '#8884d8',
                                        strokeWidth: 2
                                    },
                                    '.MuiLineElement-series-hr_avg': {
                                        strokeDasharray: '5 5'
                                    }
                                }}
                            >
                                <LinePlot />
                                <ChartsReferenceLine
                                    y={avgHeartRate}
                                    label="avg"
                                    labelAlign="end"
                                    lineStyle={{stroke: '#128128', strokeDasharray: '3 3'}}
                                />
                                <ChartsAxis bottomAxis={{disableLine: true}}/>
                            </ResponsiveChartContainer>
                        </div>
                    </div>
                )}

                <div className='finished-page__information__element vertical'>
                    <div className='finished-page__information__element__label'>Progression</div>
                    <div className='finished-page__information__element__contents graphElement'>
                        <ResponsiveChartContainer
                            series={[{
                                type: 'line',
                                curve: "stepAfter",
                                data: progressionTimes
                            }]}
                            yAxis={[{
                                label: 'Time (Minutes)'
                            }]}
                            xAxis={[{
                                label: 'Card Number',
                                data: Array.from({ length: progressionTimes.length }, (_, index) => index)
                            }]}
                            sx={{
                                '.MuiLineElement-root': {
                                    stroke: '#8884d8',
                                    strokeWidth: 2
                                }
                            }}
                        >
                            <LinePlot />
                            <ChartsAxis/>
                        </ResponsiveChartContainer>
                    </div>
                </div>

                {isLoggedIn && (
                    <div className='finished-page__information__element vertical'>
                        <div className='bigText centered'>
                            Save Workout
                        </div>
                        <div className='smallText centered'>
                            Saving allows you to quickly replay by selecting it in the Saved tab
                        </div>
                        <div className='workoutNameInput'>
                            <TextField
                                label='Workout Name'
                                variant="outlined"
                                autoComplete='off'
                                onChange={(e) => {
                                    setSaveWorkoutError(false);
                                    if (e.target.value !== '') {
                                        setWorkoutName(e.target.value);
                                    } else {
                                        setWorkoutName(getGenericWorkoutName());
                                    }
                                }}
                                error={saveWorkoutError}
                            />

                            {savedWorkout
                                ?
                                <CheckCircleIcon />
                                :
                                <Button
                                    onClick={() => saveWorkout.mutate()}
                                >
                                    Save
                                </Button>
                            }
                        </div>
                    </div>
                )}

                <div className='homeButton'>
                    <Button
                        onClick={returnHome}
                    >
                        Back Home
                    </Button>
                </div>
            </div>

            
        </div>
    );
}

export default FinishedPage;
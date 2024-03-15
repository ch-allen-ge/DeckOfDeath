import { useEffect, useState, useRef } from "react";
import CurrentCard from "../CurrentCard";
import Button from '@mui/material/Button';
import DeterminateCountdown from "../DeterminateCountdown/DeterminateCountdown";
import CountdownTimer from "../CountdownTimer";
import MetricsBar from "../MetricsBar/MetricsBar";
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FinishedPage from "../../Pages/FinishedPage";
import { resetExercises } from "../../reduxSlices/exercisesChosenSlice";
import { resetOptions } from "../../reduxSlices/workoutOptionsSlice";
import { useAuth } from "../../auth/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { addTheWorkoutCompleted } from "../../api/postRoutes";
import { 
    updateTheTotalTime,
    updateTheNumberWorkoutsCompleted
} from "../../api/patchRoutes";
import './deckOfDeathGameStyles.scss';
import Countdown from "../Countdown";
import {
    useDeckOfCards
} from "../../utils/deckOfCards";

interface Card {
    code: string,
    value: string,
    suit: string
}

interface TimerProps {
    preStart: boolean;
    inProgress: boolean;
    finished: boolean;
}

interface AceCardProps {
    text: string;
    timerUsed: boolean;
    minutes: number;
    seconds: number;
}

interface RegularCardProps {
    text: string;
}

interface CompletedWorkout {
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

interface TimeSpent {
    timeSpent: string
}

interface Card {
    code: string,
    value: string,
    suit: string
}

const DeckOfDeathGame = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const drawCard = useDeckOfCards();

    const exercisesChosen = useAppSelector((state) => state.exercisesChosen);
    const breakoutAces = useAppSelector((state) => state.workoutOptions.breakoutAces);
    const acesExercise = useAppSelector((state) => state.exercisesChosen.aces.exercise);
    const acesTimerUsed = useAppSelector((state) => state.exercisesChosen.aces.timerUsed);
    const acesMinutesToDo = useAppSelector((state) => state.exercisesChosen.aces.minutesToDo);
    const acesSecondsToDo = useAppSelector((state) => state.exercisesChosen.aces.secondsToDo);

    const [workoutFinished, setWorkoutFinished] = useState<boolean>(false);
    const [currentExercise, setCurrentExercise] = useState<RegularCardProps | AceCardProps | null>(null);
    const [showAceCountdownAnimation, setShowAceCountdownAnimation] = useState<boolean>(false);
    const [showWorkoutTimer, setShowWorkoutTimer] = useState<boolean>(false);
    const [timerStatus, setTimerStatus] = useState<TimerProps>({
        preStart: false,
        inProgress: false,
        finished: false
    });
    const [totalTimeSpent, setTotalTimeSpent] = useState<string>('');
    const [currentCard, setCurrentCard] = useState<Card>();
    const [showWorkoutIntroCountdown, setShowWorkoutIntroCountdown] = useState<boolean>(true);

    const currentExerciseRef = useRef(currentExercise);
    const showWorkoutTimerRef = useRef(false);
    const currentCardAceRef = useRef(false);
    const timerStatusRef = useRef({});
    const timerRef = useRef<HTMLDivElement>(null);
    const allowCardDrawRef = useRef(true);
    const cardsRemainingRef = useRef<number>(51);
    const cardsFinishedRef = useRef<number>(0);

    const setTheCurrentExercise = (data: RegularCardProps | AceCardProps | null) => {
        currentExerciseRef.current = data;
        setCurrentExercise(data);
    }

    const setShowTheWorkoutTimer = (data: boolean) => {
        showWorkoutTimerRef.current = data;
        setShowWorkoutTimer(data);
    }

    const setTheCurrentCardAce = (data: boolean) => {
        currentCardAceRef.current = data;
    }

    const setTheTimerStatus = (data: TimerProps) => {
        timerStatusRef.current = data;
        setTimerStatus(data);
    }

    const setAllowCardDraw = (data: boolean) => {
        allowCardDrawRef.current = data;
    }

    const isMobile = window.innerWidth < 600;

    const addWorkoutCompleted = useMutation({
        mutationFn: async (completedWorkout: CompletedWorkout) => {
            const response = await addTheWorkoutCompleted(completedWorkout);
            return response;
        }
    });

    const updateTotalTime = useMutation({
        mutationFn: async (timeSpent: TimeSpent) => {
            await updateTheTotalTime(timeSpent);
        }
    });

    const updateNumberWorkoutsCompleted = useMutation({
        mutationFn: async () => {
            await updateTheNumberWorkoutsCompleted();
        }
    });

    //workout finished
    useEffect(() => {
        if (isLoggedIn && workoutFinished) {
            try {
                const updateTotalTimeSpent = updateTotalTime.mutate({
                    timeSpent: totalTimeSpent
                });

                const updateWorkoutsCompleted = updateNumberWorkoutsCompleted.mutate();

                const addWorkout = addWorkoutCompleted.mutate({
                    time_spent: totalTimeSpent,
                    clubs_exercise: exercisesChosen.clubs,
                    diamonds_exercise: exercisesChosen.diamonds,
                    hearts_exercise: exercisesChosen.hearts,
                    spades_exercise: exercisesChosen.spades,
                    aces_exercise: acesExercise,
                    breakout_aces: breakoutAces,
                    timer_used: acesTimerUsed,
                    aces_minutes_to_do: acesMinutesToDo,
                    aces_seconds_to_do: acesSecondsToDo
                });

                Promise.all([updateTotalTimeSpent, updateWorkoutsCompleted, addWorkout]);
            } catch (e) {
                throw e;
            }
        }
    }, [workoutFinished]);

    const startTheTimer = () => {
        setTheTimerStatus({
            preStart: false,
            inProgress: true,
            finished: false
        });

        //first show the countdown
        setShowAceCountdownAnimation(true);

        //after 4 seconds, show the actual workout timer
        setTimeout(() => {
            setShowAceCountdownAnimation(false);
            setShowTheWorkoutTimer(true);
        }, 6000);
    };

    //attachs listeners and raws a new card when new deck is obtained
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Enter' && currentCardAceRef.current && !showWorkoutTimerRef.current) { //enter
                startTheTimer();
            } else if (
                e.code === 'Space' &&
                allowCardDrawRef.current &&
                !(
                    currentCardAceRef.current &&
                    currentExerciseRef.current &&
                    'timerUsed' in currentExerciseRef.current
                    && currentExerciseRef.current.timerUsed &&
                    'finished' in timerStatusRef.current &&
                    !timerStatusRef.current.finished
                )
            ) { //space bar
                setAllowCardDraw(false);
                setShowTheWorkoutTimer(false);
                drawNewCard(false);
                setTimeout(() => {
                    setAllowCardDraw(true);
                }, 1000);
            }
        }
    
        document.addEventListener('keydown', handleKeyDown);

        drawNewCard(true);
    
        // cleaning up
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    useEffect(() => {
        currentCard && setTheCurrentExercise(getCurrentExercise());
    }, [currentCard]);

    useEffect(() => {
        if (currentExercise && 'timerUsed' in currentExercise) {
            setTheTimerStatus({
                preStart: true,
                inProgress: false,
                finished: false
            });
        }
    }, [currentExercise]);

    const drawNewCard = async (initialDraw: boolean) => {
        try {
            const cardDrawn = drawCard();

            if (cardDrawn !== undefined) {
                if (!initialDraw) {
                    cardsRemainingRef.current = cardsRemainingRef.current - 1;
                    cardsFinishedRef.current = cardsFinishedRef.current + 1;
                }
                
                setCurrentCard(cardDrawn);
            } else {
                const timeString = timerRef.current?.textContent ?? '';

                const transformTimeString = () => {
                    const timeArray = [0, 0, 0];
                    timeString.split(':').reverse().map((timePiece, index) => timeArray[2-index] = Number(timePiece));
                    return `${timeArray[0]}h ${timeArray[1]}m ${timeArray[2]}s`;
                }

                if (timeString) {
                    setTotalTimeSpent(transformTimeString());
                }
                    
                setWorkoutFinished(true);
            }
        } catch (e) {
            throw e;
        }
    };

    const getCurrentExercise = () => {
        if (!currentCard) {
            return null;
        };

        const cardValue = getCardNumber(currentCard.value);
        const suit = currentCard.suit.toLowerCase();
        let text = '';

        if (cardValue === 'aces') {
            setTheCurrentCardAce(true);
            const exercise = acesExercise;
            const timerUsed = acesTimerUsed;
            const minutes = acesMinutesToDo;
            const seconds = acesSecondsToDo;

            if (timerUsed) {
                text = `${minutes > 0 ? `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}` : ''} ${seconds > 0 ? `${seconds} ${seconds === 1 ? 'second' : 'seconds'}` : ''} of ${exercise}`;
                return {
                    text,
                    timerUsed,
                    minutes,
                    seconds
                }
            } else if (breakoutAces) {
                text = exercise;
            } else {
                const standardAceExercise = exercisesChosen[suit as keyof typeof exercisesChosen];
                text ='14 ' + standardAceExercise;
            }
        } else {
            setTheCurrentCardAce(false);
            const exercise = exercisesChosen[suit as keyof typeof exercisesChosen];
            text = cardValue + ' ' + exercise;
        }

        return {text};
    }

    const getCardNumber = (cardValue: string) => {
        switch (cardValue) {
            case 'JACK':
                return '11';
            case 'QUEEN':
                return '12';
            case 'KING':
                return '13';
            case 'ACE':
                return 'aces';
            default:
                return cardValue;
        }
    };

    const getInstructions = () => {
        const {preStart, inProgress} = timerStatus;

        if (currentExercise && 'timerUsed' in currentExercise) {
            if (preStart) {
                //timer not started yet
                return isMobile ? 'Start Timer' : 'Press enter to start the timer';
            } else if (inProgress) {
                //timer in progress
                if (showAceCountdownAnimation) {
                    return 'Get ready...';
                } else {
                    return '';
                } 
            } else {
                //timer finished
                return isMobile ? 'Next Card' : 'Press space bar for next card';
            }
        } else {
            return isMobile ? 'Next Card' : 'Press space bar for next card';
        }
    };

    //button only for mobile
    const handleWorkoutButtonClicked = () => {
        const {preStart, finished} = timerStatus;

        if (currentExercise && 'timerUsed' in currentExercise && currentExercise.timerUsed) {
            if (preStart) {
                startTheTimer();
            } else if (finished) {
                //timer finished
                drawNewCard(false);
                setShowTheWorkoutTimer(false);
            }
        } else {
            drawNewCard(false);
        }
    };

    const returnHome = () => {
        dispatch(resetExercises());
        dispatch(resetOptions());
        navigate('/');
    }

    return (
        <>
            {showWorkoutIntroCountdown 
                ?
                <Countdown setShowWorkoutIntroCountdown={setShowWorkoutIntroCountdown} />
                :
                <div className="deckofdeathgame">
                    {currentCard && currentExercise && !workoutFinished &&
                        <>
                            <div className="deckofdeathgame__playing-field">
                                <CurrentCard currentCard={currentCard}/>
                                <div className="deckofdeathgame__playing-field__exercise">
                                    <div className="deckofdeathgame__playing-field__exercise__text">
                                        <div>
                                            {currentExercise.text}
                                        </div>

                                        <br />

                                        <div>
                                            {showAceCountdownAnimation && <DeterminateCountdown />}
                                            {showWorkoutTimer && !timerStatus.finished && <CountdownTimer timerInfo={currentExerciseRef.current as AceCardProps ?? null} setTimerStatus={setTheTimerStatus}/>}
                                        </div>

                                        {isMobile ? 
                                            <div>
                                                {!timerStatus.inProgress && <Button variant="contained" onClick={handleWorkoutButtonClicked}>{getInstructions()}</Button>}
                                            </div>
                                            :
                                            <div>
                                                {getInstructions()}
                                            </div>
                                        }
                                    </div>
                                </div>

                                <div
                                    className="exitButton"
                                    onClick={returnHome}
                                >
                                    <ExitToAppIcon />
                                </div>
                            </div>
                            
                            <MetricsBar
                                timerRef={timerRef}
                                cardsFinished={cardsFinishedRef.current}
                                cardsRemaining={cardsRemainingRef.current}
                            />
                        </>
                    }
                    
                    {workoutFinished && 
                        <FinishedPage totalTimeSpent={totalTimeSpent}/>
                    }
                </div>
            }
        </>
    );
}

export default DeckOfDeathGame;

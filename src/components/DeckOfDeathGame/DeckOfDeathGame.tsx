import { useEffect, useState, useRef } from "react";
import CurrentCard from "../CurrentCard";
import Button from '@mui/material/Button';
import DeterminateCountdown from "../DeterminateCountdown/DeterminateCountdown";
import CountdownTimer from "../CountdownTimer";
import MetricsBar from "../MetricsBar/MetricsBar";
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { resetExercises } from "../../reduxSlices/exercisesChosenSlice";
import { resetOptions } from "../../reduxSlices/workoutOptionsSlice";
import './deckOfDeathGameStyles.scss';
import Countdown from "../Countdown";
import { useDeckOfCards } from "../../utils/deckOfCards";
import { useHeartRateMonitor } from "../../devices/BluetoothContext";
import HeartRateDisplay from "../HeartRateDisplay";

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

interface Card {
    code: string,
    value: string,
    suit: string
}

const DeckOfDeathGame = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const drawCard = useDeckOfCards();
    const { heartRateMonitor } = useHeartRateMonitor();
    const heartRateArray = useRef<number[]>([]);

    const exercisesChosen = useAppSelector((state) => state.exercisesChosen);
    const breakoutAces = useAppSelector((state) => state.workoutOptions.breakoutAces);
    const acesExercise = useAppSelector((state) => state.exercisesChosen.aces.exercise);
    const acesTimerUsed = useAppSelector((state) => state.exercisesChosen.aces.timerUsed);
    const acesMinutesToDo = useAppSelector((state) => state.exercisesChosen.aces.minutesToDo);
    const acesSecondsToDo = useAppSelector((state) => state.exercisesChosen.aces.secondsToDo);

    const [currentExercise, setCurrentExercise] = useState<RegularCardProps | AceCardProps | null>(null);
    const [showAceCountdownAnimation, setShowAceCountdownAnimation] = useState<boolean>(false);
    const [showWorkoutTimer, setShowWorkoutTimer] = useState<boolean>(false);
    const [timerStatus, setTimerStatus] = useState<TimerProps>({
        preStart: false,
        inProgress: false,
        finished: false
    });
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

    const timeSpentEachCard = useRef([0, 0, 0, 0]);
    let startTime = useRef(new Date());
    let progressionTimes = useRef<number[]>([]);

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
        };
    
        document.addEventListener('keydown', handleKeyDown);

        drawNewCard(true);

        // cleaning up
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        let suitTimeSpentTimer: NodeJS.Timeout;
        
        if (currentCard) {
            setTheCurrentExercise(getCurrentExercise());

            const suitsArray = ['CLUBS', 'DIAMONDS', 'HEARTS', 'SPADES'];

            suitTimeSpentTimer = setInterval(() => {
                timeSpentEachCard.current[suitsArray.indexOf(currentCard.suit)]++;
            }, 1000);

            
            const currentTime = new Date();
            //@ts-ignore
            const timeElapsed = currentTime.getTime() - startTime.current.getTime();
            progressionTimes.current.push(Math.floor(timeElapsed/1000) / 60);
        }

        return () => clearInterval(suitTimeSpentTimer);
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

    const workoutCompleted = () => {
        const timeFromMetricsBar = timerRef.current?.textContent ?? '';
        const timeArray = [0, 0, 0];
        timeFromMetricsBar.split(':').reverse().map((timePiece, index) => timeArray[2-index] = Number(timePiece));
        const totalTimeSpent = `${timeArray[0]}h ${timeArray[1]}m ${timeArray[2]}s`;

        navigate('/finished', {
            state: {
                totalTimeSpent,
                heartRateArray: heartRateArray.current,
                timeSpentEachCard: timeSpentEachCard.current,
                progressionTimes: progressionTimes.current,
                workoutFinished: {
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
                }
            }
        });
    }

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
                workoutCompleted();
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
    };

    const updateHeartRateArray = (heartRate: number) => {
        heartRateArray.current.push(heartRate);
    }

    return (
        <>
            {showWorkoutIntroCountdown ? (
                <Countdown setShowWorkoutIntroCountdown={setShowWorkoutIntroCountdown} />
            ): (
                <div className="deckofdeathgame">
                    {currentCard && currentExercise &&
                        <>
                            <div className="deckofdeathgame__field">
                                <div className="deckofdeathgame__field-card">
                                    <CurrentCard currentCard={currentCard}/>
                                    <div className="deckofdeathgame__field-card__exercise">
                                        <div className="deckofdeathgame__field-card__exercise__text">
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

                                {heartRateMonitor &&
                                    <div className="deckofdeathgame__field-heartRateMonitor">
                                        <HeartRateDisplay updateHeartRateArray={updateHeartRateArray}/>
                                    </div>
                                }
                            </div>
                            
                            <MetricsBar
                                timerRef={timerRef}
                                cardsFinished={cardsFinishedRef.current}
                                cardsRemaining={cardsRemainingRef.current}
                            />
                        </>
                    }
                </div>
            )}
        </>
    );
}

export default DeckOfDeathGame;

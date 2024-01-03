import axios from "axios";
import { useEffect, useState, useRef, FC, ReactElement } from "react";
import CurrentCard from "../CurrentCard";
import Button from '@mui/material/Button';
import DeterminateCountdown from "../DeterminateCountdown/DeterminateCountdown";
import CountdownTimer from "../CountdownTimer";
import MetricsBar from "../MetricsBar/MetricsBar";
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useNavigate } from "react-router-dom";

import {
    setDeckId,
    setCurrentCard,
    setCardsFinished,
    setCardsRemaining
} from "../../reduxSlices/deckSlice";

import { resetExercises } from "../../reduxSlices/exercisesChosenSlice";
import { resetOptions } from "../../reduxSlices/workoutOptionsSlice";
import { resetUI } from "../../reduxSlices/UISlice";
import { resetDeck } from "../../reduxSlices/deckSlice";

import './deckOfDeathGameStyles.scss';

interface TimerProps {
    preStart: boolean,
    inProgress: boolean,
    finished: boolean
}

interface AceCardProps {
    text: string,
    timerUsed?: boolean,
    minutes?: string | number,
    seconds?: string | number
}

interface RegularCardProps {
    text: string
}

const DeckOfDeathGame: FC = (): ReactElement => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const exercisesChosen = useAppSelector((state) => state.exercisesChosen);
    const breakoutAces = useAppSelector((state) => state.workoutOptions.breakoutAces);
    const acesExercise = useAppSelector((state) => state.exercisesChosen.aces.exercise);
    const acesTimerUsed = useAppSelector((state) => state.exercisesChosen.aces.timerUsed);
    const acesMinutesToDo = useAppSelector((state) => state.exercisesChosen.aces.minutesToDo);
    const acesSecondsToDo = useAppSelector((state) => state.exercisesChosen.aces.secondsToDo);
    const deckId = useAppSelector((state) => state.deck.deckId);
    const currentCard = useAppSelector((state) => state.deck.currentCard);

    const [workoutFinished, setWorkoutFinished] = useState<boolean>(false);
    const [currentExercise, setCurrentExercise] = useState<RegularCardProps | AceCardProps | null>(null);
    const [showCountdownAnimation, setShowCountdownAnimation] = useState<boolean>(false);
    const [showWorkoutTimer, setShowWorkoutTimer] = useState<boolean>(false);
    const [timerStatus, setTimerStatus] = useState<TimerProps>({
        preStart: false,
        inProgress: false,
        finished: false
    });
    
    const currentExerciseRef = useRef(currentExercise);
    const showWorkoutTimerRef = useRef(false);
    const currentCardAceRef = useRef(false);
    const timerStatusRef = useRef({});

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

    const isMobile = window.innerWidth < 600;

    //get the new deck
    useEffect(() => {
        axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/')
            .then((response) => {
                dispatch(setDeckId(response.data.deck_id));
            })
            .catch((error) => console.error('could not get new deck', error));
    }, []);

    const startTheTimer = () => {
        setTheTimerStatus({
            preStart: false,
            inProgress: true,
            finished: false
        });

        //first show the countdown
        setShowCountdownAnimation(true);

        //after 4 seconds, show the actual workout timer
        setTimeout(() => {
            setShowCountdownAnimation(false);
            setShowTheWorkoutTimer(true);
        }, 6000);
    };

    //attachs listeners and raws a new card when new deck is obtained
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.code === 'Enter' && currentCardAceRef.current && !showWorkoutTimerRef.current) { //enter
                startTheTimer();
            // @ts-ignore
            } else if (e.code === 'Space' && !(currentCardAceRef.current && currentExerciseRef?.current?.timerUsed && !timerStatusRef.current.finished)) { //space bar
                setShowTheWorkoutTimer(false);
                drawNewCard(false);
            }
        }
    
        document.addEventListener('keydown', handleKeyDown);

        deckId && drawNewCard(true);
    
        // cleaning up
        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [deckId]);

    useEffect(() => {
        currentCard && setTheCurrentExercise(getCurrentExercise());
    }, [currentCard]);

    useEffect(() => {
        // @ts-ignore
        if (currentExercise?.timerUsed) {
            setTheTimerStatus({
                preStart: true,
                inProgress: false,
                finished: false
            });
        }
    }, [currentExercise]);

    const drawNewCard = async (initialDraw: boolean) => {
        await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`)
            .then((response) => {
                const result = response.data;

                if (result.success) {
                    const cardDrawn = result.cards[0];
                    const cardsRemaining = result.remaining;
                    if (!initialDraw) {
                        dispatch(setCardsRemaining(cardsRemaining));
                        dispatch(setCardsFinished(51-cardsRemaining));
                        
                    }
                    dispatch(setCurrentCard(cardDrawn));
                } else {
                    setWorkoutFinished(true);
                }
            })
            .catch((error) => console.error('could not draw new card', error));
    };

    const getCurrentExercise = () => {
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
                text = `${minutes && `${minutes} ${minutes === '1' ? 'minute' : 'minutes'}`} ${seconds && `${seconds} ${seconds === '1' ? 'second' : 'seconds'} of ${exercise}`}`;
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

        // @ts-ignore
        if (currentExercise.timerUsed) {
            if (preStart) {
                //timer not started yet
                return isMobile ? 'Start Timer' : 'Press enter to start the timer';
            } else if (inProgress) {
                //timer in progress
                if (showCountdownAnimation) {
                    return 'Get ready...';
                } else {
                    return 'Timer in progress...';
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

        // @ts-ignore
        if (currentExercise.timerUsed) {
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

    const getCardColor = () => {
        const currentSuit = currentCard.suit.toLowerCase();

        if (currentSuit === 'spades' || currentSuit === 'clubs') {
            return 'blackCard';
        }

        return 'redCard';
    }

    return (
        <div className="deckOfDeathContainer">
            {currentCard && currentExercise && !workoutFinished &&
                <>
                    <div className="cardAndExerciseContainer">
                        <CurrentCard currentCard={currentCard}/>
                        <div className="workoutContainer">
                            <div className="workoutText">
                                <div className="workoutCard">
                                    <div className={`cardLabel ${getCardColor()}`}>
                                        Current Exercise
                                    </div>
                                    <div className="cardText">
                                        {currentExercise.text}
                                    </div>
                                </div>
                                <br />

                                <div className="timerContainer">
                                    {showCountdownAnimation && <DeterminateCountdown />}
                                    {showWorkoutTimer && <CountdownTimer timerInfo={currentExerciseRef.current} setTimerStatus={setTheTimerStatus}/>}
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
                    </div>
                    
                    <MetricsBar />
                </>
            }
            {workoutFinished && 
                <>
                    <div className="finishedText">
                        You finished! Great work!
                    </div>
                    <Button
                        variant="contained"
                        onClick={() => {
                            dispatch(resetExercises());
                            dispatch(resetOptions());
                            dispatch(resetUI());
                            dispatch(resetDeck());
                            navigate('/');
                        }}
                    >
                        Back to start
                    </Button>
                </>
            }
        </div>
    );
}

export default DeckOfDeathGame;

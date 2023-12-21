import axios from "axios";
import { useEffect, useState, useRef } from "react";
import CurrentCard from "../CurrentCard";
import Button from '@mui/material/Button';
import Countdown from "../Countdown";
import CountdownTimer from "../CountdownTimer";

import './deckOfDeathStyles.css'

const DeckOfDeathGame = ({exercisesChosen, workoutOptions}) => {
    const [deckId, setDeckId] = useState(null);
    const [currentCard, setCurrentCard] = useState(null);
    const [currentExercise, setCurrentExercise] = useState(null);
    const [showCountdownAnimation, setShowCountdownAnimation] = useState(false);
    const [showWorkoutTimer, setShowWorkoutTimer] = useState(false);
    const [currentCardAce, setCurrentCardAce] = useState(false);
    const [timerStatus, setTimerStatus] = useState({
        preStart: false,
        inProgress: false,
        finished: false
    });
    const [workoutFinished, setWorkoutFinished] = useState(false);
    const currentExerciseRef = useRef(currentExercise);
    const workoutTimerRef = useRef(false);
    const currentCardAceRef = useRef(false);
    const timerStatusRef = useRef({});

    const setTheCurrentExercise = (data) => {
        currentExerciseRef.current = data;
        setCurrentExercise(data);
    }

    const setTheWorkoutTimer = (data) => {
        workoutTimerRef.current = data;
        setShowWorkoutTimer(data);
    }

    const setTheCurrentCardAce = (data) => {
        currentCardAceRef.current = data;
        setCurrentCardAce(data);
    }

    const setTheTimerStatus = (data) => {
        timerStatusRef.current = data;
        setTimerStatus(data);
    }

    //get the new deck
    useEffect(() => {
        axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/')
            .then((response) => {
                setDeckId(response.data.deck_id);
            });
    }, []);

    //draw a card when the deck is attained
    useEffect(() => {
        deckId && drawNewCard();
    }, [deckId]);

    //this thing needs a lot of ref's to access updated state, is there anything i can do?
    useEffect(() => {
        let showIntroTimerID = null;
        function handleKeyDown(e) {
            if (e.keyCode === 13 && currentCardAceRef.current && !workoutTimerRef.current) {
                setTheTimerStatus({
                    preStart: false,
                    inProgress: true,
                    finished: false
                });
                setShowCountdownAnimation(true);

                showIntroTimerID = setTimeout(() => {
                    setTheWorkoutTimer(true);
                }, 4000);
            } else if (e.keyCode === 32 && !(currentCardAceRef.current && currentExerciseRef.current.timerUsed && !timerStatusRef.current.finished)) {
                workoutTimerRef.current && setTheWorkoutTimer(false);
                drawNewCard();
            }
        }
    
        document.addEventListener('keydown', handleKeyDown);
    
        // cleaning up
        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
            clearTimeout(showIntroTimerID);
        }
    }, [deckId]);

    useEffect(() => {
        currentCard && setTheCurrentExercise(getCurrentExercise());
    }, [currentCard]);

    useEffect(() => {
        if (currentExercise?.timerUsed) {
            setTheTimerStatus({
                preStart: true,
                inProgress: false,
                finished: false
            });
        }
    }, [currentExercise]);

    const drawNewCard = async () => {
        await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`)
            .then((response) => {
                const result = response.data;

                if (result.success) {
                    const cardDrawn = result.cards[0];
                    setCurrentCard(cardDrawn);
                } else {
                    setWorkoutFinished(true);
                }
            });
    };

    const getCurrentExercise = () => {
        const cardValue = getCardNumber(currentCard.value);
        const suit = currentCard.suit.toLowerCase();
        let text = '';

        if (cardValue === 'aces') {
            setTheCurrentCardAce(true);
            const acesObj = exercisesChosen['aces'];
            const exercise = acesObj.exerciseText;
            const timerUsed = acesObj.timerUsed;
            const minutes = acesObj.minutesToDo;
            const seconds = acesObj.secondsToDo;

            if (timerUsed) {
                text = `${minutes && `${minutes} ${minutes === '1' ? 'minute' : 'minutes'}`} ${seconds && `${seconds} ${seconds === '1' ? 'second' : 'seconds'} of ${exercise}`}`;
                return {
                    text,
                    timerUsed,
                    minutes,
                    seconds
                }
            } else if (workoutOptions.breakOutAces) {
                text = exercise;
            } else {
                const standardAceExercise = exercisesChosen[suit].exerciseText;
                text ='14 ' + standardAceExercise;
            }
        } else {
            setTheCurrentCardAce(false);
            const exercise = exercisesChosen[suit].exerciseText;
            text = cardValue + ' ' + exercise;
        }

        return {text};
    }

    const getCardNumber = (cardValue) => {
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
        const {preStart, inProgress, finished} = timerStatus;

        if (currentExercise.timerUsed) {
            if (preStart) {
                //timer not started yet
                return 'Press enter to start the timer';
            } else if (inProgress) { //timer in progress, show nothing
                //timer in progress
                return '';
            } else {
                //timer finished
                return 'Press space bar for next card';
            }
        } else {
            return 'Press space bar for next card';
        }
    }

    return (
        <div className="deckOfDeathContainer">
            {currentCard && currentExercise && !workoutFinished &&
                <>
                    <CurrentCard currentCard={currentCard}/>
                    <div className="workoutText">
                        <div>
                            {currentExercise.text}
                        </div>
                        <br />
                        <div className="instructionsText">
                            {getInstructions()}
                        </div>
                    </div>

                    <div className="timerContainer">
                        {showCountdownAnimation && <Countdown setShowCountdownAnimation={setShowCountdownAnimation} bottomCountdown={true}/>}
                        {showWorkoutTimer && <CountdownTimer timerInfo={currentExerciseRef.current} setTimerStatus={setTheTimerStatus}/>}
                    </div>
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
                            location.reload();
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

// response after all cards have been drawn
// {
//     "success": false,
//     "deck_id": "ubtqj4upmhv1",
//     "cards": [],
//     "remaining": 0,
//     "error": "Not enough cards remaining to draw 26 additional"
// }

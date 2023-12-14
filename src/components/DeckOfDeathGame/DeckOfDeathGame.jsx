import axios from "axios";
import { useEffect, useState } from "react";
import CurrentCard from "../CurrentCard";
import Button from '@mui/material/Button';

import './deckOfDeathStyles.css'

const DeckOfDeathGame = ({exercisesChosen}) => {
    const [deckId, setDeckId] = useState(null);
    const [currentCard, setCurrentCard] = useState(null);
    const [usedCards, setUsedCards] = useState(null);
    const [workoutFinished, setWorkoutFinished] = useState(false);

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

    useEffect(() => {
        function handleKeyDown(e) {``
            if (deckId && e.keyCode === 32) {
                drawNewCard();
            }
        }
    
        document.addEventListener('keydown', handleKeyDown);
    
        // Don't forget to clean up
        return function cleanup() {
          document.removeEventListener('keydown', handleKeyDown);
        }
    }, [deckId]);

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

    const getCardNumber = (cardValue) => {
        switch (cardValue) {
            case 'JACK':
                return '11';
            case 'QUEEN':
                return '12';
            case 'KING':
                return '13';
            case 'ACE':
                return '14';
            default:
                return cardValue;
        }
    }

    const getCurrentExercise = () => {
        const number = getCardNumber(currentCard.value);
        const suit = currentCard.suit.toLowerCase();
        const exercise = exercisesChosen[suit];

        return `${number} ${exercise}`;
    }


    return (
        <div className="deckOfDeathContainer">
            {currentCard && !workoutFinished &&
                <>
                    <CurrentCard currentCard={currentCard}/>
                    <div className="workoutText">
                        <div>
                            {getCurrentExercise()}
                        </div>
                        <br />
                        <div>
                            Press space bar for next card
                        </div>
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

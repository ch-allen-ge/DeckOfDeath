import { useCallback } from "react";

interface Card {
    code: string,
    value: string,
    suit: string
}

//Fisher-Yates shuffle algorithm
const shuffle = (deck: Card[]) => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

const useDeckOfCards = () => {
    let deckOfCards: Card[] = [
        {
            code: '2C',
            value: '2',
            suit: 'CLUBS'
        },
        {
            code: '3C',
            value: '3',
            suit: 'CLUBS'
        },
        {
            code: '4C',
            value: '4',
            suit: 'CLUBS'
        },
        {
            code: '5C',
            value: '5',
            suit: 'CLUBS'
        },
        {
            code: '6C',
            value: '6',
            suit: 'CLUBS'
        },
        {
            code: '7C',
            value: '7',
            suit: 'CLUBS'
        },
        {
            code: '8C',
            value: '8',
            suit: 'CLUBS'
        },
        {
            code: '9C',
            value: '9',
            suit: 'CLUBS'
        },
        {
            code: '10C',
            value: '10',
            suit: 'CLUBS'
        },
        {
            code: 'JC',
            value: 'JACK',
            suit: 'CLUBS'
        },
        {
            code: 'QC',
            value: 'QUEEN',
            suit: 'CLUBS'
        },
        {
            code: 'KC',
            value: 'KING',
            suit: 'CLUBS'
        },
        {
            code: 'AC',
            value: 'ACE',
            suit: 'CLUBS'
        },
        {
            code: '2D',
            value: '2',
            suit: 'DIAMONDS'
        },
        {
            code: '3D',
            value: '3',
            suit: 'DIAMONDS'
        },
        {
            code: '4D',
            value: '4',
            suit: 'DIAMONDS'
        },
        {
            code: '5D',
            value: '5',
            suit: 'DIAMONDS'
        },
        {
            code: '6D',
            value: '6',
            suit: 'DIAMONDS'
        },
        {
            code: '7D',
            value: '7',
            suit: 'DIAMONDS'
        },
        {
            code: '8D',
            value: '8',
            suit: 'DIAMONDS'
        },
        {
            code: '9D',
            value: '9',
            suit: 'DIAMONDS'
        },
        {
            code: '10D',
            value: '10',
            suit: 'DIAMONDS'
        },
        {
            code: 'JD',
            value: 'JACK',
            suit: 'DIAMONDS'
        },
        {
            code: 'QD',
            value: 'QUEEN',
            suit: 'DIAMONDS'
        },
        {
            code: 'KD',
            value: 'KING',
            suit: 'DIAMONDS'
        },
        {
            code: 'AD',
            value: 'ACE',
            suit: 'DIAMONDS'
        },
        {
            code: '2H',
            value: '2',
            suit: 'HEARTS'
        },
        {
            code: '3H',
            value: '3',
            suit: 'HEARTS'
        },
        {
            code: '4H',
            value: '4',
            suit: 'HEARTS'
        },
        {
            code: '5H',
            value: '5',
            suit: 'HEARTS'
        },
        {
            code: '6H',
            value: '6',
            suit: 'HEARTS'
        },
        {
            code: '7H',
            value: '7',
            suit: 'HEARTS'
        },
        {
            code: '8H',
            value: '8',
            suit: 'HEARTS'
        },
        {
            code: '9H',
            value: '9',
            suit: 'HEARTS'
        },
        {
            code: '10H',
            value: '10',
            suit: 'HEARTS'
        },
        {
            code: 'JH',
            value: 'JACK',
            suit: 'HEARTS'
        },
        {
            code: 'QH',
            value: 'QUEEN',
            suit: 'HEARTS'
        },
        {
            code: 'KH',
            value: 'KING',
            suit: 'HEARTS'
        },
        {
            code: 'AH',
            value: 'ACE',
            suit: 'HEARTS'
        },
        {
            code: '2S',
            value: '2',
            suit: 'SPADES'
        },
        {
            code: '3S',
            value: '3',
            suit: 'SPADES'
        },
        {
            code: '4S',
            value: '4',
            suit: 'SPADES'
        },
        {
            code: '5S',
            value: '5',
            suit: 'SPADES'
        },
        {
            code: '6S',
            value: '6',
            suit: 'SPADES'
        },
        {
            code: '7S',
            value: '7',
            suit: 'SPADES'
        },
        {
            code: '8S',
            value: '8',
            suit: 'SPADES'
        },
        {
            code: '9S',
            value: '9',
            suit: 'SPADES'
        },
        {
            code: '10S',
            value: '10',
            suit: 'SPADES'
        },
        {
            code: 'JS',
            value: 'JACK',
            suit: 'SPADES'
        },
        {
            code: 'QS',
            value: 'QUEEN',
            suit: 'SPADES'
        },
        {
            code: 'KS',
            value: 'KING',
            suit: 'SPADES'
        },
        {
            code: 'AS',
            value: 'ACE',
            suit: 'SPADES'
        }
    ];

    let shuffledDeckOfCards = shuffle(deckOfCards);

    const drawCard = useCallback(() => {
        return shuffledDeckOfCards.pop();
    }, []);

    return drawCard;
}

export {
    useDeckOfCards
}
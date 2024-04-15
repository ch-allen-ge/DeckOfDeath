import './currentCardStyles.scss';

interface CurrentCardProps {
    currentCard: {
        code: string,
        value: string,
        suit: string
    }
}

const getCardValue = (value: string) => {
    if (!Number.isNaN(parseInt(value))) {
        return value;
    } else if (value === 'JACK') {
        return 'J';
    } else if (value === 'QUEEN') {
        return 'Q';
    } else if (value === 'KING') {
        return 'K';
    } else {
        return '';
    }
};

const getCardSuit = (suit: string) => {
    switch (suit) {
        case 'SPADES':
            return '♠';
        case 'HEARTS':
            return '♥';
        case 'CLUBS':
            return '♣';
        case 'DIAMONDS':
            return '♦';
        default:
            return '';
    }
};

const CurrentCard = ({currentCard} : CurrentCardProps) => {
    const suitColor = ((currentCard.suit === 'HEARTS' || currentCard.suit === 'DIAMONDS') ? 'suit-red' : 'suit-black');
    const cardValue = getCardValue(currentCard.value);
    const cardSuit = getCardSuit(currentCard.suit);
    return (
        <div className="currentCardContainer">
            <div className="rectangle front-card">
                <div className="left-container">
                    <span className={`num-left ${suitColor}`}>{cardValue}</span>
                    <span className={`suit-left ${suitColor}`}>{cardSuit}</span>
                </div>

                <div className={`face-image  ${suitColor}`}>{cardSuit}</div>

                <div className="right-container">
                    <span className={`num-right ${suitColor}`}>{cardValue}</span>
                    <span className={`suit-right ${suitColor}`}>{cardSuit}</span>
                </div>
            </div>
        </div>
    );
}

export default CurrentCard;
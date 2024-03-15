import './currentCardStyles.scss';

interface CurrentCardProps {
    currentCard: {
        code: string,
        value: string,
        suit: string
    }
}

const CurrentCard = ({currentCard} : CurrentCardProps) => {
    const code = currentCard.code;
    return (
        <div className='currentCardContainer'>
            <img src={`/images/cards/${code}.png`} className='currentCardImg' alt={code}></img>
        </div>
    );
}

export default CurrentCard;
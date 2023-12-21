import './currentCardStyles.css';

const CurrentCard = ({currentCard}) => {
    const cardCode = currentCard.code;
    return (
        <div className='currentCardContainer'>
            <img src={`src/images/cards/${cardCode}.png`} className='currentCardImg' alt={currentCard}></img>
        </div>
    );
}

export default CurrentCard;
import './currentCardStyles.scss';

//external API call response
interface CurrentCardProps {
    currentCard: {
        code: string;
        image: string;
        images: {
            svg: string;
            png: string;
        },
        value: string;
        suit: string;
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
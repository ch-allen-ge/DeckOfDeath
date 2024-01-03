import { FC, ReactElement } from 'react';

import './currentCardStyles.scss';

interface CurrentCardProps {
    currentCard: any
}

const CurrentCard: FC<CurrentCardProps> = ({currentCard}): ReactElement => {
    const cardCode = currentCard.code;
    return (
        <div className='currentCardContainer'>
            <img src={`/images/cards/${cardCode}.png`} className='currentCardImg' alt={currentCard.code}></img>
        </div>
    );
}

export default CurrentCard;
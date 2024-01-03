import { useAppSelector } from '../../hooks';
import { useState, useEffect, useRef } from 'react';
import { FC, ReactElement } from 'react';

import './metricsBarStyles.scss';

const MetricsBar: FC = (): ReactElement => {
    const cardsFinished = useAppSelector((state) => state.deck.cardsFinished);
    const cardsRemaining = useAppSelector((state) => state.deck.cardsRemaining);

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const minutesRef = useRef(minutes);
    const secondsRef = useRef(seconds);

    const setTheMinutes = (data: number) => {
        minutesRef.current = data;
        setMinutes(data);
    }

    const setTheSeconds = (data: number) => {
        secondsRef.current = data;
        setSeconds(data);
    }

    const getTimerString = () => {
        let minWithZero = '';
        let secondsWithZero = '';

        if (minutes < 10) {
            minWithZero = '0' + minutes;
        } else {
            minWithZero = '' + minutes;
        }

        if (seconds < 10) {
            secondsWithZero = '0' + seconds;
        } else {
            secondsWithZero = '' + seconds;
        }

        return `${minWithZero}:${secondsWithZero}`;
    }

    useEffect(() => {
        const timerId = setInterval(() => {
            if (secondsRef.current < 59) {
                setTheSeconds(secondsRef.current+1);
            } else {
                if (secondsRef.current === 59) {
                    setTheMinutes(minutesRef.current+1);
                    setTheSeconds(0);
                }
            }
        }, 1000);
    
        // cleaning up
        return function cleanup() {
            clearInterval(timerId);
        }
    }, []);

    //make it a full width span with 3 elements 
    return (
        <>
            <div className='metricsBarContainer'>
                <div className='metricItem'>
                    <h3 className='label'>Cards Finished:</h3>
                    <h1 className='value'>{cardsFinished}</h1>
                </div>
                <div className='metricItem'>
                    <h3 className='label'>Time Elapsed:</h3>
                    <h1 className='value'>{getTimerString()}</h1>
                </div>
                <div className='metricItem'>
                    <h3 className='label'>Cards Remaining:</h3>
                    <h1 className='value'>{cardsRemaining}</h1>
                </div>
            </div>
        </>
    )
}

export default MetricsBar;
import { useAppSelector } from '../../hooks';
import { useState, useEffect, useRef, RefObject } from 'react';
import './metricsBarStyles.scss';


const MetricsBar = ({timerRef} : {timerRef: RefObject<HTMLDivElement>}) => {
    const cardsFinished = useAppSelector((state) => state.deck.cardsFinished);
    const cardsRemaining = useAppSelector((state) => state.deck.cardsRemaining);

    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    const hoursRef = useRef(hours);
    const minutesRef = useRef(minutes);
    const secondsRef = useRef(seconds);

    const setTheHours = (theHours: number) => {
        hoursRef.current = theHours;
        setHours(theHours);
    }

    const setTheMinutes = (theMinutes: number) => {
        minutesRef.current = theMinutes;
        setMinutes(theMinutes);
    }

    const setTheSeconds = (theSeconds: number) => {
        secondsRef.current = theSeconds;
        setSeconds(theSeconds);
    }

    const getTimerString = () => {
        let minWithZero = '';
        let secondsWithZero = '';

        if (hours > 0 && minutes < 10) {
            minWithZero = '0' + minutes;
        } else {
            minWithZero = '' + minutes;
        }

        if (seconds < 10) {
            secondsWithZero = '0' + seconds;
        } else {
            secondsWithZero = '' + seconds;
        }

        if (hours > 0) {
            return `${hours}:${minWithZero}:${secondsWithZero}`;
        } else {
            return `${minWithZero}:${secondsWithZero}`;
        }
    }

    useEffect(() => {
        const timerId = setInterval(() => {
            // if (minutes = 59 and seconds = 59) add an hours, set minutes = 0, set seconds = 0
            // if (seconds = 59) set minutes + 1, set seconds = 0
            // else, add a second

            if (minutesRef.current === 59 && secondsRef.current === 59) {
                setTheHours(hoursRef.current + 1);
                setTheMinutes(0);
                setTheSeconds(0);
            } else if (secondsRef.current === 59) {
                setTheMinutes(minutesRef.current + 1);
                setTheSeconds(0);
            } else {
                setTheSeconds(secondsRef.current+1);
            }
        }, 1000);
    
        // cleaning up
        return function cleanup() {
            clearInterval(timerId);
        }
    }, []);

    return (
        <>
            <div className='metricsBarContainer'>
                <div className='metricItem'>
                    <div className='label'>Cards Finished:</div>
                    <div className='value'>{cardsFinished}</div>
                </div>
                <div className='metricItem'>
                    <div className='label'>Time Elapsed:</div>
                    <div ref={timerRef} className='value'>{getTimerString()}</div>
                </div>
                <div className='metricItem'>
                    <div className='label'>Cards Remaining:</div>
                    <div className='value'>{cardsRemaining}</div>
                </div>
            </div>
        </>
    )
}

export default MetricsBar;
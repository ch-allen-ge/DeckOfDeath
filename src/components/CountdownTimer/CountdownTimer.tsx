import { useEffect, useRef, useState } from 'react';

import './countdownTimerStyles.scss';

interface AceCardProps {
    text: string;
    timerUsed: boolean;
    minutes: number;
    seconds: number;
}

interface CountdownTimerProps {
    timerInfo: AceCardProps | null;
    setTimerStatus: (params: {
        preStart: boolean;
        inProgress: boolean;
        finished: boolean;
    }) => void
};

const CountdownTimer = ({timerInfo, setTimerStatus} : CountdownTimerProps) => {
    const [minutes, setMinutes] = useState<number>(timerInfo ? timerInfo.minutes : 0);
    const [seconds, setSeconds] = useState<number>(timerInfo ? timerInfo.seconds : 0);

    const minutesRef = useRef(minutes);
    const secondsRef = useRef(seconds);

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

        return `${minWithZero}:${secondsWithZero} remaining`;
    }

    useEffect(() => {
        const timerId = setInterval(() => {
            if (secondsRef.current > 0) {
                setTheSeconds(secondsRef.current-1);
            } else if (minutesRef.current > 0) {
                if (secondsRef.current === 0) {
                    setTheMinutes(minutesRef.current-1);
                    setTheSeconds(59);
                }
            } else {
                //timer is done
                setTimerStatus({
                    preStart: false,
                    inProgress: false,
                    finished: true
                });
            }
        }, 1000);
    
        // cleaning up
        return function cleanup() {
            clearInterval(timerId);
        }
    }, []);

    return (
        <div className='timer-container'>
            {getTimerString()}
            {/* maybe add fireworks animation here if finished  */}
        </div>
    )
}

export default CountdownTimer;
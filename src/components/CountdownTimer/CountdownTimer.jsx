import { useEffect, useRef, useState } from 'react';

import './countdownTimerStyles.css';

const CountdownTimer = ({timerInfo, setTimerStatus}) => {
    const [minutes, setMinutes] = useState(timerInfo.minutes || 0);
    const [seconds, setSeconds] = useState(timerInfo.seconds || 0);
    const [timerDone, setTimerDone] = useState(false);

    const minutesRef = useRef(minutes);
    const secondsRef = useRef(seconds);
    const timerDoneRef = useRef(timerDone);

    const setTheMinutes = (data) => {
        minutesRef.current = data;
        setMinutes(data);
    }

    const setTheSeconds = (data) => {
        secondsRef.current = data;
        setSeconds(data);
    }

    const setTheTimerDone = (data) => {
        timerDoneRef.current = data;
        setTimerDone(data);
    }

    const getTimerString = () => {
        let minWithZero = '';
        let secondsWithZero = '';

        if (minutes < 10) {
            minWithZero = '0' + minutes;
        } else {
            minWithZero = minutes;
        }

        if (seconds < 10) {
            secondsWithZero = '0' + seconds;
        } else {
            secondsWithZero = seconds;
        }

        return `${minWithZero}:${secondsWithZero}`;
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
            clearTimeout(timerId);
        }
    }, []);

    return (
        <div className='timerContainer'>
            <h1>
                {getTimerString()}
            </h1>
            <div>
            {timerDone && <div>Finished</div>}
            </div>
            {/* maybe add fireworks animation here if finished  */}
        </div>
    )

}

export default CountdownTimer;

    {/* // currentExerciseRef.current = {
//     minutes: "1",
//     seconds: "",
//     text: "1 minute of aces",
//     timerUsed: true
// } */}
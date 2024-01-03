import {
    useEffect,
    useRef,
    useState,
    FC,
    ReactElement
} from 'react';

import './countdownTimerStyles.scss';

interface AceCardProps {
    text: string,
    timerUsed?: boolean,
    minutes?: string | number,
    seconds?: string | number
}

interface RegularCardProps {
    text: string
}

interface CountdownTimerProps {
    timerInfo: AceCardProps | RegularCardProps | null,
    setTimerStatus: (params: {
        preStart: boolean,
        inProgress: boolean,
        finished: boolean
    }) => void
};

const CountdownTimer: FC<CountdownTimerProps> = ({timerInfo, setTimerStatus}): ReactElement => {
    // @ts-ignore
    const [minutes, setMinutes] = useState<number>(timerInfo.minutes || 0);
    // @ts-ignore
    const [seconds, setSeconds] = useState<number>(timerInfo.seconds || 0);

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
        <div className='timerContainer'>
            <h1>
                {getTimerString()}
            </h1>
            {/* maybe add fireworks animation here if finished  */}
        </div>
    )
}

export default CountdownTimer;
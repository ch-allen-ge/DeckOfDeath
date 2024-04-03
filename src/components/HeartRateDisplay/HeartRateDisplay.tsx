import './heartRateDisplay.scss';

import { useHeartRateMonitor } from '../../devices/BluetoothContext';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../api/getRoutes';

interface HeartRateDisplayProps {
    updateHeartRateArray: (heartRateValue: number) => void
}

//assume heart rate device is connected here, otherwise component wont be rendered at all
const HeartRateDisplay = ({updateHeartRateArray}: HeartRateDisplayProps) => {
    const {
        data: currentUser
    } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const { heartRateValue } = useHeartRateMonitor();
    const [heartRateColor, setHeartRateColor] = useState<string>('#2debd4');
    const [pointerLocation, setPointerLocation] = useState<number>(0);
    const age = currentUser.age;
    const maxHeartRate = 208 - (0.7 * age);
    const heartRateBarRef = useRef<HTMLDivElement>(null);
    const isMobile = window.innerWidth < 600;
    const heartRate = useRef(0);

    useEffect(() => {
        const accumulateHeartRate = setInterval(() => {
            updateHeartRateArray(heartRate.current);
        }, 5000);

        return () => clearInterval(accumulateHeartRate);
    }, []);

    useEffect(() => {
        setHeartRateColor(getHeartRateColor(heartRateValue));
        setPointerLocation(calculatePointerLocation((heartRateValue/maxHeartRate) * 10));

        heartRate.current = heartRateValue;
    }, [heartRateValue]);

    const calculatePointerLocation = (heartRate: number) => {
        if (heartRateBarRef.current) {
            const point = (((0.1863 * Math.pow(heartRate, 2)) - (0.88657 * heartRate))) / 10 * ( heartRateBarRef.current.offsetWidth / 16);
            if (point < 0) {
                return 0;
            } else if (point > 100) {
                return 100;
            } else {
                return point; 
            };
        } else {
            return 0;
        };
    };

    const HeartRateBar = () => {
        return (
            <div className='heartRateBar' ref={heartRateBarRef}>
                <div className='heartRateBar__pointer' style={{left: `${pointerLocation}rem`}}/>
                <div className='heartRateBar__section heartRateBar__section--veryLight' />
                <div className='heartRateBar__section heartRateBar__section--light' />
                <div className='heartRateBar__section heartRateBar__section--moderate' />
                <div className='heartRateBar__section heartRateBar__section--hard' />
                <div className='heartRateBar__section heartRateBar__section--max' />
            </div>
        );
    }

    const getHeartRateColor = (heartRate: number) => {
        if (heartRate <= 0.645 * maxHeartRate) {
            return '#2debd4';
        } else if ((heartRate > 0.645 * maxHeartRate) && (heartRate <= 0.76 * maxHeartRate)) {
            return '#2deb9b';
        } else if ((heartRate > 0.76 * maxHeartRate) && (heartRate <= 0.855 * maxHeartRate)) {
            return '#e0e322';
        } else if ((heartRate > 0.855 * maxHeartRate) && (heartRate <= 0.935 * maxHeartRate)) {
            return '#e37f22';
        } else {
            return '#ed4845';
        }
    }

    return (
        <>
            {isMobile ? (
                <>
                    <div className='heartRateDisplay'>
                        <HeartRateBar />
                        <div className='heartRateValue'>{heartRateValue} bpm</div>
                    </div>
                </>
            ) : (
                <>
                    <div className='leftBorder' />
                    <div className='heartRateDisplay'>
                        <h1>Heart Rate {age}</h1>
                        <HeartRateBar />

                        <div className='heartRateRing' style={{backgroundColor: heartRateColor}}>
                            <div className='heartRateRing__innerRing'>
                                {heartRateValue}
                                <br />
                                bpm
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
        
    );
};

export default HeartRateDisplay;
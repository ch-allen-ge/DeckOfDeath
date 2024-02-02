import { useEffect, useState } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

import './determinateCountdownStyles.scss';

const DeterminateCountdown = () => {
    const [progress, setProgress] = useState<number>(100);
    const [currentSecond, setCurrentSecond] = useState<number>(0);
    const totalSeconds = 5;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSecond((prev) => prev+1);
            setProgress((prev) => prev-20);
        }, 1000);
    
        setTimeout(() => {
            clearInterval(timer);
        }, 6000);
    }, []);

    return (
        <>
            <span className="countdownText">Starting in {totalSeconds - currentSecond} seconds</span>
            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={progress} />
            </Box>
        </>
    )
}

export default DeterminateCountdown;
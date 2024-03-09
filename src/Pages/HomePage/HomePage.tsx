import './homePageStyles.scss';
import StartingScreen from '../../components/StartingScreen';
import { useEffect } from 'react';
import { resetUI } from '../../reduxSlices/UISlice';

const HomePage = () => {
    useEffect(() => {
        resetUI();
    }, []);

    return (
        <div className='homepage'>
            <StartingScreen />
        </div>
    );
};

export default HomePage;
import './homePageStyles.scss';
import StartingScreen from '../../components/StartingScreen';
import Navbar from '../../components/Navbar';
import { setLoggedIn } from '../../reduxSlices/UISlice';
import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { dodGet } from '../../axios-config';
import { setUsername } from '../../reduxSlices/userSlice';
import { resetUI } from '../../reduxSlices/UISlice';

const HomePage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const response = await dodGet('/authenticateToken');
    
                if (response && response.status === 200) {
                    async function loadUser() {
                        const response = await dodGet('/user/getCurrentUser');
            
                        if (response && response.status === 200) {
                            const user = response.data;
                            dispatch(setUsername(user.username));
                        }
                    };
    
                    dispatch(setLoggedIn(true));
                    loadUser();
                } else {
                    dispatch(setLoggedIn(false));
                }
            } catch (e) {
            
            }
        };

        checkUserLoggedIn();
        resetUI();
    }, []);

    return (
        <div className='homePageContainer'>
            <Navbar />
            <StartingScreen />
        </div>
    );
};

export default HomePage;
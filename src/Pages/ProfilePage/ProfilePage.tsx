import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { dodGet, dodDelete, dodPost } from '../../axios-config';
import './profilePageStyles.scss';
import Navbar from '../../components/Navbar';
import WorkoutDisplay from '../../components/WorkoutDisplay';
import StatsRow from '../../components/StatsRow';
import { setLoggedIn } from '../../reduxSlices/UISlice';
import { setTotalTimeSpent, setNumberWorkoutsCompleted } from '../../reduxSlices/profileSlice';
import { setUsername } from '../../reduxSlices/userSlice';
import CircularProgress from '@mui/material/CircularProgress';
import LoginRegisterPage from '../LoginReigsterPage';
import { Suspense } from 'react';
import Popup from '../../components/Popup';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Button } from '@mui/material';

interface CompletedWorkout {
    clubs_exercise: string,
    diamonds_exercise: string,
    hearts_exercise: string,
    spades_exercise: string,
    aces_exercise: string,
    breakout_aces: boolean,
    timer_used: boolean,
    aces_minutes_to_do: number,
    aces_seconds_to_do: number,
    time_spent: {
        hours?: number,
        minutes: number,
        seconds: number
    },
    date_completed: string
}

const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.UI.loggedIn);
    const username = useAppSelector((state) => state.user.username);
    const totalTimeSpent = useAppSelector((state) => state.profile.totalTimeSpent);
    const numberWorkoutsCompleted = useAppSelector((state) => state.profile.numberWorkoutsCompleted);

    const [workoutsCompleted, setWorkoutsCompleted] = useState<CompletedWorkout[]>([]);
    const [proPicUrl, setProPicUrl] = useState<string>();
    const [file, setFile] = useState<File | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [newProPicPreview, setNewProPicPreview] = useState<string>('');
    
    useEffect(() => {
            const loadUsername = async () => {
                const response = await dodGet('/user/getCurrentUser');
    
                if (response && response.status === 200) {
                    dispatch(setUsername(response.data.username));
                }
            };

        const getWorkoutsCompleted = async () => {
            const response = await dodGet(`/workouts/getCompletedWorkouts`);

            if (response && response.data) {
                setWorkoutsCompleted(response.data);
            }
        }

        const getProPicUrlFromS3 = async () => {
            const response = await dodGet('/profile/getProfilePicUrl');

            if (response && response.data) {
                setProPicUrl(response.data);
            } else {
                setProPicUrl('/images/default_pro_pic.png');
            }
        }

        const loadProfile = async () =>  {
            const response = await dodGet('/profile/getProfile');

            if (response && response.status === 200) {
                const profile = response.data;
                dispatch(setTotalTimeSpent(profile.total_time_spent));
                dispatch(setNumberWorkoutsCompleted(profile.number_workouts_completed));
            }
        }

        const loadInitialData = async () => {
            try {
                const response = await dodGet('/authenticateToken');
        
                if (response && response.status === 200) {
                    dispatch(setLoggedIn(true));
                    loadUsername();
                    getProPicUrlFromS3();
                    getWorkoutsCompleted();
                    loadProfile();
                } else {
                    dispatch(setLoggedIn(false));
                }
            } catch (e) {
            
            }
        }

        loadInitialData();
    }, []);

    const deleteProPic = async () => {
        await dodDelete('/profile/deleteProfilePicture');
        setFile(null);
        setProPicUrl('/images/default_pro_pic.png');
        setShowPopup(false);
    };
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setFile(file);
            const objectUrl = URL.createObjectURL(file);
            setNewProPicPreview(objectUrl);
            setShowPopup(false);
        }
    };

    const changeProPic = async () => {
        let params = new FormData();

        if (file) {
            params.append('profilePic', file);
            const response = await dodPost('/profile/uploadAndSaveProPic', params);
            const newProPicUrl = response.data;
            setProPicUrl(newProPicUrl);
            setNewProPicPreview('');
            setShowPopup(false);
        };
    };

    const cancelNewProPic = () => {
        setNewProPicPreview('');
        setShowPopup(false);
    };

    const timeSpentToString = (workout : CompletedWorkout) => {
        if (workout.time_spent.hours) {
            return `${workout.time_spent.hours} ${workout.time_spent.hours === 1 ? 'hour' : 'hours'} 
                    ${workout.time_spent.minutes ?? 0} ${workout.time_spent.minutes === 1 ? 'minute' : 'minutes'} 
                    ${workout.time_spent.seconds ?? 0} ${workout.time_spent.seconds === 1 ? 'second' : 'seconds'}`;
        } else if (workout.time_spent.minutes) {
            return `${workout.time_spent.minutes} minutes ${workout.time_spent.seconds ?? 0} seconds`;
        } else {
            return `${workout.time_spent.seconds} seconds`;
        }
    };

    return (
        <>
            <Suspense fallback={<CircularProgress />}>
                <div className='profilePageContainer'>
                    <Navbar />
                    {isLoggedIn ?
                        <div className='contentContainer'>
                            <div className='topSection'>
                                <div className='topSectionFlexContainer'>
                                    <div className='cardProfileContainer'>
                                        <div className='profileCardText topName'>
                                            <b>{username.toUpperCase()}</b>
                                        </div>

                                        <div className='profileCardText bottomName'>
                                            <b>{username.toUpperCase()}</b>
                                        </div>

                                        <div className='proPicContainer'>
                                            <img className='proPic' src={proPicUrl} onClick={() => setShowPopup((prevValue) => !prevValue)}/>
                                            {newProPicPreview && <img className='previewProPic' src={newProPicPreview}/>}
                                            <Popup open={showPopup}>
                                                <div className='popupRow'>
                                                    <input
                                                        type='file'
                                                        className='changeProPicInput'
                                                        accept="image/png, image/jpeg"
                                                        onChange={handleFileChange}
                                                    />
                                                    <ImageOutlinedIcon />
                                                    <span className='popupRowText'>
                                                        Change Profile Picture
                                                    </span>
                                                </div>
                                                {proPicUrl !== '/images/default_pro_pic.png' && 
                                                    <div
                                                        className='popupRow'
                                                        onClick={deleteProPic}
                                                    >
                                                        <ImageNotSupportedOutlinedIcon />
                                                        <span className='popupRowText'>Delete Profile Picture</span>
                                                    </div>
                                                }
                                            </Popup>
                                        </div>
                                    </div>
                                </div>

                                {newProPicPreview && 
                                    <div className='saveCancelProPic'>
                                        <div onClick={changeProPic}>
                                            <Button variant='contained'>
                                                <CheckCircleOutlineOutlinedIcon />
                                                Save
                                            </Button>
                                        </div>
                                        <div onClick={cancelNewProPic}>
                                            <Button variant='contained'>
                                                <CancelOutlinedIcon />
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                }
                            </div>

                            <StatsRow totalTimeSpent={totalTimeSpent} numberWorkoutsCompleted={numberWorkoutsCompleted} />

                            <div className='completedWorkoutsContainer'>
                                {workoutsCompleted.reverse().map((workout, index) => 
                                    <WorkoutDisplay workout={workout} index={index} key={index}>
                                        <div className='element bigText'>
                                            {new Date(workout.date_completed).toDateString()}
                                        </div>
                                        <div className='element bigText'>
                                            {timeSpentToString(workout)}
                                        </div>
                                    </WorkoutDisplay>
                                )}
                            </div>
                        </div>
                    :
                        <LoginRegisterPage />
                    }
                </div>
            </Suspense>
            
        </>
        
    )
}

export default ProfilePage;
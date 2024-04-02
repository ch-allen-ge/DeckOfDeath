import { useState } from 'react';
import './profilePageStyles.scss';
import WorkoutDisplay from '../../components/WorkoutDisplay';
import StatsRow from '../../components/StatsRow';
import CircularProgress from '@mui/material/CircularProgress';
import LoginRegisterPage from '../LoginReigsterPage';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { useAuth } from '../../auth/AuthContext';
import { 
    getCompletedWorkouts,
    getProPicUrl,
    getProfile,
    getCurrentUser
} from '../../api/getRoutes';
import { uploadAndSaveTheProPic } from '../../api/postRoutes';
import { deleteTheProPic } from '../../api/deleteRoutes';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Button from '../../components/Button';

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
};

const ProfilePage = () => {
    const queryClient = useQueryClient();
    const { isLoggedIn, isLoggedInStatus } = useAuth();
    const [file, setFile] = useState<File | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [newProPicPreview, setNewProPicPreview] = useState<string>('');

    const setProPic = useMutation({
        mutationFn: async () => {
            let params = new FormData();

            if (file) {
                params.append('profilePic', file);
                const response = await uploadAndSaveTheProPic(params);
                return response.data;
            };
        },
        onSuccess: (newProPicUrl) => {
            queryClient.setQueryData(["proPicUrl"], newProPicUrl);
            setNewProPicPreview('');
            setShowPopup(false);
        }
    });

    const deleteProPic = useMutation({
        mutationFn: async () => {
            await deleteTheProPic();
        },
        onSuccess: () => {
            setFile(null);
            setShowPopup(false);
            queryClient.setQueryData(["proPicUrl"], '/images/default_pro_pic.png');
        }
    });

    if ( !isLoggedIn ) {
        return <LoginRegisterPage />;
    }

    const {
        data: completedWorkouts,
        status: completedWorkoutsStatus,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ['workoutsCompleted'],
        queryFn: getCompletedWorkouts,
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length < 10) {
                return undefined;
            } else {
                return pages.length * 10;
            }
        }
    });

    const {
        data: proPicUrl,
        status: proPicUrlStatus
    } = useQuery({ 
        queryKey: ['proPicUrl'],
        queryFn: getProPicUrl
    });

    const {
        data: profile,
        status: profileStatus
    } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile
    });

    const {
        data: currentUser,
        status: currentUserStatus,
    } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser
    });

    if (isLoggedInStatus === 'pending' || completedWorkoutsStatus === 'pending' || proPicUrlStatus == 'pending' || profileStatus === 'pending' || currentUserStatus === 'pending') {
        return (<CircularProgress />);
    };

    if (completedWorkoutsStatus === 'error' || proPicUrlStatus === 'error' || profileStatus === 'error' || currentUserStatus === 'error') {
        return <h1>Error Loading Profile</h1>;
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
        <div className='profile-page'>
                <div className='profile-page__content'>
                    <div className='profile-page__content__top-section'>
                        <div className='profile-page__content__top-section__profile'>
                            <div className='profile-card'>
                                <div className='profile-card__text top-name'>
                                    <b>{currentUser.username.toUpperCase()}</b>
                                </div>

                                <div className='profile-card__text bottom-name'>
                                    <b>{currentUser.username.toUpperCase()}</b>
                                </div>

                                <div className='profile-card__picture-container'>
                                    <img className='profile-card__picture-container__pic' id='proPic' src={proPicUrl} onClick={() => setShowPopup((prevValue) => !prevValue)}/>
                                    {newProPicPreview && <img className='profile-card__picture-container__preview-pic' src={newProPicPreview}/>}
                                    {showPopup && 
                                        <ClickAwayListener onClickAway={() => setShowPopup(false)}>
                                            <Popper open={showPopup} anchorEl={document.getElementById('proPic')}>
                                                <div className='proPicActionButtons'>
                                                    <div className='profile-card__edit'>
                                                        <input
                                                            type='file'
                                                            className='profile-card__edit__input'
                                                            accept="image/png, image/jpeg"
                                                            onChange={handleFileChange}
                                                        />
                                                        <ImageOutlinedIcon />
                                                        <span className='profile-card__edit__text'>
                                                            Change Profile Picture
                                                        </span>
                                                    </div>
                                                    {proPicUrl !== '/images/default_pro_pic.png' && 
                                                        <div
                                                            className='profile-card__edit'
                                                            onClick={() => deleteProPic.mutate()}
                                                        >
                                                            <ImageNotSupportedOutlinedIcon />
                                                            <span className='profile-card__edit__text'>Delete Profile Picture</span>
                                                        </div>
                                                    }
                                                </div>
                                            </Popper>
                                        </ClickAwayListener>
                                    }
                                </div>
                            </div>

                            {newProPicPreview && 
                                <div className='profile-page__content__top-section__profile__edit-options'>
                                    <div>
                                        <Button
                                            onClick={() => setProPic.mutate()}
                                        >
                                            <CheckCircleOutlineOutlinedIcon />
                                            Save
                                        </Button>
                                    </div>
                                    <div>
                                        <Button
                                            onClick={cancelNewProPic}
                                        >
                                            <CancelOutlinedIcon />
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            }
                        </div>

                        <StatsRow totalTimeSpent={profile.total_time_spent} numberWorkoutsCompleted={profile.number_workouts_completed} />
                    </div>

                    {completedWorkouts.pages.length === 0 ?
                        <div className='noWorkoutsCompleted'>
                            Finish a workout to see it here!
                        </div>
                        :
                        <>
                            <div className='profile-page__content__completed-workouts'>
                                {completedWorkouts.pages.map((group, index) => (
                                    <div key={index}>
                                        {group.map((workout: CompletedWorkout, index: number) => 
                                            <WorkoutDisplay workout={workout} index={index} key={index}>
                                                <div className='profile-page__content__completed-workouts__info'>
                                                    {new Date(workout.date_completed).toDateString()}
                                                </div>
                                                <div className='profile-page__content__completed-workouts__info'>
                                                    {timeSpentToString(workout)}
                                                </div>
                                            </WorkoutDisplay>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className='loadMoreButton'>
                                {hasNextPage &&
                                    <Button
                                        onClick={fetchNextPage}
                                        disabled={!hasNextPage || isFetchingNextPage}
                                        >
                                        {isFetchingNextPage
                                            ? 'Loading more...'
                                            : hasNextPage
                                            ? 'Load More'
                                            : 'Nothing more to load'}
                                    </Button>
                                }
                            </div>
                        </>
                    }
                </div>
        </div>
    );
}

export default ProfilePage;
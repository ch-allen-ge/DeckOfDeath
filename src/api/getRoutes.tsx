import { dodGet } from "../axios-config";

const getCompletedWorkouts = async ({pageParam = 0}) => {
    const response = await dodGet(`/workouts/getCompletedWorkouts?startIndex=${pageParam}`);
    return response.data;
}

const getProPicUrl = async () => {
    const response = await dodGet('/profile/getProfilePicUrl');
    return (response.data ? response.data : '/images/default_pro_pic.png');
}

const getProfile = async () => {
    const response = await dodGet('/profile/getProfile');
    return response.data;
}

const getCurrentUser = async () => {
    const response = await dodGet('/user/getCurrentUser');
    return response.data;
}

const getSavedWorkouts = async () => {
    const response = await dodGet('/workouts/getSavedWorkouts');
    return response.data;
}

export {
    getCompletedWorkouts,
    getProPicUrl,
    getProfile,
    getCurrentUser,
    getSavedWorkouts
}
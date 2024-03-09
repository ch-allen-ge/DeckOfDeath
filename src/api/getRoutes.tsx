import { dodGet } from "../axios-config";

const getCompletedWorkouts = async () => {
    const response = await dodGet(`/workouts/getCompletedWorkouts`);
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

const getUsername = async () => {
    const response = await dodGet('/user/getCurrentUser');
    return response.data.username;
}

const getSavedWorkouts = async () => {
    const response = await dodGet('/workouts/getSavedWorkouts');
    return response.data;
}

export {
    getCompletedWorkouts,
    getProPicUrl,
    getProfile,
    getUsername,
    getSavedWorkouts
}
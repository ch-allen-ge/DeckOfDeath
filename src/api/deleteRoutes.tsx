import { dodDelete } from "../axios-config";

const deleteTheProPic = async () => {
    const response = await dodDelete('/profile/deleteProfilePicture');
    return response;
};

const deleteTheCustomWorkout = async (saved_custom_workout_id: number) => {
    const response = await dodDelete(`/workouts/deleteSavedWorkout?customWorkoutId=${saved_custom_workout_id}`);
    return response;
};

export {
    deleteTheProPic,
    deleteTheCustomWorkout
};
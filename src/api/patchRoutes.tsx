import { dodPatch } from "../axios-config";

const updateTheTotalTime = async (timeSpent: string) => {
    await dodPatch('/profile/updateTotalTimeSpent', {
        timeSpent
    });
};

const updateTheNumberWorkoutsCompleted = async () => {
    await dodPatch('/profile/updateNumberWorkoutsCompleted');
};

const setTheRating = async (workoutCompletedId: number, rating: number) => {
    await dodPatch('/workouts/setRating', {
        workoutCompletedId,
        rating
    });
};

const saveTheNote = async (workoutCompletedId: number, note: string) => {
    await dodPatch('/workouts/saveNote', {
        workoutCompletedId,
        note
    });
};

export {
    updateTheTotalTime,
    updateTheNumberWorkoutsCompleted,
    setTheRating,
    saveTheNote
};
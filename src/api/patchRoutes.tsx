import { dodPatch } from "../axios-config";

interface TimeSpent {
    timeSpent: string
}

const updateTheTotalTime = async (timeSpent: TimeSpent) => {
    await dodPatch('/profile/updateTotalTimeSpent', timeSpent);
}

const updateTheNumberWorkoutsCompleted = async () => {
    await dodPatch('/profile/updateNumberWorkoutsCompleted');
}

export {
    updateTheTotalTime,
    updateTheNumberWorkoutsCompleted
};
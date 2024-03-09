import { dodPost } from "../axios-config";

interface CompletedWorkout {
    name?: string
    time_spent?: string,
    clubs_exercise: string,
    diamonds_exercise: string,
    hearts_exercise: string,
    spades_exercise: string,
    aces_exercise: string,
    breakout_aces: boolean,
    timer_used: boolean,
    aces_minutes_to_do: number,
    aces_seconds_to_do: number
};

const registerTheUser = async (params: FormData) => {
    const response = await dodPost('/register', params);
    return response;
};

const addTheWorkoutCompleted = async (completedWorkout: CompletedWorkout) => {
    const response = await dodPost('/workouts/saveCompletedWorkout', completedWorkout);
    return response;
};

const uploadAndSaveTheproPic = async (proPic: FormData) => {
    const response = await dodPost('/profile/uploadAndSaveProPic', proPic);
    return response;
};

const saveTheCustomWorkout = async (workout: CompletedWorkout) => {
    const response = await dodPost('/workouts/saveCustomWorkout', workout);
    return response;
}

export {
    registerTheUser,
    addTheWorkoutCompleted,
    uploadAndSaveTheproPic,
    saveTheCustomWorkout
};
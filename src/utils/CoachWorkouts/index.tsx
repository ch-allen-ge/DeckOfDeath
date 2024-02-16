interface Workout {
    name: string;
    equipment: string;
    difficulty: number;
    clubs_exercise: string;
    diamonds_exercise: string;
    hearts_exercise: string;
    spades_exercise: string;
    breakout_aces: boolean,
    aces_exercise: string,
    timer_used: boolean,
    aces_minutes_to_do: number,
    aces_seconds_to_do: number
    icon: React.ReactNode
};

const workouts : Workout[] = [
    {
        name: 'Zeus',
        equipment: '2 light dumbells',
        difficulty: 1,
        clubs_exercise: 'dumbell alternating presses each side',
        diamonds_exercise: 'dumbell rows each side',
        hearts_exercise: 'jump squats',
        spades_exercise: 'dumbell lunges each side',
        breakout_aces: false,
        aces_exercise: '',
        timer_used: false,
        aces_minutes_to_do: 0,
        aces_seconds_to_do: 0,
        icon: <img src="/images/godIcons/zeus.png" />
    },
    {
        name: 'Poseidon',
        equipment: '2 medium dumbells',
        difficulty: 2,
        clubs_exercise: 'dumbell presses',
        diamonds_exercise: 'renegade rows',
        hearts_exercise: 'goblet squats',
        spades_exercise: 'single leg RDL\'s',
        breakout_aces: true,
        aces_exercise: 'burpees',
        timer_used: false,
        aces_minutes_to_do: 0,
        aces_seconds_to_do: 0,
        icon: <img src="/images/godIcons/poseidon.png" />
    },
    {
        name: 'Hades',
        equipment: '2 heavy dumbells',
        difficulty: 3,
        clubs_exercise: 'dumbell curls',
        diamonds_exercise: 'dumbell rows',
        hearts_exercise: 'weighted squats',
        spades_exercise: 'weighted lunges each side',
        breakout_aces: true,
        aces_exercise: 'burpees',
        timer_used: true,
        aces_minutes_to_do: 1,
        aces_seconds_to_do: 30,
        icon: <img src="/images/godIcons/hades.png" />
    },
    {
        name: 'Ares',
        equipment: '1 light kettlebell',
        difficulty: 1,
        clubs_exercise: 'kettlebell cleans',
        diamonds_exercise: 'kettlebell rows each side',
        hearts_exercise: 'kettlebell goblet squats',
        spades_exercise: 'kettlebell lunges each side',
        breakout_aces: false,
        aces_exercise: '',
        timer_used: false,
        aces_minutes_to_do: 0,
        aces_seconds_to_do: 0,
        icon: <img src="/images/godIcons/ares.png" />
    },
    {
        name: 'Apollo',
        equipment: '2 medium kettlebells',
        difficulty: 2,
        clubs_exercise: 'kettlebell military presses',
        diamonds_exercise: 'kettlebell rows',
        hearts_exercise: 'kettlebell squats each side',
        spades_exercise: 'one bell kettlebell swings',
        breakout_aces: true,
        aces_exercise: 'kettlebell alternating one handed swings each side',
        timer_used: false,
        aces_minutes_to_do: 0,
        aces_seconds_to_do: 0,
        icon: <img src="/images/godIcons/apollo.png" />
    },
    {
        name: 'Aphrodite',
        equipment: '2 medium kettlebells, 1 heavy kettlebell',
        difficulty: 3,
        clubs_exercise: 'kettlebell military presses each side',
        diamonds_exercise: 'kettlebell halos each side',
        hearts_exercise: 'kettlebell snatches each side',
        spades_exercise: 'heavy kettlebell swings',
        breakout_aces: true,
        aces_exercise: '2 kettlebell long cycle',
        timer_used: true,
        aces_minutes_to_do: 1,
        aces_seconds_to_do: 30,
        icon: <img src="/images/godIcons/aphrodite.png" />
    },
    {
        name: 'Hermes',
        equipment: 'none',
        difficulty: 1,
        clubs_exercise: 'jumping jacks',
        diamonds_exercise: 'squats',
        hearts_exercise: 'mountain climbers',
        spades_exercise: 'front lunges',
        breakout_aces: false,
        aces_exercise: '',
        timer_used: false,
        aces_minutes_to_do: 0,
        aces_seconds_to_do: 0,
        icon: <img src="/images/godIcons/hermes.png" />
    },
    {
        name: 'Thor',
        equipment: 'none',
        difficulty: 2,
        clubs_exercise: 'lunge',
        diamonds_exercise: 'jump squats',
        hearts_exercise: 'plank jacks',
        spades_exercise: 'burpees',
        breakout_aces: true,
        aces_exercise: 'high jumps',
        timer_used: false,
        aces_minutes_to_do: 0,
        aces_seconds_to_do: 0,
        icon: <img src="/images/godIcons/thor.png" />
    },
    {
        name: 'Hercules',
        equipment: 'none',
        difficulty: 3,
        clubs_exercise: 'russian twists',
        diamonds_exercise: 'squat jacks',
        hearts_exercise: 'push ups',
        spades_exercise: 'burpees',
        breakout_aces: true,
        aces_exercise: 'plank',
        timer_used: true,
        aces_minutes_to_do: 1,
        aces_seconds_to_do: 30,
        icon: <img src="/images/godIcons/hercules.png" />
    },
    {
        name: 'Athena',
        equipment: 'none',
        difficulty: 3,
        clubs_exercise: 'russian twists',
        diamonds_exercise: 'squat jacks',
        hearts_exercise: 'push ups',
        spades_exercise: 'burpees',
        breakout_aces: true,
        aces_exercise: 'plank',
        timer_used: true,
        aces_minutes_to_do: 1,
        aces_seconds_to_do: 30,
        icon: <img src="/images/godIcons/athena.png" />
    }
];

export default workouts;
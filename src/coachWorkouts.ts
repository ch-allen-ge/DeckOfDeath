interface workout {
    title: string,
    equipment: string,
    difficulty: number,
    clubs: string,
    diamonds: string,
    hearts: string,
    spades: string,
    aces: {
        exercise: string,
        timerUsed: boolean,
        minutesToDo: string | number,
        secondsToDo: string |number
    }
}

const workouts : workout[] = [
    // maybe have a choose for me one first, on top take sup full width, light up different workouts like choosing map in mario until landing on one at random
    {
        title: 'Dumbell Easy',
        equipment: '2 light dumbells',
        difficulty: 1,
        clubs: 'dumbell alternating presses each side',
        diamonds: 'dumbell rows each side',
        hearts: 'jump squats',
        spades: 'dumbell lunges each side',
        aces: {
            exercise: '',
            timerUsed: false,
            minutesToDo: '',
            secondsToDo: ''
        }
    },
    {
        title: 'Dumbell Mid',
        equipment: '2 medium dumbells',
        difficulty: 2,
        clubs: 'dumbell presses',
        diamonds: 'renegade rows',
        hearts: 'goblet squats',
        spades: 'single leg RDL\'s',
        aces: {
            exercise: 'burpees',
            timerUsed: false,
            minutesToDo: '',
            secondsToDo: ''
        }
    },
    {
        title: 'Dumbell Hard',
        equipment: '2 heavy dumbells',
        difficulty: 3,
        clubs: 'dumbell curls',
        diamonds: 'dumbell rows',
        hearts: 'weighted squats',
        spades: 'weighted lunges each side',
        aces: {
            exercise: 'burpees',
            timerUsed: true,
            minutesToDo: 1,
            secondsToDo: 30
        }
    },
    {
        title: 'Kettlebell Easy',
        equipment: '1 light kettlebell',
        difficulty: 1,
        clubs: 'kettlebell cleans',
        diamonds: 'kettlebell rows each side',
        hearts: 'kettlebell goblet squats',
        spades: 'kettlebell lunges each side',
        aces: {
            exercise: '',
            timerUsed: false,
            minutesToDo: '',
            secondsToDo: ''
        }
    },
    {
        title: 'Kettlebell Mid',
        equipment: '2 medium kettlebells',
        difficulty: 2,
        clubs: 'kettlebell military presses',
        diamonds: 'kettlebell rows',
        hearts: 'kettlebell squats each side',
        spades: 'one bell kettlebell swings',
        aces: {
            exercise: 'kettlebell alternating one handed swings each side',
            timerUsed: false,
            minutesToDo: '',
            secondsToDo: ''
        }
    },
    {
        title: 'Kettlebell Hard',
        equipment: '2 medium kettlebells, 1 heavy kettlebell',
        difficulty: 3,
        clubs: 'kettlebell military presses each side',
        diamonds: 'kettlebell halos each side',
        hearts: 'kettlebell snatches each side',
        spades: 'heavy kettlebell swings',
        aces: {
            exercise: '2 kettlebell long cycle',
            timerUsed: true,
            minutesToDo: 1,
            secondsToDo: 30
        }
    },
    {
        title: 'Bodyweight Easy',
        equipment: 'none',
        difficulty: 1,
        clubs: 'jumping jacks',
        diamonds: 'squats',
        hearts: 'mountain climbers',
        spades: 'front lunges',
        aces: {
            exercise: '',
            timerUsed: false,
            minutesToDo: '',
            secondsToDo: ''
        }
    },
    {
        title: 'Bodyweight Mid',
        equipment: 'none',
        difficulty: 2,
        clubs: 'lunge',
        diamonds: 'jump squats',
        hearts: 'plank jacks',
        spades: 'burpees',
        aces: {
            exercise: 'high jumps',
            timerUsed: false,
            minutesToDo: '',
            secondsToDo: ''
        }
    },
    {
        title: 'Bodyweight Hard',
        equipment: 'none',
        difficulty: 3,
        clubs: 'russian twists',
        diamonds: 'squat jacks',
        hearts: 'push ups',
        spades: 'burpees',
        aces: {
            exercise: 'plank',
            timerUsed: true,
            minutesToDo: 1,
            secondsToDo: 30
        }
    }
];

export default workouts;
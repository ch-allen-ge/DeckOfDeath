const timeToString = ({hours, minutes, seconds} : {hours: number, minutes: number, seconds: number}) => {
    let minWithZero = '';
    let secondsWithZero = '';

    if (minutes < 10) {
        minWithZero = '0' + minutes;
    } else {
        minWithZero = '' + minutes;
    }

    if (seconds < 10) {
        secondsWithZero = '0' + seconds;
    } else {
        secondsWithZero = '' + seconds;
    }

    return `${hours ? `${hours}: ` : ''}${minWithZero}:${secondsWithZero}`;
};

const getDateString = () => {
    const monthNames = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const today = new Date();
    const monthName = monthNames[today.getMonth()];
    const day = today.getDate();
    const year = today.getFullYear();
    const hour = today.getHours();
    const hourAmerican = (hour % 12) || 12;
    const min = today.getMinutes();
    const minWithZero = min > 9 ? min : '0' + min;
    const amOrPm = hour > 12 ? 'PM' : 'AM';

    return `${monthName} ${day}, ${year} ${hourAmerican}:${minWithZero}${amOrPm}`;
};

const getMaxHeartRate = (age: number) => {
    return 220 - age;
}

const getPowerScore = (heartRateArray : number[], maxHeartRate: number, totalTimeSpent: number) => {
    let timeInZone: number[] = [0, 0, 0, 0, 0];
    const pointsArray: number[] = [.005, .01, .015, .02, .025];
    const pointsScoredArray: number[] = [];

    if (heartRateArray.length === 0) {
        return totalTimeSpent / 6;
    }

    for (let heartRate of heartRateArray) {
        if (heartRate <= 0.645 * maxHeartRate) {
            timeInZone[0]++;
        } else if ((heartRate > 0.645 * maxHeartRate) && (heartRate <= 0.76 * maxHeartRate)) {
            timeInZone[1]++;
        } else if ((heartRate > 0.76 * maxHeartRate) && (heartRate <= 0.855 * maxHeartRate)) {
            timeInZone[2]++;
        } else if ((heartRate > 0.855 * maxHeartRate) && (heartRate <= 0.935 * maxHeartRate)) {
            timeInZone[3]++;
        } else {
            timeInZone[4]++;
        }
    }

    for (let i = 0; i < 5; i++) {
        pointsScoredArray.push(timeInZone[i] * pointsArray[i]);
    }

    const powerScore = pointsScoredArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return parseFloat(powerScore.toFixed(2));
};

interface caloriesBurnedProps {
    avgHeartRate: number,
    totalMinSpent: number,
    gender: string,
    weight: number,
    weightUnits: string,
    age: number
}

const getCaloriesBurned = ({
    avgHeartRate,
    totalMinSpent,
    gender,
    weight,
    weightUnits,
    age
} : caloriesBurnedProps) => {

    if (weightUnits !== 'kgs') {
        weight = weight * 0.45359237;
    }

    if (gender === 'male') {
        return Math.floor(totalMinSpent * ((0.6309 * avgHeartRate) + (0.1988 * weight) + (0.2107 * age) - 55.0969) / 4.184);
    } else {
        return Math.floor(totalMinSpent * ((0.4472 * avgHeartRate) - (0.1263 * weight) + (0.074 * age) - 20.4022) / 4.184);
    }
}

//hard coded avg heart rate for now if no HR monitor
var calculateAvg = (heartRateArray: number[]) => {
    if (heartRateArray.length === 0) {
        return 160;
    }

    return heartRateArray.reduce((accumulator, currentValue, currentIndex) => {
        if (currentIndex === heartRateArray.length - 1) {
            return Math.floor((accumulator + currentValue) / heartRateArray.length);
        } else {
            return accumulator + currentValue;
        }
    }, 0);
};

var timeStringToMinNumber = (timeString: string) => {
    const splitString = timeString.split(' ').map(str => parseInt(str, 10));
    return (60 * splitString[0]) + splitString[1] + (splitString[2] >= 30 ? 1 : 0);
}

const debounce = (func: (args: any) => any, delay: number) => {
    let timer: NodeJS.Timeout;

    return (args: any) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        func(args);
      }, delay);
    };
};

export {
    timeToString,
    getDateString,
    getMaxHeartRate,
    getPowerScore,
    getCaloriesBurned,
    calculateAvg,
    timeStringToMinNumber,
    debounce
};
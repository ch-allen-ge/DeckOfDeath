export const timeToString = ({hours, minutes, seconds} : {hours: number, minutes: number, seconds: number}) => {
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
}
interface LoginProps {
    username: string,
    password: string
}

//must be minimum 8 characters, at least 1 lowercase letter and one number
const validatePassword = (password : string) => {
    if (
        password.match(/[a-z]/g) &&
        password.match(/[0-9]/g) &&
        password.length >= 8
    ) {
        return true;
    } else {
        return false;
    }
}

//can only contain letters, numbers, or @ or . and cannot be empty
const validateUsername = (username : string) => {
    if (username === '' || username.match(/[^a-zA-Z\d\@\.]/g)) {
        return false;
    } else {
        return true;
    }
}

//username and password field cannot be empty
const validateLoginCredentials = (loginCredentials: LoginProps) => {
    if (loginCredentials.username === '' || loginCredentials.password === '') {
        return false;
    } else {
        return true;
    }
}

//cannot be empty
const validateSavedWorkoutName = (savedWorkoutName: string) => {
    return savedWorkoutName !== '';
}

export {
    validatePassword,
    validateUsername,
    validateLoginCredentials,
    validateSavedWorkoutName
}
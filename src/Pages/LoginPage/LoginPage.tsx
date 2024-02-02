import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAppDispatch } from '../../hooks';
import { useNavigate } from "react-router-dom";
import { dodPost } from '../../axios-config';
import { setLoggedIn, resetUI } from '../../reduxSlices/UISlice';
import { validateLoginCredentials } from "../../utils/Validation";
import './loginPageStyles.scss';

//if logged in already, redirect to /
const Login = () => {
    const [usernameInput, setUsernameInput] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [showValidationError, setShowValidationError] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loginUser = async () => {
        const response = await dodPost('/login', {
            username: usernameInput,
            password
        })
        .catch(() => {
            setShowError(true);
        });
        
        if (response && response.status === 200) {
            dispatch(setLoggedIn(true));
            dispatch(resetUI());
            navigate('/');
        } else {
            dispatch(setLoggedIn(false));
            setShowError(true);
        }
    }

    const handleSubmit = () => {
        setSubmitted(true);
        if (validateLoginCredentials({
            username: usernameInput,
            password
        })) {
            loginUser();
        } else {
            setShowValidationError(true);
        }
    }

    return (
        <>
            <div className='loginContainer'>
                <h1>Log In</h1>

                <div className="loginInputFields">
                    <TextField
                        className=""
                        label='username'
                        variant="outlined"
                        autoComplete='off'
                        onChange={(e) => {
                            const text = e.target.value;
                            setUsernameInput(text);
                            setShowValidationError(false);
                        }}
                        error={submitted && usernameInput === ''}
                    />
                    <br />
                    <TextField
                        className=""
                        label='password'
                        type='password'
                        variant="outlined"
                        autoComplete='off'
                        onChange={(e) => {
                            const text = e.target.value;
                            setPassword(text);
                            setShowValidationError(false);
                        }}
                        error={submitted && password === ''}
                    />
                </div>

                {showValidationError &&
                    <div className="errorText">
                        Please fill in all fields
                    </div>
                }
                
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Login
                </Button>

                {showError &&
                    <div className="errorText">
                        Error logging in
                    </div>
                }
            </div>
        </>
    )
};

export default Login;
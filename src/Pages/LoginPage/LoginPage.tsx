import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import './loginPageStyles.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showError, setShowError] = useState<boolean>(false);
    const navigate = useNavigate();
    const { isLoggedIn, logIn } = useAuth();
    const formRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);

    if (isLoggedIn) {
        navigate('/');
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            await logIn.mutateAsync({
                username,
                password
            });

            navigate('/');
        } catch (error) {
            setShowError(true);
        }
    };

    return (
        <>
            <div className='loginPage'>
                <div className="loginPage__card">
                    <div className="loginPage__card__formContainer">
                        <form className="loginPage__card__formContainer__form" onSubmit={handleSubmit} ref={formRef}>
                            <div className="bigBoldText">
                                Log In
                            </div>

                            <div className="form__group">
                                <input
                                    type="text"
                                    className="form__input"
                                    placeholder="Username"
                                    id="username"
                                    name='username'
                                    required
                                    onChange={(e) => {
                                        setShowError(false);
                                        setUsername(e.target.value)
                                    }}
                                />
                                <label htmlFor="username" className="form__label">Username</label>
                            </div>

                            <div className="form__group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form__input"
                                    placeholder="Password (min 6 characters)"
                                    id="password"
                                    name='password'
                                    required 
                                    onChange={(e) => {
                                        setShowError(false);
                                        setPassword(e.target.value);
                                    }} 
                                />

                                <label htmlFor="username" className="form__label">Password</label>

                                <div className="visibility-icon-login" onClick={() => setShowPassword((prevState) => !prevState)}>
                                    {showPassword ? (
                                        <VisibilityOffIcon />
                                    ) : (
                                        <VisibilityIcon />
                                    )}
                                </div>
                            </div>
                            <div className="submitButton">
                                <button type='submit'>
                                    Submit
                                </button>
                            </div>

                            <div
                                className="cancelButton"
                                onClick={() => navigate('/')}
                            >
                                <u>Cancel</u>
                            </div>

                            <div className={`loginError ${showError ? 'visible' : 'invisible'}`}>
                                Incorrect username or password
                            </div>
                        </form>
                    </div>
                    

                    <div className="loginPage__card__description">
                        <div className="bigBoldText">
                            GET PUMPED
                        </div>
                        <div className="loginPage__card__description__blob">
                            Log in to save all your completed workouts and look back at all the times you've conquered them
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
};

export default Login;
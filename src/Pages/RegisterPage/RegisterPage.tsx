import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { registerTheUser } from "../../api/postRoutes";
import { useMutation } from "@tanstack/react-query";
import './registerPageStyles.scss'
import { AxiosError } from "axios";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { logIn } = useAuth();
    const formRef = useRef(null);
    const [usernameTakenError, setUsernameTakenError] = useState(false);
    const [passwordTooShortError, setPasswordTooShortError] = useState(false);

    const registerUser = useMutation({
        mutationFn: async () => {
            const formData = new FormData(formRef.current as unknown as HTMLFormElement);
            const response = await registerTheUser(formData);

            return response;
        },
        onSuccess: async (response) => {
            const formData = new FormData(formRef.current as unknown as HTMLFormElement);
            const username = formData.get('username');
            const password = formData.get('password');

            if (response && response.status === 200) {
                const logInResponse = await logIn.mutateAsync({
                    username,
                    password
                });

                if (logInResponse && logInResponse.status === 200) {
                    navigate('/');
                } else {
                    
                }
            }
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 400) {
                const errorObj = error.response.data as {
                    type: string,
                    message: string
                };

                if (errorObj.type === 'password') {
                    setPasswordTooShortError(true);
                } else if (errorObj.type === 'username') {
                    setUsernameTakenError(true);
                }
            }
        }
    });

    const handleSubmit = (event: any) => {
        event.preventDefault();
        registerUser.mutate();
    };

    return (
        <>
            <div className='registerPage'>
                <div className="registerPage__card">
                    <div className="registerPage__card__formContainer">
                        <form className="registerPage__card__formContainer__form" onSubmit={handleSubmit} ref={formRef}>
                            <div className="bigBoldText">
                                Register
                            </div>

                            <div className="form__group">
                                <input type="text" className="form__input" placeholder="Username" id="username" name='username' required onChange={() => setUsernameTakenError(false)}/>
                                {usernameTakenError ? (
                                    <span className="errorMessage">Username already taken</span>
                                ) : (
                                    <label htmlFor="username" className="form__label">Username</label>
                                )}
                            </div>

                            <div className="form__group">
                                <input type="password" className="form__input" placeholder="Password (min 6 characters)" id="password" name='password' required onChange={() => setPasswordTooShortError(false)}/>
                                {passwordTooShortError ? (
                                    <span className="errorMessage">Minimum 6 characters</span>
                                ) : (
                                    <label htmlFor="username" className="form__label">Password</label>
                                )}
                            </div>

                            <div className="form__group sharedRow">
                                <div className="initialElement">
                                    <input type="number" className="form__input" placeholder="Weight" id="weight" required name='weight'/>
                                    <label htmlFor="weight" className="form__label">Weight</label>
                                </div>
                                <select className='weightUnit' name='weightUnits'>
                                    <option value="lbs">lbs</option>
                                    <option value="kgs">kgs</option>
                                </select>
                            </div>

                            <div className="form__group">
                                <input type="number" className="form__input form__input" placeholder="Age" id="age" required name='age' />
                                <label htmlFor="age" className="form__label">Age</label>
                            </div>

                            <div className="form__group radio">
                                <div className="form__radio-group">
                                    <input type="radio" className="form__radio-input" id="male" value='male' name="gender" defaultChecked/>
                                    <label htmlFor="male" className="form__radio-label">
                                        <span className="form__radio-button" />
                                        Male
                                    </label>
                                </div>

                                <div className="form__radio-group">
                                    <input type="radio" className="form__radio-input" id="female" value='female' name="gender" />
                                    <label htmlFor="female" className="form__radio-label">
                                        <span className="form__radio-button" />
                                        Female
                                    </label>
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
                            
                        </form>
                    </div>
                    

                    <div className="registerPage__card__description">
                        <div className="bigBoldText">
                            GET READY
                        </div>
                        <div className="registerPage__card__description__blob">
                            Deck of Death is an extremely difficult workout, so let's remember 
                            all the times you conquer it! Register to save your previous workouts, 
                            quick start new ones, and get personalized post-workout metrics!
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
};

export default RegisterPage;
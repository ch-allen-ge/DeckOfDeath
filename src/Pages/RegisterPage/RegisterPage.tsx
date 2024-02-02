import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { dodPost } from "../../axios-config";
import { useNavigate } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';
import './registerPageStyles.scss'
import { useDispatch } from "react-redux";
import { setLoggedIn, resetUI } from "../../reduxSlices/UISlice";
import { validateUsername, validatePassword } from "../../utils/Validation";

const RegisterPage = () => {
    const [username, setUsername] = useState<string>(''); //todo: set minimum requirements
    const [password, setPassword] = useState<string>(''); //todo: set minimum requirements
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showUsernameValidationError, setShowUsernameValidationError] = useState<boolean>(false);
    const [showPasswordValidationError, setShowPasswordValidationError] = useState<boolean>(false);
    const [preview, setPreview] = useState<string>('/images/default_pro_pic.png');
    const [showProPicError, setShowProPicError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!selectedFile) {
            return;
        }
        
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
     
        return () => URL.revokeObjectURL(objectUrl)
     }, [selectedFile]);

    const registerUser = async () => {
        let params = new FormData();

        if (selectedFile) {
            params.append('profilePic', selectedFile);
        };
        params.append('username', username);
        params.append('password', password);

        const response = await dodPost('/register', params).catch(() => setShowError(true));

        if (response && response.status === 200) {
            dispatch(resetUI());
            dispatch(setLoggedIn(true));
            navigate('/');
        }
    };

    const handleSubmit = () => {
        setSubmitted(true);
        const validatedUsername = validateUsername(username);
        const validatedPassword = validatePassword(password);

        if (validatedUsername && validatedPassword) {
            registerUser();
        } else {
            if (!validatedUsername && !validatedPassword) {
                setShowUsernameValidationError(true);
                setShowPasswordValidationError(true);
            } else if (!validatedUsername) {
                setShowUsernameValidationError(true);
            } else if (!validatedPassword) {
                setShowPasswordValidationError(true);
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file.size > 4 * 1000 * 1024) {
                setShowProPicError(true);
            } else {
                setSelectedFile(file);
                setShowProPicError(false);
            }
        }
    };
    
    return (
        <>
            <div className='registerPageContainer'>
                <h1>Register</h1>

                <div className="registerInputFields">
                    <TextField
                        className=""
                        label='username'
                        variant="outlined"
                        autoComplete='off'
                        onChange={(e) => {
                            const text = e.target.value;
                            setUsername(text);
                            setShowUsernameValidationError(false);
                        }}
                        error={submitted && showUsernameValidationError}
                    />
                    <div>
                        *username can only contain letters, numbers, @, or .
                    </div>
                    <br />
                    <TextField
                        className=""
                        type='password'
                        label='password'
                        variant="outlined"
                        autoComplete='off'
                        onChange={(e) => {
                            const text = e.target.value;
                            setPassword(text);
                            setShowPasswordValidationError(false);
                        }}
                        error={submitted && showPasswordValidationError}
                    />
                    <div>
                        *password must be minimum 8 characters and contain at least one lowercase letter and one number 
                    </div>
                </div>

                <h2>Profile Picture</h2>

                <div>
                    <input
                        type='file'
                        className='profilePicInput'
                        name='profilePic'
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                    />
                </div>

                <div className='registerProPicContainer'>
                    {selectedFile &&
                        <div
                            className="cancelIcon"
                            onClick={() => {
                                setSelectedFile(null);
                                setPreview('/images/default_pro_pic.png');
                            }}>
                            <CancelIcon/>
                        </div>
                    }
                    <img className='proPic' src={preview} />
                </div>

                <Button
                    variant="contained"
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    Register
                </Button>

                {showError && 
                    <div className="errorText">
                        Error Registering
                    </div>
                }
                {showProPicError &&
                    <div className="errorText">
                        Profile picture cannot be bigger than 4mb
                    </div>
                }
            </div>
            
        </>
    )
};

export default RegisterPage;
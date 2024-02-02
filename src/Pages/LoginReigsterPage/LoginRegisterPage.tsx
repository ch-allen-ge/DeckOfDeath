import { Button } from '@mui/material';
import './loginRegisterPageStyles.scss';
import { useNavigate } from 'react-router-dom';

const LoginRegisterPage = () => {
    const navigate = useNavigate();

    return (
        <div className='loginRegisterPageContainer'>
            <h1>Login/Register to use this feature!</h1>
            <div className='loginRegisterButtons'>
                <Button
                    variant='contained'
                    onClick={() => navigate('/login')}
                >
                    Login
                </Button>
                <Button
                    variant='contained'
                    onClick={() => navigate('/register')}
                >
                    Register
                </Button>
            </div>
        </div>
    )
}

export default LoginRegisterPage;
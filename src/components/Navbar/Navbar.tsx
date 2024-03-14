import { useNavigate, useLocation } from "react-router-dom";
import { resetExercises } from "../../reduxSlices/exercisesChosenSlice";
import { resetOptions } from "../../reduxSlices/workoutOptionsSlice";
import { useAppDispatch } from '../../hooks';
import './navbarStyles.scss';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import AirlineSeatIndividualSuiteOutlinedIcon from '@mui/icons-material/AirlineSeatIndividualSuiteOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import '../../mixins.scss';
import { useAuth } from "../../auth/AuthContext";

interface iconButtonProps {
  children: React.ReactNode,
  onClick: () => void,
  icon: React.ReactNode
}

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {isLoggedIn, logOut} = useAuth();

    if (location.pathname === '/workout' || location.pathname === '/finished') {
      return null;
    }

    const IconButton = ({
      children,
      onClick,
      icon
    }: iconButtonProps) => {

      return (
        <div
          className={'navbar__button-container'}
          onClick={onClick}
        >
          {icon}
          
          <span className="navbar__button-label">{children}</span>
        </div>
      );
    }

    const LogoutButton = () => {
      return (
        <IconButton
            onClick={() => {
              logOut.mutate();
              navigate('/');
            }}
            icon = {<AirlineSeatIndividualSuiteOutlinedIcon />}
          >
            Logout
          </IconButton>
      );
    };

    const LoginRegisterButtons = () => {
      return (
        <>
          <IconButton
            onClick={() => {
              navigate('/login');
            }}
            icon = {<LoginOutlinedIcon /> }
          >
            Login
          </IconButton>

          <IconButton
            onClick={() => {
              navigate('/register');
            }}
            icon = {<CreateOutlinedIcon /> }
          >
            Register
          </IconButton>
        </>
      );
    };

    return (
          <div className='navbar'>
            <div className='navbar__home-button' onClick={() => {
              dispatch(resetExercises());
              dispatch(resetOptions());
              navigate('/');
            }}>
              Deck
              <br />
              Of
              <br />
              Death
            </div>

            <IconButton
              onClick={() => {
                navigate(`/profile`);
              }}
              icon = {<Person2OutlinedIcon />}
            >
              Profile
            </IconButton>

            <IconButton
              onClick={() => {
                navigate(`/savedWorkouts`);
              }}
              icon = {<BookmarkBorderOutlinedIcon /> }
            >
              Saved
            </IconButton>

            <IconButton
              onClick={() => {
                navigate('/coach');
              }}
              icon = {<DirectionsRunOutlinedIcon />}
            >
              Coach
            </IconButton>

            {isLoggedIn ? LogoutButton() : LoginRegisterButtons()}
          </div>
    );
}

export default Navbar;
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
import { useState } from "react";

interface iconButtonProps {
  children: React.ReactNode,
  onClick: () => void,
  icon: React.ReactNode,
  tab?: Tabs
}

enum Tabs {
  Profile = "Profile",
  Saved = "Saved",
  Coach = "Coach",
  Register = "Register",
  Login = "Login"
}

const getCurrentTab = (location: any) => {
  if (location.pathname === '/profile') {
    return Tabs.Profile;
  } else if (location.pathname === '/saved') {
    return Tabs.Saved;
  } else if (location.pathname === '/coach') {
    return Tabs.Coach;
  } else {
    return '';
  }
}

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {isLoggedIn, logOut} = useAuth();
    const [currentTab, setCurrentTab] = useState<String>(getCurrentTab(location));

    if (location.pathname === '/workout' || location.pathname === '/finished' || location.pathname === '/register') {
      return null;
    }

    const IconButton = ({
      children,
      onClick,
      icon,
      tab
    }: iconButtonProps) => {

      return (
        <div
          className={`navbar__button-container ${currentTab === tab ? 'currentTab' : ''}`}
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
            tab={Tabs.Login}
          >
            Login
          </IconButton>

          <IconButton
            onClick={() => {
              navigate('/register');
            }}
            icon = {<CreateOutlinedIcon /> }
            tab={Tabs.Register}
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
              setCurrentTab('');
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
                setCurrentTab(Tabs.Profile);
              }}
              icon = {<Person2OutlinedIcon />}
              tab={Tabs.Profile}
            >
              Profile
            </IconButton>

            <IconButton
              onClick={() => {
                navigate(`/savedWorkouts`);
                setCurrentTab(Tabs.Saved);
              }}
              icon = {<BookmarkBorderOutlinedIcon /> }
              tab={Tabs.Saved}
            >
              Saved
            </IconButton>

            <IconButton
              onClick={() => {
                navigate('/coach');
                setCurrentTab(Tabs.Coach);
              }}
              icon = {<DirectionsRunOutlinedIcon />}
              tab={Tabs.Coach}
            >
              Coach
            </IconButton>

            {isLoggedIn ? LogoutButton() : LoginRegisterButtons()}
          </div>
    );
}

export default Navbar;
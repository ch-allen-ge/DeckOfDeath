import { useNavigate } from "react-router-dom";
import { resetExercises } from "../../reduxSlices/exercisesChosenSlice";
import { resetOptions } from "../../reduxSlices/workoutOptionsSlice";
import { resetUI } from "../../reduxSlices/UISlice";
import { resetDeck } from "../../reduxSlices/deckSlice";
import { resetProfile } from "../../reduxSlices/profileSlice";
import { resetUser } from "../../reduxSlices/userSlice";
import { useAppSelector, useAppDispatch } from '../../hooks';
import { dodPost } from "../../axios-config";
import './navbarStyles.scss';
import { setLoggedIn } from "../../reduxSlices/UISlice";
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import AirlineSeatIndividualSuiteOutlinedIcon from '@mui/icons-material/AirlineSeatIndividualSuiteOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { setSelectedTab } from "../../reduxSlices/UISlice";
import '../../mixins.scss';

interface iconButtonProps {
  children: React.ReactNode,
  onClick: () => void,
  isSelected: boolean,
  icon: React.ReactNode
}

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.UI.loggedIn);
    const selectedTab = useAppSelector(state => state.UI.selectedTab);

    const logOut = async () => {
      const response = await dodPost('/logout');

      if (response && response.status === 200) {
        dispatch(setLoggedIn(false));
        dispatch(resetProfile());
        dispatch(resetUser());
        navigate('/');
      }
    }

    const IconButton = ({
      children,
      onClick,
      isSelected,
      icon
    }: iconButtonProps) => {

      return (
        <div
          className={`navBarButtonContainer icon ${isSelected ? 'iconExpanded' : 'iconNormal'}`}
          onClick={onClick}
        >
          {icon}
          <span className="labelText">{children}</span>
        </div>
      );
    }

    const LogoutButton = () => {
      return (
        <IconButton
            onClick={() => {
              logOut();
              dispatch(resetUI());
              navigate('/');
            }}
            isSelected = {false}
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
              dispatch(setSelectedTab('login'));
              navigate('/login');
            }}
            isSelected = {selectedTab === 'login'}
            icon = {<LoginOutlinedIcon /> }
          >
            Login
          </IconButton>

          <IconButton
            onClick={() => {
              dispatch(setSelectedTab('register'));
              navigate('/register');
            }}
            isSelected = {selectedTab === 'register'}
            icon = {<CreateOutlinedIcon /> }
          >
            Register
          </IconButton>
        </>
      );
    };

    return (
          <div className='navBar'>
            <div className='titleText' onClick={() => {
              dispatch(resetExercises());
              dispatch(resetOptions());
              dispatch(resetUI());
              dispatch(resetDeck());
              dispatch(setSelectedTab('home'));
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
                dispatch(setSelectedTab('profile'));
                navigate(`/profile`);
              }}
              isSelected = {selectedTab === 'profile'}
              icon = {<Person2OutlinedIcon /> }
            >
              Profile
            </IconButton>

            <IconButton
              onClick={() => {
                dispatch(setSelectedTab('savedWorkouts'));
                navigate(`/savedWorkouts`);
              }}
              isSelected = {selectedTab === 'savedWorkouts'}
              icon = {<BookmarkBorderOutlinedIcon /> }
            >
              Saved
              <br />
              Workouts
            </IconButton>

            <IconButton
              onClick={() => {
                dispatch(setSelectedTab('coach'));
                navigate('/coach');
              }}
              isSelected = {selectedTab === 'coach'}
              icon = {<DirectionsRunOutlinedIcon />}
            >
              Coach
            </IconButton>

            {isLoggedIn ? LogoutButton() : LoginRegisterButtons()}
          </div>
    );
}

export default Navbar;
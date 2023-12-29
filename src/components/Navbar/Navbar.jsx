import { useNavigate } from "react-router-dom";

import './navbarStyles.css';

import { resetExercises } from "../../reduxSlices/exercisesChosenSlice";
import { resetOptions } from "../../reduxSlices/workoutOptionsSlice";

import { useDispatch } from "react-redux";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className='titleSection'>
          <h1 className='titleText' onClick={() => {
            dispatch(resetExercises());
            dispatch(resetOptions());
            navigate('/');
          }}>
            Deck Of Death
          </h1>
        </div>
    );
}

export default Navbar;
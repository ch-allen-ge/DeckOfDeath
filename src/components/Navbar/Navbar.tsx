import { useNavigate } from "react-router-dom";
import { FC } from "react";

import { resetExercises } from "../../reduxSlices/exercisesChosenSlice";
import { resetOptions } from "../../reduxSlices/workoutOptionsSlice";
import { resetUI } from "../../reduxSlices/UISlice";
import { resetDeck } from "../../reduxSlices/deckSlice";

import { useAppDispatch } from '../../hooks';

import './navbarStyles.scss';

const Navbar: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return (
        <div className='titleSection'>
          <h1 className='titleText' onClick={() => {
            dispatch(resetExercises());
            dispatch(resetOptions());
            dispatch(resetUI());
            dispatch(resetDeck());
            navigate('/');
          }}>
            Deck Of Death
          </h1>
        </div>
    );
}

export default Navbar;
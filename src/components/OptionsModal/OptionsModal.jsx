import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import './optionsModalStyles.css';

import { useSelector, useDispatch } from 'react-redux'
import { setBreakoutAces, setOneHandedSuit, setEasyDeck } from '../../reduxSlices/workoutOptionsSlice';

const OptionsModal = ({modalOpen, handleClose}) => {
    const breakoutAces = useSelector((state) => state.workoutOptions.breakoutAces);
    const oneHandedSuit = useSelector((state) => state.workoutOptions.oneHandedSuit);
    const easyDeck = useSelector((state) => state.workoutOptions.easyDeck);
    const dispatch = useDispatch();

    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
        >
            <div className='modalContainer'>
            <FormGroup>
                <div className='switchGroupContainer'>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={breakoutAces}
                                onChange={() => dispatch(setBreakoutAces(!breakoutAces))}
                            />
                        }
                        label="Break out aces"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={oneHandedSuit}
                                onChange={() => dispatch(setOneHandedSuit(!oneHandedSuit))}
                            />
                        }
                        disabled
                        label="One handed suit"
                    /> {/* show a radio button list onchange to choose suit */}
                    <FormControlLabel
                        control={
                            <Switch
                                checked={easyDeck}
                                onChange={() => dispatch(setEasyDeck(!easyDeck))}
                            />
                        }
                        disabled
                        label="Easy deck"
                    />
                </div>
                <Button
                    variant="contained"
                    onClick={() => {
                        handleClose();
                    }}
                >
                    Close
                </Button>
            </FormGroup>
            </div>
        </Modal>
    );
}

export default OptionsModal;

//save options to session or cookie or something
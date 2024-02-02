import Modal from '@mui/material/Modal';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import './optionsModalStyles.scss';
import { FC, ReactElement } from 'react';

import { setBreakoutAces, setOneHandedSuit, setEasyDeck } from '../../reduxSlices/workoutOptionsSlice';

import { useAppSelector, useAppDispatch } from '../../hooks';

interface OptionsModalProps {
    modalOpen: boolean,
    handleClose: () => void
}

const OptionsModal: FC<OptionsModalProps> = ({modalOpen, handleClose}): ReactElement => {
    const breakoutAces = useAppSelector((state) => state.workoutOptions.breakoutAces);
    const oneHandedSuit = useAppSelector((state) => state.workoutOptions.oneHandedSuit);
    const easyDeck = useAppSelector((state) => state.workoutOptions.easyDeck);
    const dispatch = useAppDispatch();

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
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </FormGroup>
            </div>
        </Modal>
    );
}

export default OptionsModal;
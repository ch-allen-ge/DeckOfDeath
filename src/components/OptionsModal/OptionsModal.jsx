import { useState } from 'react';
import Modal from '@mui/material/Modal';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import './optionsModalStyles.css';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const OptionsModal = ({modalOpen, handleClose, options, setOptions, setWorkoutOptions}) => {
    const [breakOutAces, setBreakOutAces] = useState(options.breakOutAces);
    const [oneHandedSuit, setOneHandedSuit] = useState({
      set: false,
      suit: null
    });
    const [easyDeck, setEasyDeck] = useState(false);

    const getOptions = () => {
        return {
            breakOutAces,
            oneHandedSuit,
            easyDeck
        };
    };

    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className='modalContainer'>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={breakOutAces}
                            onChange={() => setBreakOutAces(!breakOutAces)}
                        />
                    }
                    label="Break out aces"
                />
                <FormControlLabel control={<Switch />} disabled label="One handed suit" /> {/* show a radio button list onchange to choose suit */}
                <FormControlLabel control={<Switch />} disabled label="Easy deck" />
                <Button
                    onClick={() => {
                        setOptions(getOptions());
                        //need to find a way to avoid setting both of these options, maybe redux for global state
                        setWorkoutOptions(getOptions());
                        handleClose();
                    }}
                >
                    Save
                </Button>
            </FormGroup>
            </div>
        </Modal>
    );
}

export default OptionsModal;

//save options to session or cookie or something
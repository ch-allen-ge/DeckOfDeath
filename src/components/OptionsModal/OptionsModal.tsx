import Modal from '@mui/material/Modal';
import './optionsModalStyles.scss';

import { setBreakoutAces, setEasyDeck } from '../../reduxSlices/workoutOptionsSlice';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { useHeartRateMonitor } from '../../devices/BluetoothContext';
import Button from '../Button';
import { useEffect, useState } from 'react';

interface OptionsModalProps {
    modalOpen: boolean,
    handleClose: () => void
}

const OptionsModal = ({modalOpen, handleClose}: OptionsModalProps) => {
    const dispatch = useAppDispatch();

    const breakoutAces = useAppSelector((state) => state.workoutOptions.breakoutAces);
    const easyDeck = useAppSelector((state) => state.workoutOptions.easyDeck);
    
    const { heartRateMonitor, heartRateValue, setHeartRateMonitor, disconnectHeartRateMonitor } = useHeartRateMonitor();

    const connectToHeartRateMonitor = async () => {
        try {
          //@ts-ignore
          const newDevice = await navigator.bluetooth.requestDevice({
            filters: [{ services: ['heart_rate'] }],
          });
          
          if (newDevice) {
            setHeartRateMonitor(newDevice);
          }
        } catch (error) {
          console.error('Error connecting to heart rate monitor:', error);
        }
    }

    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
        >
            <div className='options-modal'>
                <div className="options-modal__row">
                    <div className='options-modal__row__label'>
                        Break Out Aces
                    </div>
                    <div
                        className={`options-modal__row__content button onButton ${breakoutAces === true ? 'selected' : ''}`}
                        onClick={() => dispatch(setBreakoutAces(true))}
                    >
                        ON
                    </div>
                    <div
                        className={`options-modal__row__content button offButton ${breakoutAces === false ? 'selected' : ''}`}
                        onClick={() => dispatch(setBreakoutAces(false))}
                    >
                        OFF
                    </div>
                </div>
                <div className="options-modal__row">
                    <div className='options-modal__row__label'>
                        Easy Deck
                    </div>
                    <div className='options-modal__row__content'>
                        COMING SOON
                    </div>
                    
                </div>

                {/* @ts-ignore */}
                {navigator.bluetooth &&
                    <div className="options-modal__row">
                        <div className='options-modal__row__label'>
                            Heart Rate Monitor
                        </div>
                        <div className='options-modal__row__content'>
                            {heartRateMonitor ? 
                                <div className='options-modal__row__content--heartRate'>
                                    {heartRateValue === 0 ? (
                                        <div>Connecting...</div>
                                    ) : (
                                        <>
                                            <div>
                                                <div>Connected</div>
                                                <div>Heart Rate: {`${heartRateValue} bpm`}</div>
                                            </div>
                                            <Button 
                                                onClick={disconnectHeartRateMonitor}
                                            >
                                                Disconnect
                                            </Button>
                                        </>
                                    )}
                                    
                                </div>
                            :
                                <div>
                                    <Button
                                        onClick={connectToHeartRateMonitor}
                                    >
                                        Connect
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        </Modal>
    );
}

export default OptionsModal;
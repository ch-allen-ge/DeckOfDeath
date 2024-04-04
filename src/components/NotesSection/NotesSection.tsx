import { useState } from 'react';
import './notesSectionStyles.scss';
import { useMutation } from '@tanstack/react-query';
import { saveTheNote } from '../../api/patchRoutes';
import { TextareaAutosize } from '@mui/base';
import Button from '../Button';

const NotesSection = ({savedWorkoutId, savedNote} : {savedWorkoutId: number, savedNote: string | null}) => {
    const [note, setNote] = useState(savedNote ?? '');
    const [addingNotes, setAddingNotes] = useState<boolean>(false);

    const saveNote = useMutation({
        mutationFn: async (note: string) => {
            if (savedWorkoutId) {
                await saveTheNote(savedWorkoutId, note);
            }
        }
    });

    return (
        <div className='notes'>
            <h3>
                {note === '' ? 'How did it go?' : 'Notes'}
            </h3>
            {addingNotes ? (
                <>
                    <TextareaAutosize
                        onChange={(e) => {
                            setNote(e.target.value);
                        }}
                        value={note}
                        minRows={3}
                        maxRows={3}
                        className='feedbackTextarea'
                    />
                    <div className='noteButtonRow'>
                        <Button
                            onClick={() => {
                                if (note !== '') {
                                    saveNote.mutate(note);
                                }
                                setAddingNotes(false);
                            }}
                            styles={{
                                fontSize: 'small'
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={() => {
                                setAddingNotes(false);
                            }}
                            styles={{
                                fontSize: 'small'
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </>
            ): (
                <>
                    {note === '' ? (
                        <Button
                            onClick={() => {
                                setAddingNotes(true);
                            }}
                            styles={{
                                fontSize: 'small'
                            }}
                        >
                            Add notes
                        </Button>
                    ) : (
                        <>
                            <div>{note}</div>
                            <Button
                                onClick={() => {
                                    setAddingNotes(true);
                                }}
                                styles={{
                                    fontSize: 'small'
                                }}
                            >
                                Edit
                            </Button>
                        </>
                        
                    )}
                </>
            )}
        </div>
    );
};

export default NotesSection;
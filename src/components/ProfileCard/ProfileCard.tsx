import { useState } from 'react';

import './profileCardStyles.scss';

//maybe allow users to choose the card shape, for now circle only
const ProfileCard = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const file = e.target.files[0];
        setFile(file);
    };

    const uploadFile = () => {
        console.log('uploading');
    }
    return (
        <div className="App">
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadFile}>Upload</button>
        </div>
        </div>
    );
};

export default ProfileCard;
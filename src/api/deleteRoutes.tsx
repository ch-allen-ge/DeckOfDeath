import { dodDelete } from "../axios-config";

const deleteTheProPic = async () => {
    const response = await dodDelete('/profile/deleteProfilePicture');
    return response;
};

export {
    deleteTheProPic
};
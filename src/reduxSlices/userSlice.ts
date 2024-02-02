import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    username: string;
    joinedDate: Date | null;
}

const initialState: UserState = {
    username: '',
    joinedDate: null
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setJoinedDate: (state, action: PayloadAction<Date>) => {
            state.joinedDate = action.payload;
        },
        resetUser: (state) => {
            state.username = '';
            state.joinedDate = null;
        }
    }
});

export const {
    setUsername,
    setJoinedDate,
    resetUser
} = UserSlice.actions;

export default UserSlice.reducer;
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type UserState = {
	username: string;
	avatar: string;
	logined: boolean;
	role: string;
};

const initialState = {
	logined: false,
	role: `user`,
} as UserState;

export const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		reset: () => initialState,
		login: state => {
			state.logined = true;
		},
		logout: state => {
			state.logined = false;
		},
		changeUsername: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
		changeAvatar: (state, action: PayloadAction<string>) => {
			state.avatar = action.payload;
		},
		changeRole: (state, action: PayloadAction<string>) => {
			state.role = action.payload;
		}
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

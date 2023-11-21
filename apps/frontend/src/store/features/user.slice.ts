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
	name: `userSlice`,
	initialState,
	reducers: {
		reset: () => initialState,
		login: state => {
			state.logined = true;
		},
		logout: state => {
			state.logined = false;
		},
		forceUpdate: (state, action: PayloadAction<UserState>) => {
			state.username = action.payload.username;
			state.avatar = action.payload.avatar;
			state.role = action.payload.role;
			state.logined = action.payload.logined;
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

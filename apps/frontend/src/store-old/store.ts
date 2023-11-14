import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./features/user.slice";
import partyReducer from "./features/party.slice";
import trackerReducer from "./features/tracker.slice";
import darkReducer from "./features/dark.slice";

export const store = configureStore({
	reducer: {
		userReducer,
		partyReducer,
		trackerReducer,
		darkReducer,
	},
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

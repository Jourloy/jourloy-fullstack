import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./features/user.slice";
import budgetReducer from "./features/budget.slice";

export const store = configureStore({
	reducer: {
		userReducer,
		budgetReducer,
	},
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TTracker} from "../../types";
import TrackerAPI from "../../pages/tracker/api";

type TrackerState = {
	tracker: TTracker;
	spendPages: number;
};

const initialState = {
	spendPages: 1,
} as TrackerState;

const backend = new TrackerAPI();

export const trackerSlice = createSlice({
	name: "partySlice",
	initialState,
	reducers: {
		reset: () => initialState,
		updateTracker: () => {
			backend.autoUpdateTracker();
		},
		forceUpdateTracker: (state, action: PayloadAction<TTracker>) => {
			state.tracker = action.payload;
		},
		updateSpendPages: (state, action: PayloadAction<number>) => {
			state.spendPages = action.payload;
		},
	},
});

export const trackerActions = trackerSlice.actions;
export default trackerSlice.reducer;

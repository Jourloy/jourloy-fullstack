import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { TDarkAttribute, TDarkClass } from "../../types";
import DarkAPI from "../../pages/dark/api";

type DarkState = {
	classes: TDarkClass[];
	attributes: TDarkAttribute[];
};

const initialState = {
	classes: [],
	attributes: [],
} as DarkState;

const backend = new DarkAPI();

export const darkSlice = createSlice({
	name: "partySlice",
	initialState,
	reducers: {
		reset: () => initialState,
		updateDark: () => {
			backend.updateDark();
		},
		updateClasses: () => {
			backend.getAllClassesInStore();
		},
		updateClassesForce: (state, action: PayloadAction<TDarkClass[]>) => {
			state.classes = action.payload;
		},
		updateAttributes: () => {
			backend.getAllAttributesInStore();
		},
		updateAttributesForce: (state, action: PayloadAction<TDarkAttribute[]>) => {
			state.attributes = action.payload;
		}
	},
});

export const darkActions = darkSlice.actions;
export default darkSlice.reducer;

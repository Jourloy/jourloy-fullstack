import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TCalculator} from "../../types";
import PartyAPI from "../../pages/party/api";
import {store} from "../store";

type PartyState = {
	calculator: TCalculator;
	memberPages: number;
	positionPages: number;
};

const initialState = {
	memberPages: 1,
	positionPages: 1,
} as PartyState;

const updateCalculator = () => {
	const backend = new PartyAPI();
	backend
		.getCalculator()
		.then(d => {
			if (d && d.data && d.data.id) {
				store.dispatch(partyActions.forceUpdateCalculator(d.data));
				store.dispatch(partyActions.updateMemberPages(Math.ceil(d.data.members.length / 5)));
				store.dispatch(
					partyActions.updatePositionPages(Math.ceil(d.data.positions.length / 10))
				);
			}
		})
		.catch(() => null);
};

export const partySlice = createSlice({
	name: "partySlice",
	initialState,
	reducers: {
		reset: () => initialState,
		updateCalculator: () => {
			updateCalculator();
		},
		forceUpdateCalculator: (state, action: PayloadAction<TCalculator>) => {
			state.calculator = action.payload;
		},
		updateMemberPages: (state, action: PayloadAction<number>) => {
			state.memberPages = action.payload;
		},
		updatePositionPages: (state, action: PayloadAction<number>) => {
			state.positionPages = action.payload;
		},
	},
});

export const partyActions = partySlice.actions;
export default partySlice.reducer;

import {PayloadAction, createSlice} from "@reduxjs/toolkit";

export type TSpend = {
	id: number;
	cost: number;
	category: string;
	description: string;
	date?: string;
	repeat?: string;
	createdAt: string;
	updatedAt: string;
};

export type TBudget = {
	id: number;
	name: string;
	limit: number;
	periodLimit: number;
	period: string;
	startDate: string;
	spends: TSpend[];
	daysPassed: number;
	daysLeft: number;
	todayLimit: number;
	monthSpend: number;
	monthIncome: number;
	createdAt: string;
	updatedAt: string;
	todayBudget: number;
};

type BudgetState = {
	budgets: TBudget[];
	currentBudget?: TBudget;
};

const initialState = {
	budgets: [],
} as BudgetState;

export const budgetSlice = createSlice({
	name: `budgetSlice`,
	initialState,
	reducers: {
		reset: () => initialState,
		forceUpdate: (state, action: PayloadAction<TBudget[]>) => {
			state.budgets = action.payload;
		},
		setCurrentBudget: (state, action: PayloadAction<TBudget>) => {
			state.currentBudget = action.payload;
		}
	},
});

export const budgetActions = budgetSlice.actions;
export default budgetSlice.reducer;

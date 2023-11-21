import { TBudget } from "src/store/features/budget.slice";
import BudgetAPI from "./budgetAPI";

export default class BudgetLogic {
	private budget: TBudget;
	private api = new BudgetAPI();

	constructor(budget: TBudget) {
		this.budget = budget;
	}

	/**
	 * Returns the calculation mode. Need for label above progress bar.
	 * @returns The calculation mode ('Недельный' or 'Дневной').
	 */
	public getCalcMode() {
		// If the calculation mode is 'weekCalc', return 'Недельный'
		if (this.budget.period === `week`) {
			return `Недельный`;
		}
		// Otherwise, return 'Дневной'
		return `Дневной`;
	}

	/**
	 * Calculates the progress based on the number of days elapsed.
	 * @returns The progress percentage.
	 */
	public getProgress() {
		const max = 30;

		// If the number of days is greater than the maximum, return 100% progress.
		if (this.budget.daysLeft > max) return 100;

		// If the number of days is negative, return 0% progress.
		if (this.budget.daysLeft < 0) return 0;

		// Calculate and return the progress percentage.
		return (this.budget.daysLeft / max) * 100;
	}

	/**
	 * Returns the color for the progress based on the current progress value and the number of months.
	 * @returns The color for the progress.
	 */
	public getProgressColor() {
		// Get the current progress
		const progress = this.getProgress();

		// Calculate the threshold values based on the number of months
		const threshold1 = 30 / 4;
		const threshold2 = 30 / 2;

		// Return red if progress is less than threshold1
		if (progress < threshold1) return `red`;
		// Return orange if progress is less than threshold2
		if (progress < threshold2) return `orange`;
		// Return green for all other cases
		return `green`;
	}

	public addDay() {
		const newStartDate = new Date(this.budget.startDate).getTime() + 1000 * 60 * 60 * 24;
		return this.api.updateBudget({...this.budget, startDate: new Date(newStartDate).toString()});
	}

	public removeDay() {
		const newStartDate = new Date(this.budget.startDate).getTime() - 1000 * 60 * 60 * 24;
		return this.api.updateBudget({...this.budget, startDate: new Date(newStartDate).toString()});
	}
}
import { ISpend } from "../../types";

export default class TrackerLogic {
	/**
	 * Returns the color for a badge based on the cost of a spend.
	 * @param spend - The spend object containing the cost.
	 * @returns The color string for the badge.
	 */
	public getBadgeColor(spend: ISpend) {
		// If the cost is greater than or equal to 0, return green.
		if (spend.cost >= 0) {
			return `green`;
		} else {
			// If the cost is less than 0, return red.
			return `red`;
		}
	}

	/**
	 * Retrieves the income categories.
	 *
	 * @returns An array of income categories.
	 */
	public getIncomeCategory() {
		return [
			{value: `work`, label: `Работа`}, // Represents income from work
			{value: `present`, label: `Подарок`}, // Represents income from presents
			{value: `other`, label: `Другое`}, // Represents other income sources
		];
	}

	// Returns an array of spend categories with their corresponding values and labels
	public getSpendCategory() {
		return [
			{value: `health`, label: `Здоровье`}, // Represents the category for health expenses
			{value: `food`, label: `Еда и товары`}, // Represents the category for food expenses
			{value: `education`, label: `Образование`}, // Represents the category for education expenses
			{value: `entertainment`, label: `Развлечения`}, // Represents the category for entertainment expenses
			{value: `transport`, label: `Транспорт`}, // Represents the category for transport expenses
			{value: `travel`, label: `Путешествие`}, // Represents the category for travel expenses
			{value: `housing`, label: `Жилье`}, // Represents the category for housing expenses
			{value: `clothing`, label: `Одежда`}, // Represents the category for clothing expenses
			{value: `digital`, label: `Цифровые покупки`}, // Represents the category for digital purchases
			{value: `other`, label: `Другое или непредвиденное`}, // Represents the category for other expenses
		];
	}

	/**
	 * Formats the given category value.
	 * @param {string} value - The category value to format.
	 * @returns {string|null} - The formatted category label, or null if not found.
	 */
	public formatCategory(value: string): string | null {
		// Check income categories
		for (const cat of this.getIncomeCategory()) {
			if (cat.value === value) return cat.label;
		}

		// Check spend categories
		for (const cat of this.getSpendCategory()) {
			if (cat.value === value) return cat.label;
		}

		// Category not found
		return null;
	}

}
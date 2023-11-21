import { TSpend } from "src/store/features/budget.slice";

export default class SpendLogic {
	private spend: TSpend;
	
	constructor(spend: TSpend) {
		this.spend = spend;
	}

	/**
	 * Retrieves the income categories.
	 *
	 * @returns An array of income categories.
	 */
	public static getIncomeCategory() {
		return [
			{value: `work`, label: `Работа`}, // Represents income from work
			{value: `present`, label: `Подарок`}, // Represents income from presents
			{value: `other`, label: `Другое`}, // Represents other income sources
		];
	}

	// Returns an array of spend categories with their corresponding values and labels
	public static getSpendCategory() {
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
	 * @returns The formatted category label, or null if not found.
	 */
	public formatCategory() {
		// Check income categories
		for (const category of SpendLogic.getIncomeCategory()) {
			if (category.value === this.spend.category) return category.label;
		}

		// Check spend categories
		for (const category of SpendLogic.getSpendCategory()) {
			if (category.value === this.spend.category) return category.label;
		}

		// Category not found
		return null;
	}

	/**
	 * Returns the color for a badge based on the cost of a spend.
	 * @param spend - The spend object containing the cost.
	 * @returns The color string for the badge.
	 */
	public getBadgeColor() {
		// If the cost is greater than or equal to 0, return green.
		if (this.spend.cost >= 0) {
			return `green`;
		} else {
			// If the cost is less than 0, return red.
			return `red`;
		}
	}
}
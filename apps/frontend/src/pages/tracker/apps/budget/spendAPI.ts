import BackendContext from "src/context/backend";

export default class SpendAPI extends BackendContext {
	constructor() {
		super(`/spend`);
	}

	public async createSpend(data: {
		budgetId: number;
		cost: number;
		category: string;
		description?: string;
		date?: string;
		repeat?: string;
	}) {
		return this.context.post(`/`, data);
	}

	public async deleteSpend(id: number) {
		return this.context.delete(`/${id}`);
	}
}

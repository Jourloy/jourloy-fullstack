import BackendContext from "src/context/backend";

export default class SpendAPI extends BackendContext {
	constructor() {
		super(`/api`);
	}

	public async createSpend(data: {
		name: string;
		cost: number;
		category: string;
		description?: string;
		date?: string;
		repeat?: string;
	}) {
		return this.context.post(`/spend`, data);
	}
}

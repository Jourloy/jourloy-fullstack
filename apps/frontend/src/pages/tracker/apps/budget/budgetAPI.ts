import BackendContext from "src/context/backend";
import {TBudget, budgetActions} from "src/store/features/budget.slice";
import {store} from "src/store/store";

export default class BudgetAPI extends BackendContext {
	constructor() {
		super(`/budget`);
	}

	public async getBudgets() {
		return this.context.get<TBudget[]>(`/all`, {withCredentials: true});
	}

	public async createBudget(data: {name: string; limit: number; period: string; periodLimit: number}) {
		return this.context.post(`/`, data, {withCredentials: true});
	}

	public async updateBudget(budget: TBudget) {
		return this.context.patch(`/`, budget, {withCredentials: true});
	}

	public async deleteBudget(id: number) {
		return this.context.delete(`/${id}`, {withCredentials: true});
	}

	public async updateBudgetsInStore() {
		const resp = await this.getBudgets();
		if (resp.data) {
			store.dispatch(budgetActions.forceUpdate(resp.data));
		}
	}
}

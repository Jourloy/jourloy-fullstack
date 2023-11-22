import {useState} from "react";
import {TBudget} from "src/store/features/budget.slice";
import {store} from "src/store/store";
import Spend from "./spend";

type TProps = {
	budgetId: number;
};

export default function SpendComponent(props: TProps) {
	const [budget, setBudget] = useState<TBudget>(
		store.getState().budgetReducer.budgets.filter(budget => budget.id === props.budgetId)[0]
	);
	store.subscribe(() => {
		setBudget(
			store.getState().budgetReducer.budgets.filter(budget => budget.id === props.budgetId)[0]
		);
	});

	const spends = budget.spends.filter(spend => spend.date == null);

	return spends.map(spend => (
		<div className={`col-span-12 flex flex-col`} key={spend.id}>
			<Spend spend={spend} />
		</div>
	));
}

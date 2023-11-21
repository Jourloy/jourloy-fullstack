import {ActionIcon, Button, Card, Divider, Progress, Select} from "@mantine/core";
import {useDocumentTitle} from "@mantine/hooks";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import BudgetLogic from "./logic";
import {formatter} from "src/context";
import SettingsButton from "./components/settingsButton/button";
import {store} from "src/store/store";
import {IconPlus} from "@tabler/icons-react";
import SpendButton from "./components/spendButton/button";
import DaysButton from "./components/daysButton/button";
import BudgetFAQ from "./components/faq/faq";
import CoffeButton from "src/components/inputs/CoffeButton";

export default function BudgetIndex() {
	useDocumentTitle(`Бюджет`);
	const navigate = useNavigate();

	const [budget, setBudget] = useState(store.getState().budgetReducer.budgets[0]);
	store.subscribe(() => {
		setBudget(store.getState().budgetReducer.budgets[0]);
	});

	const budgetLogic = new BudgetLogic(budget);

	const mapBudgets = () => {
		return store.getState().budgetReducer.budgets.map(budget => {
			return {
				value: budget.id.toString(),
				label: budget.name,
			};
		});
	};

	useEffect(() => {
		if (!store.getState().userReducer.logined) navigate(`/login`);
	}, []);

	return (
		<main className={`w-full h-full flex flex-col justify-start items-center p-5 space-y-5`}>
			<div className={`max-w-[850px] w-full grid grid-cols-12 gap-5`}>
				<div className={`col-span-12 flex w-full space-x-5 items-center`}>
					<Select
						data={mapBudgets()}
						value={budget.id.toString()}
						disabled={store.getState().budgetReducer.budgets.length < 2}
						onChange={value => {
							const budget = store
								.getState()
								.budgetReducer.budgets.find(budget => budget.id.toString() === value);
							if (budget) setBudget(budget);
						}}
						allowDeselect={false}
						className={`w-full`}
					/>
					<ActionIcon className={`h-[36px] w-[36px]`} variant={`default`} color={`subtle`}>
						<IconPlus stroke={1.3} />
					</ActionIcon>
				</div>

				<Card withBorder className={`col-span-12 flex flex-col`}>
					<div className={`flex flex-row justify-between items-center`}>
						<h2 className={`text-[30px]`}>Лимит</h2>
						<h2 className={`text-[30px]`}>{formatter.format(budget.todayLimit)}</h2>
					</div>

					<Divider className={`w-full my-[15px]`} />

					<Progress
						h={`15px`}
						value={budgetLogic.getProgress()}
						color={budgetLogic.getProgressColor()}
					/>

					<div className={`flex flex-row justify-between items-center`}>
						<p className={`text-neutral-500`}>Осталось дней: {budget.daysLeft}</p>
						<p className={`text-neutral-500`}>
							Бюджет: {formatter.format(budgetLogic.getTodayBudget())}
						</p>
					</div>

					<SettingsButton budgetId={budget.id} />
				</Card>

				<SpendButton type={`income`} className={`col-span-6 md:col-span-4`} />
				<SpendButton type={`spend`} className={`col-span-6 md:col-span-4`} />
				<SpendButton type={`credit`} className={`col-span-12 md:col-span-4`} />

				<DaysButton type={`add`} className={`col-span-6 md:col-span-6`} />
				<DaysButton type={`remove`} className={`col-span-6 md:col-span-6`} />

				<Card withBorder className={`col-span-12 md:col-span-8 flex flex-col space-y-5`}>
					<h2 className={`text-[30px] text-center`}>Статистика за месяц</h2>
					<Divider className={`w-full`} />
					<div className={`flex flex-row justify-around items-center space-x-5`}>
						<Card withBorder className={`w-full`}>
							<h3 className={`text-center text-[20px] text-green-500`}>
								+{` `}
								{formatter.format(budget.monthIncome)}
							</h3>
						</Card>
						<Card withBorder className={`w-full`}>
							<h3 className={`text-center text-[20px] text-red-500`}>
								-{` `}
								{formatter.format(budget.monthSpend)}
							</h3>
						</Card>
					</div>
					<Button variant={`gradient`} gradient={{from: `orange`, to: `yellow`, deg: 20}}>
						Аналитика
					</Button>
				</Card>

				<Card withBorder className={`col-span-12 md:col-span-4 flex flex-col space-y-5`}>
					<h2 className={`text-[30px] text-center`}>Кредит</h2>
					<Divider className={`w-full my-[15px]`} />
					<Card withBorder className={`min-w-[200px]`}>
						<h3 className={`text-center text-[20px] text-red-500`}>
							-{` `}
							{formatter.format(budget.monthSpend)}
						</h3>
					</Card>
					<Button color={`black`}>Выплатить</Button>
				</Card>

				<Divider
					label={<p className={`uppercase text-[20px]`}>Запланированные расходы</p>}
					labelPosition={`center`}
					className={`col-span-12`}
				/>

				<Divider
					label={<p className={`uppercase text-[20px]`}>Последние операции</p>}
					labelPosition={`center`}
					className={`col-span-12`}
				/>

				<Divider className={`col-span-12`} />

				<div className={`col-span-12`}>
					<BudgetFAQ />
				</div>

				<Divider className={`col-span-12`} />

				<div className={`col-span-12`}>
					<CoffeButton target={`budget`} />
				</div>
			</div>
		</main>
	);
}

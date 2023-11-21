import {Button, Divider, Modal, NumberInput, Select, TextInput} from "@mantine/core";
import {useForm, zodResolver} from "@mantine/form";
import {z} from "zod";
import BudgetAPI from "../../budgetAPI";
import {useState} from "react";
import {showNotification} from "@mantine/notifications";
import {TBudget} from "src/store/features/budget.slice";
import {store} from "src/store/store";

type TProps = {
	opened: boolean;
	onClose: () => void;
	budgetId: number;
};

export default function SettingsModal(props: TProps) {
	const budgetAPI = new BudgetAPI();

	const [loading, setLoading] = useState(false);
	const [budget, setBudget] = useState<TBudget>(
		store.getState().budgetReducer.budgets.filter(budget => budget.id === props.budgetId)[0]
	);
	store.subscribe(() => {
		setBudget(store.getState().budgetReducer.budgets.filter(budget => budget.id === props.budgetId)[0]);
	})

	const schema = z.object({
		limit: z.number().min(1),
		period: z.string(),
		periodLimit: z.number().min(1),
		name: z.string().min(1).max(15),
		terms: z.boolean(),
	});

	const form = useForm({
		initialValues: {
			limit: budget.limit,
			period: budget.period,
			periodLimit: budget.periodLimit,
			name: budget.name,
		},
		validate: zodResolver(schema),
	});

	const periodLabel = () => {
		switch (form.values.period) {
			case `day`:
				return `день`;
			case `week`:
				return `неделю`;
		}
	};

	const onSubmit = () => {
		setLoading(true);
		budgetAPI
			.updateBudget({
				...budget,
				limit: form.values.limit,
				period: form.values.period,
				periodLimit: form.values.periodLimit,
				name: form.values.name,
			})
			.then(() => {
				showNotification({
					title: `Успех`,
					message: `Бюджет успешно обновлен!`,
					color: `green`,
				});
				onClose();
			})
			.catch(() => {
				showNotification({
					title: `Ошибка`,
					message: `Произошла ошибка при обновлении бюджета`,
					color: `red`,
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const onClose = () => {
		budgetAPI.updateBudgetsInStore();
		props.onClose();
	};

	return (
		<Modal
			opened={props.opened}
			onClose={onClose}
			withCloseButton={false}
			centered
			className={`flex flex-col`}
		>
			<h2 className={`text-center uppercase text-[20px]`}>Настройки бюджета</h2>
			<Divider className={`my-[15px]`} />

			<div className={`flex flex-col space-y-5`}>
				<TextInput
					label={`Имя твоего бюджета`}
					className={`w-full`}
					withAsterisk
					{...form.getInputProps(`name`)}
				/>

				<Select
					label={`Периоды бюджета`}
					className={`w-full`}
					withAsterisk
					data={[
						{value: `day`, label: `По дням`},
						{value: `week`, label: `По неделям`},
					]}
					{...form.getInputProps(`period`)}
				/>

				<NumberInput
					label={`Хочешь тратить в ${periodLabel()}`}
					className={`w-full`}
					min={1}
					step={100}
					withAsterisk
					{...form.getInputProps(`periodLimit`)}
				/>

				<NumberInput
					label={`Сейчас у тебя есть`}
					description={`Эту настройку не меняй`}
					className={`w-full`}
					min={1}
					step={1000}
					withAsterisk
					{...form.getInputProps(`limit`)}
				/>

				<Button disabled={!form.isDirty()} color={`black`} loading={loading} onClick={onSubmit}>
					Сохранить
				</Button>
			</div>
		</Modal>
	);
}

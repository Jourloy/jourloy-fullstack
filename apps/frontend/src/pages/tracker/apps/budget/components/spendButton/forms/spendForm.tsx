import {Button, NumberInput, Select, Switch, Textarea} from "@mantine/core";
import {useForm} from "@mantine/form";
import SpendLogic from "../../../spendLogic";
import {useState} from "react";
import {DatePickerInput} from "@mantine/dates";
import SpendAPI from "../../../spendAPI";
import { showNotification } from "@mantine/notifications";
import { store } from "src/store/store";
import BudgetAPI from "../../../budgetAPI";

type TProps = {
	onClose: () => void;
};

export default function SpendForm({onClose}: TProps) {
	const spendAPI = new SpendAPI();
	const budgetAPI = new BudgetAPI();

	const [planned, setPlanned] = useState(false);
	const [loading, setLoading] = useState(false);

	const form = useForm({
		initialValues: {
			cost: -1,
			category: ``,
			description: ``,
			repeat: `Никогда`,
			date: new Date(Date.now() + 24 * 60 * 60 * 1000),
		},
	});

	const categories = SpendLogic.getSpendCategory();

	const onSubmit = () => {
		setLoading(true);
		spendAPI
			.createSpend({
				budgetId: store.getState().budgetReducer.currentBudget!.id,
				cost: form.values.cost,
				category: form.values.category,
				description: form.values.description,
				repeat: planned ? form.values.repeat : undefined,
				date: planned ? form.values.date.toISOString() : undefined,
			})
			.then(() => {
				budgetAPI.updateBudgetsInStore();
				showNotification({
					title: `Успех`,
					message: `Расход успешно создан!`,
					color: `green`,
				});
				onClose();
			})
			.catch(() => {
				showNotification({
					title: `Ошибка`,
					message: `Произошла ошибка при создании расхода`,
					color: `red`,
				});
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<>
			<NumberInput
				label={`Сколько потрачено`}
				description={`В рублях`}
				withAsterisk
				max={-1}
				step={100}
				{...form.getInputProps(`cost`)}
			/>

			<Select
				data={categories}
				label={`Какая категория`}
				withAsterisk
				{...form.getInputProps(`category`)}
				searchable
			/>

			<Textarea
				label={`Описание`}
				placeholder={`Необязательно`}
				{...form.getInputProps(`description`)}
				maxLength={200}
				minRows={2}
				maxRows={2}
			/>

			<Switch
				radius={`sm`}
				label={`Запланировать`}
				checked={planned}
				onChange={e => setPlanned(e.currentTarget.checked)}
				color={`orange`}
			/>

			{planned && (
				<>
					<div className={`flex flex-col space-y-5 mt-[15px]`}>
						<DatePickerInput
							label={`Выбери дату`}
							withAsterisk
							valueFormat={`DD MMMM YYYY`}
							minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
							{...form.getInputProps(`date`)}
						/>

						<Select
							data={[`Никогда`, `Ежедневно`, `Еженедельно`, `Ежемесячно`, `Ежегодно`]}
							label={`Как часто повторять`}
							withAsterisk
							{...form.getInputProps(`repeat`)}
							maxDropdownHeight={170}
							searchable
						/>
					</div>
				</>
			)}

			<Button color={`black`} onClick={onSubmit} loading={loading}>
				Добавить
			</Button>
		</>
	);
}

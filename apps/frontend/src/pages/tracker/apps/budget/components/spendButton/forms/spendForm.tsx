import {Button, NumberInput, Select, Switch, Textarea} from "@mantine/core";
import {useForm} from "@mantine/form";
import SpendLogic from "../../../spendLogic";
import {useState} from "react";
import {DatePickerInput} from "@mantine/dates";

export default function SpendForm() {
	const [planned, setPlanned] = useState(false);

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

			<Button color={`black`}>
				Добавить
			</Button>
		</>
	);
}

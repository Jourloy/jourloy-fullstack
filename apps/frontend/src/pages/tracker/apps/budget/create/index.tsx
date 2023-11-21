import {Anchor, Button, Card, Checkbox, Divider, NumberInput, Select, TextInput} from "@mantine/core";
import {useForm, zodResolver} from "@mantine/form";
import {z} from "zod";
import BudgetAPI from "../budgetAPI";
import {showNotification} from "@mantine/notifications";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {store} from "src/store/store";
import {budgetActions} from "src/store/features/budget.slice";

export default function BudgetCreate() {
	const budgetAPI = new BudgetAPI();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const schema = z.object({
		limit: z.number().min(1),
		period: z.string(),
		periodLimit: z.number().min(1),
		name: z.string().min(1).max(15),
		terms: z.boolean(),
	});

	const form = useForm({
		initialValues: {
			limit: 50000,
			period: `day`,
			periodLimit: 500,
			name: `Твой трекер`,
			terms: false,
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
			.createBudget(form.values)
			.then(() => {
				store.dispatch(budgetActions.getBudgets());
				showNotification({
					title: `Успех`,
					message: `Бюджет успешно создан!`,
					color: `green`,
				});
				navigate(`/budget`);
			})
			.catch(() => {
				showNotification({
					title: `Ошибка`,
					message: `Произошла ошибка при создании бюджета`,
					color: `red`,
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<main className={`flex justify-center items-center h-screen`}>
			<Card
				withBorder
				className={`max-w-[850px] w-full flex flex-col space-y-5 justify-center items-center`}
			>
				<h1 className={`text-[30px] uppercase mt-[30px]`}>Давай создадим бюджет вместе</h1>

				<p className={`text-neutral-400 text-[15px] text-center`}>
					Информацию, полученную здесь и потом мы никому не будем передавать. При этом,
					используя этот сервис, ты соглашаешься с тем, что мы будем использовать твою
					информацию для расчетов и хранить у себя
				</p>

				<Divider className={`my-[15px] w-full`} />

				<NumberInput
					label={<span className={`text-[16px]`}>Сколько у тебя сейчас есть денег?</span>}
					className={`w-full`}
					min={1}
					step={1000}
					withAsterisk
					{...form.getInputProps(`limit`)}
				/>

				<Select
					label={<span className={`text-[16px]`}>Как будем рассчитывать лимит?</span>}
					className={`w-full`}
					withAsterisk
					data={[
						{value: `day`, label: `По дням`},
						{value: `week`, label: `По неделям`},
					]}
					{...form.getInputProps(`period`)}
				/>

				<NumberInput
					label={
						<span className={`text-[16px]`}>Сколько хочешь тратить в {periodLabel()}?</span>
					}
					className={`w-full`}
					min={1}
					step={100}
					withAsterisk
					{...form.getInputProps(`periodLimit`)}
				/>

				<TextInput
					label={<span className={`text-[16px]`}>Давай придумаем название бюджету</span>}
					className={`w-full`}
					withAsterisk
					{...form.getInputProps(`name`)}
				/>

				<Checkbox
					label={
						<p>
							Я согласен{" "}
							<Anchor href={`#`} color={`_black`} inherit>
								с условиями
							</Anchor>
						</p>
					}
					{...form.getInputProps(`terms`)}
					color={`black`}
				/>

				<Button
					fullWidth
					color={`black`}
					disabled={!form.values.terms}
					loading={loading}
					onClick={onSubmit}
				>
					Создать
				</Button>
			</Card>
		</main>
	);
}

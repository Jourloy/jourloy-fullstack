import {Button, Divider, Modal, NumberInput, Select, Textarea} from "@mantine/core";
import {useForm} from "@mantine/form";
import {TSpend} from "src/store/features/budget.slice";
import SpendLogic from "../../spendLogic";
import {useState} from "react";
import SpendAPI from "../../spendAPI";
import BudgetAPI from "../../budgetAPI";
import {showNotification} from "@mantine/notifications";

type TProps = {
	opened: boolean;
	onClose: () => void;
	spend: TSpend;
};

export default function SpendModal({spend, opened, onClose}: TProps) {
	const budgetAPI = new BudgetAPI();
	const spendAPI = new SpendAPI();

	const [deleteMode, setDeleteMode] = useState(false);
	const [loadingRemove, setLoadingRemove] = useState(false);

	const form = useForm({
		initialValues: {
			cost: spend.cost,
			category: spend.category,
			description: spend.description,
		},
	});

	const categories = SpendLogic.getSpendCategory();

	const onRemove = () => {
		setLoadingRemove(true);
		spendAPI
			.deleteSpend(spend.id)
			.then(() => {
				budgetAPI.updateBudgetsInStore();
				onClose();
				showNotification({
					title: `Успех`,
					message: `Расход успешно удален!`,
					color: `green`,
				});
			})
			.catch(() => {
				showNotification({
					title: `Ошибка`,
					message: `Произошла ошибка при удалении расхода`,
					color: `red`,
				});
			})
			.finally(() => {
				setLoadingRemove(false);
			});
	};

	return (
		<Modal opened={opened} onClose={onClose} withCloseButton={false} centered>
			<div className={`flex flex-col space-y-5`}>
				<h1 className={`text-[25px] text-center`}>Настройка</h1>

				<Divider className={`w-full`} />

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
					placeholder={`Пусто`}
					{...form.getInputProps(`description`)}
					maxLength={200}
					minRows={2}
					maxRows={2}
				/>

				<Divider
					className={`w-full`}
					labelPosition={`center`}
					label={<p className={`text-[14px] lowercase`}>Не редактируемое</p>}
				/>

				<Select
					data={[`Никогда`, `Ежедневно`, `Еженедельно`, `Ежемесячно`, `Ежегодно`]}
					label={`Как часто повторять`}
					{...form.getInputProps(`repeat`)}
					disabled
				/>

				<Divider className={`w-full`} />

				<Button color={`black`} disabled={!form.isDirty()}>
					Сохранить
				</Button>

				{!deleteMode && (
					<Button color={`red`} variant={`outline`} onClick={() => setDeleteMode(true)}>
						Удалить
					</Button>
				)}

				{deleteMode && (
					<div className={`flex flex-col space-y-5`}>
						<Divider />
						<h3 className={`text-center text-[20px]`}>Точно?</h3>
						<div className={`flex flex-row justify-between items-center space-x-5`}>
							<Button
								fullWidth
								color={`red`}
								variant={`outline`}
								onClick={onRemove}
								loading={loadingRemove}
							>
								Да
							</Button>
							<Button
								fullWidth
								color={`green`}
								onClick={() => setDeleteMode(false)}
								loading={loadingRemove}
							>
								Нет
							</Button>
						</div>
					</div>
				)}
			</div>
		</Modal>
	);
}

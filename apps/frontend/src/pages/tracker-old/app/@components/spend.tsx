import {
	Badge,
	Button,
	Card,
	Center,
	Divider,
	Grid,
	Modal,
	NumberInput,
	Select,
	Text,
	Textarea,
	Title,
	UnstyledButton,
} from "@mantine/core";
import {TSpend} from "../../../../types";
import dayjs from "dayjs";
import TrackerLogic from "../../logic";
import {formatter} from "../../../../context";
import {useState} from "react";
import {useForm} from "@mantine/form";
import TrackerAPI from "../../api";
import LongPressButton from "../../../../components/actions/longPressButton";
import ErrorNotification from "../../../../components/logical/notification/error.notification";
import SuccessNotification from "../../../../components/logical/notification/success.notification";

type THistorySpendProps = {
	spend: TSpend;
	length: number;
	index: number;
};

export default function HistorySpend(props: THistorySpendProps) {
	const backend = new TrackerAPI();
	const logic = new TrackerLogic();

	const incomeData = logic.getIncomeCategory();
	const spendData = logic.getSpendCategory();

	const [modalShow, setModalShow] = useState(false);

	const [changeLoading, setChangeLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);

	const onRemove = async () => {
		setDeleteLoading(true);
		return backend
			.removeSpend(props.spend.id)
			.then(() => {
				SuccessNotification({message: `Расход успешно удален`});
				backend.autoUpdateTracker();
				onClose();
			})
			.catch(() => {
				ErrorNotification();
			})
			.finally(() => setDeleteLoading(false));
	};

	const onChange = (values: {cost: number; category: string; description?: string}) => {
		setChangeLoading(true);
		backend
			.updateSpend(props.spend.id, {...values, createdAt: props.spend.createdAt})
			.then(() => {
				SuccessNotification({message: `Расход успешно изменен`});
				backend.autoUpdateTracker();
				onClose();
			})
			.catch(() => {
				ErrorNotification();
			})
			.finally(() => setChangeLoading(false));
	};

	const form = useForm({
		initialValues: {
			cost: props.spend.cost,
			category: props.spend.category,
			description: props.spend.description,
		},
		validate: {
			cost: value =>
				props.spend.cost < 0 && value > 0
					? `Сумма должна быть меньше нуля`
					: props.spend.cost > 0 && value < 0
					? `Сумма должна быть больше нуля`
					: null,
			category: value => (value === `` ? `Выберите категорию` : null),
		},
	});

	const onClose = () => {
		setModalShow(false);
		setDeleteLoading(false);
		setChangeLoading(false);
	};

	return (
		<>
			<Modal opened={modalShow} onClose={onClose} centered>
				<Grid>
					<Grid.Col>
						<Title order={2} align={`center`}>
							Настройка
						</Title>
					</Grid.Col>
					<Grid.Col>
						<Divider />
					</Grid.Col>
					<form style={{width: `100%`}} onSubmit={form.onSubmit(values => onChange(values))}>
						<Grid.Col>
							<NumberInput
								label={`Сумма`}
								description={`В рублях`}
								withAsterisk
								{...form.getInputProps(`cost`)}
								min={props.spend.cost > 0 ? 1 : undefined}
								max={props.spend.cost < 0 ? -1 : undefined}
								formatter={value =>
									!Number.isNaN(parseInt(value)) ? formatter.format(+value) : value
								}
							/>
						</Grid.Col>

						<Grid.Col>
							<Select
								data={props.spend.cost > 0 ? incomeData : spendData}
								label={`Какая категория`}
								placeholder={`Категория не выбрана`}
								withAsterisk
								{...form.getInputProps(`category`)}
							/>
						</Grid.Col>

						<Grid.Col>
							<Textarea
								label={`Описание`}
								placeholder={`Не обязательно`}
								{...form.getInputProps(`description`)}
								maxLength={200}
								minRows={2}
								maxRows={2}
							/>
						</Grid.Col>

						<Grid.Col>
							<Button
								disabled={!form.isDirty()}
								type={`submit`}
								fullWidth
								loading={changeLoading}
							>
								Сохранить
							</Button>
						</Grid.Col>
					</form>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<LongPressButton
							label={`Удалить`}
							seconds={1}
							color={`red`}
							variant={`outline`}
							loading={deleteLoading}
							onPressed={onRemove}
							fullWidth
						/>
					</Grid.Col>

					<Grid.Col>
						<Text
							align={`center`}
							color={`dimmed`}
							mt={`-15px`}
							size={`sm`}
							tt={`lowercase`}
						>
							Это действие нельзя будет отменить
						</Text>
					</Grid.Col>
				</Grid>
			</Modal>

			<UnstyledButton w={`100%`} onClick={() => setModalShow(true)}>
				<Card withBorder py={`sm`} px={`md`}>
					<Grid>
						<Grid.Col span={3}>
							<Text align={`left`}>{formatter.format(props.spend.cost)}</Text>
						</Grid.Col>

						<Grid.Col span={6}>
							<Center h={`100%`} w={`100%`}>
								<Badge
									color={logic.getBadgeColor(props.spend)}
									radius={`sm`}
									variant={`outline`}
								>
									<Center h={`100%`}>
										<Text truncate>
											{logic.formatCategory(props.spend.category)}
										</Text>
									</Center>
								</Badge>
							</Center>
						</Grid.Col>

						<Grid.Col span={3}>
							<Text align={`right`}>
								{dayjs(props.spend.createdAt).format(`DD.MM.YY`)}
							</Text>
						</Grid.Col>
					</Grid>
				</Card>
			</UnstyledButton>
		</>
	);
}

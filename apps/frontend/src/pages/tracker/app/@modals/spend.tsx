import {Button, Divider, Grid, Modal, NumberInput, Select, Switch, Textarea, Title} from "@mantine/core";
import {DatePickerInput} from "@mantine/dates";
import {useState} from "react";
import TrackerAPI from "../../api";
import TrackerLogic from "../../logic";
import {useForm} from "@mantine/form";
import ErrorNotification from "../../../../components/logical/notification/error.notification";
import SuccessNotification from "../../../../components/logical/notification/success.notification";

export default function SpendModal() {
	const backend = new TrackerAPI();
	const logic = new TrackerLogic();

	const data = logic.getSpendCategory();

	const [planned, setPlanned] = useState(false);
	const [addLoading, setAddLoading] = useState(false);
	const [modalShow, setModalShow] = useState(false);

	const form = useForm({
		initialValues: {
			cost: -1,
			category: ``,
			description: ``,
			date: undefined,
		},
		validate: {
			cost: value => (value >= 0 ? `Сумма должна быть меньше нуля` : null),
			category: value => (value === `` ? `Выберите категорию` : null),
			date: value => (value === undefined && planned ? `Выберите дату` : null),
		},
	});

	const onSubmit = (values: {
		cost: number;
		category: string;
		description: string;
		date?: Date;
		repeat?: string;
	}) => {
		setAddLoading(true);
		const source = backend.getSource();
		backend
			.addSpend(values, source.token)
			.then(() => {
				SuccessNotification({message: `Расход успешно добавлен`});
				onClose();
			})
			.catch(() => {
				ErrorNotification();
			});
	};

	const onClose = () => {
		form.reset();
		backend.autoUpdateTracker();
		setAddLoading(false);
		setPlanned(false);
		setModalShow(false);
	};

	return (
		<>
			<Modal opened={modalShow} onClose={onClose} centered>
				<Grid>
					<Grid.Col>
						<Title order={2} align={`center`}>
							Добавить расход
						</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<form onSubmit={form.onSubmit(values => onSubmit(values))} style={{width: `100%`}}>
						<Grid.Col>
							<NumberInput
								label={`Сколько потрачено`}
								placeholder={`В рублях`}
								withAsterisk
								max={-1}
								
								{...form.getInputProps(`cost`)}
							/>
						</Grid.Col>

						<Grid.Col>
							<Select
								data={data}
								label={`Какая категория`}
								withAsterisk
								{...form.getInputProps(`category`)}
								maxDropdownHeight={170}
								searchable
							/>
						</Grid.Col>

						<Grid.Col>
							<Textarea
								label={`Описание`}
								placeholder={`Необязательно`}
								{...form.getInputProps(`description`)}
								maxLength={200}
								minRows={2}
								maxRows={2}
							/>
						</Grid.Col>

						<Grid.Col>
							<Switch
								radius={`sm`}
								label={`Запланировать`}
								checked={planned}
								onChange={e => setPlanned(e.currentTarget.checked)}
								color={`orange`}
							/>
						</Grid.Col>

						<Grid.Col hidden={!planned}>
							<Divider />
						</Grid.Col>

						<Grid.Col hidden={!planned}>
							<DatePickerInput
								label={`Выбери дату`}
								withAsterisk
								valueFormat={`DD.MM.YY`}
								minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
								{...form.getInputProps(`date`)}
							/>
						</Grid.Col>

						<Grid.Col>
							<Divider />
						</Grid.Col>

						<Grid.Col>
							<Button fullWidth type={`submit`} loading={addLoading}>
								Добавить
							</Button>
						</Grid.Col>
					</form>
				</Grid>
			</Modal>

			<Button onClick={() => setModalShow(true)}>Расход</Button>
		</>
	);
}

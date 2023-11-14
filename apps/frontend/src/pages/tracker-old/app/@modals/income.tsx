import {Button, Divider, Grid, Modal, NumberInput, Select, Textarea, Title} from "@mantine/core";
import {useForm} from "@mantine/form";
import TrackerAPI from "../../api";
import {useState} from "react";
import TrackerLogic from "../../logic";
import SuccessNotification from "../../../../components/logical/notification/success.notification";
import ErrorNotification from "../../../../components/logical/notification/error.notification";

export default function IncomeModal() {
	const backend = new TrackerAPI();
	const logic = new TrackerLogic();

	const data = logic.getIncomeCategory();

	const [addLoading, setAddLoading] = useState(false);
	const [modalShow, setModalShow] = useState(false);

	const form = useForm({
		initialValues: {
			cost: 1,
			category: ``,
			description: ``,
		},

		validate: {
			cost: value => (value <= 0 ? `Сумма должна быть больше нуля` : null),
			category: value => (value === `` ? `Выберите категорию` : null),
			description: value => (value.length > 200 ? `Максимум 200 символов` : null),
		},
	});

	const sumbit = (values: {cost: number; category: string; description: string}) => {
		setAddLoading(true);

		backend
			.addSpend({cost: values.cost, category: values.category, description: values.description})
			.then(() => {
				SuccessNotification({message: `Доход успешно добавлен`});
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
		setModalShow(false);
	};

	return (
		<>
			<Modal opened={modalShow} onClose={onClose} centered>
				<Grid>
					<Grid.Col>
						<Title order={2} align={`center`}>
							Добавить доход
						</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<form onSubmit={form.onSubmit(values => sumbit(values))} style={{width: `100%`}}>
						<Grid.Col>
							<NumberInput
								label={`Сколько пришло`}
								description={`В рублях`}
								withAsterisk
								min={1}
								{...form.getInputProps(`cost`)}
							/>
						</Grid.Col>

						<Grid.Col>
							<Select
								data={data}
								label={`Какая категория`}
								placeholder={`Категория не выбрана`}
								withAsterisk
								{...form.getInputProps(`category`)}
								maxDropdownHeight={120}
								searchable
							/>
						</Grid.Col>

						<Grid.Col>
							<Textarea
								label={`Заметка`}
								placeholder={`Не обязательно`}
								{...form.getInputProps(`description`)}
								maxLength={200}
								minRows={2}
								maxRows={2}
							/>
						</Grid.Col>

						<Grid.Col>
							<Divider />
						</Grid.Col>

						<Grid.Col>
							<Button type={`submit`} fullWidth loading={addLoading}>
								Добавить
							</Button>
						</Grid.Col>
					</form>
				</Grid>
			</Modal>

			<Button onClick={() => setModalShow(true)}>Доход</Button>
		</>
	);
}

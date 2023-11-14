import {
	Button,
	Center,
	Divider,
	Grid,
	Modal,
	NumberInput,
	Radio,
	Title,
	Group,
	Space,
	Text,
	Stack,
} from "@mantine/core";
import {useState} from "react";
import {store} from "../../../../store/store";
import {useForm} from "@mantine/form";
import {DatePickerInput} from "@mantine/dates";
import TrackerAPI from "../../api";
import {trackerActions} from "../../../../store/features/tracker.slice";
import {useNavigate} from "react-router-dom";
import {formatter} from "../../../../context";
import LongPressButton from "../../../../components/actions/longPressButton";
import ErrorNotification from "../../../../components/logical/notification/error.notification";
import SuccessNotification from "../../../../components/logical/notification/success.notification";

export default function SettingsModal() {
	const backend = new TrackerAPI();
	const navigate = useNavigate();

	const [tracker, setTracker] = useState(store.getState().trackerReducer.tracker);
	store.subscribe(() => {
		const _tracker = store.getState().trackerReducer.tracker;
		if (tracker !== _tracker) setTracker(_tracker);
	});

	const [modalShow, setModalShow] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [changeLoading, setChangeLoading] = useState(false);

	const settingEnabled = localStorage.getItem(`trackerSettingsEnabled`) === `true`;

	const form = useForm({
		initialValues: {
			dayLimit: tracker.dayLimit,
			calc: tracker.calc,
			startDate: new Date(tracker.createdAt),
			limit: tracker.limit,
		},
		validate: {
			dayLimit: value => (value <= 0 ? `Сумма должна быть больше нуля` : null),
			calc: value => (value === `` ? `Выбери режим` : null),
			startDate: value => (value === null ? `Выбери дату` : null),
		},
	});

	const onClose = () => {
		store.dispatch(trackerActions.updateTracker());
		setModalShow(false);
	};

	const onSubmit = (values: {dayLimit: number; calc: string; startDate: Date; limit: number}) => {
		setChangeLoading(true);
		backend
			.updateTracker({...values, startDate: values.startDate.toString()})
			.then(() => {
				SuccessNotification({message: `Настройки успешно сохранены`});
				onClose();
			})
			.catch(() => {
				ErrorNotification();
			})
			.finally(() => setChangeLoading(false));
	};

	const onRemove = () => {
		setDeleteLoading(true);
		return backend
			.removeTracker(tracker.id)
			.then(() => {
				SuccessNotification({message: `Трекер удален`});
				onClose();
				navigate(`/tracker`);
			})
			.catch(() => {
				ErrorNotification();
			})
			.finally(() => setDeleteLoading(false));
	};

	return (
		<>
			<Modal opened={modalShow} onClose={onClose} centered>
				<Stack>
					<Title order={2} align={`center`}>
						Настройки трекера
					</Title>

					<Divider />

					<form onSubmit={form.onSubmit(values => onSubmit(values))} style={{width: `100%`}}>
						<Stack>
							<NumberInput
								label={`Лимит на период`}
								formatter={value =>
									!Number.isNaN(parseInt(value)) ? formatter.format(+value) : value
								}
								min={1}
								withAsterisk
								{...form.getInputProps(`dayLimit`)}
							/>

							<Center>
								<Radio.Group
									name={`calc`}
									label={`Как рассчитывать лимит денег`}
									{...form.getInputProps(`calc`)}
								>
									<Group position={`apart`}>
										<Radio label={`По дням`} value={`dayCalc`} color={`orange`} />
										<Radio
											disabled
											label={`По неделям`}
											value={`weekCalc`}
											color={`orange`}
										/>
									</Group>
								</Radio.Group>
							</Center>

							<Divider />

							<Text align={`center`} color={`dimmed`} size={`xs`} mt={`-10px`}>
								Чтобы настраивать эти параметры - разблокируй их под трекером в разделе{" "}
								{` `}
								<Text span weight={800}>
									"Подробнее о настройках трекера"
								</Text>
							</Text>

							<NumberInput
								label={`Бюджет`}
								formatter={value =>
									!Number.isNaN(parseInt(value)) ? formatter.format(+value) : value
								}
								min={1}
								description={`Подробнее об этой настройке можно прочесть под трекером`}
								disabled={!settingEnabled}
								{...form.getInputProps(`limit`)}
							/>

							<DatePickerInput
								label={`Дата начала отсчета`}
								valueFormat={`DD.MM.YY`}
								description={`Подробнее об этой настройке можно прочесть под трекером`}
								popoverProps={{
									withinPortal: true,
								}}
								disabled={!settingEnabled}
								{...form.getInputProps(`startDate`)}
							/>

							<Divider />

							<Button
								fullWidth
								variant={`outline`}
								type={`submit`}
								disabled={!form.isDirty()}
								loading={changeLoading}
							>
								Сохранить
							</Button>
						</Stack>
					</form>

					<Divider />
					<LongPressButton
						loading={deleteLoading}
						seconds={3}
						color={`red`}
						fullWidth
						variant={`outline`}
						label={`Удалить трекер`}
						onPressed={onRemove}
					/>
					<Text color={`dimmed`} align={`center`} size={`xs`} tt={`lowercase`} mt={`-10px`}>
						Это действие нельзя будет отменить
					</Text>
				</Stack>
			</Modal>

			<Grid.Col>
				<Space h={`10px`} />
				<Button fullWidth variant={`outline`} onClick={() => setModalShow(true)}>
					Настроить
				</Button>
			</Grid.Col>
		</>
	);
}

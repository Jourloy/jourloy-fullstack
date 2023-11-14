import {
	Button,
	Card,
	Center,
	Divider,
	Flex,
	Grid,
	Group,
	NumberInput,
	Radio,
	Text,
	Title,
} from "@mantine/core";
import {useState} from "react";
import TrackerLogic from "../logic";
import TrackerAPI from "../api";
import {useNavigate} from "react-router-dom";
import {formatter} from "../../../context";
import {useDocumentTitle} from "@mantine/hooks";
import ErrorNotification from "../../../components/logical/notification/error.notification";
import SuccessNotification from "../../../components/logical/notification/success.notification";

export default function TrackerCreate() {
	useDocumentTitle(`Трекер`);

	const logic = new TrackerLogic();
	const backend = new TrackerAPI();
	const navigate = useNavigate();

	const [budget, setBudget] = useState<null | number>();
	const [budgetError, setBudgetError] = useState<null | string>();

	const [calcMode, setCalcMode] = useState<null | string>();

	const [dayLimit, setDayLimit] = useState<null | number>();
	const [dayLimitError, setDayLimitError] = useState<null | string>();

	const [months, setMonths] = useState<null | number>();
	const [monthsError, setMonthsError] = useState<null | string>();

	const calcHidden = !(budget && budget > 0 && budgetError == null);
	const dayLimitHidden = !(calcMode && !calcHidden);
	const monthsHidden = !(dayLimit && dayLimit > 0 && dayLimitError == null && !dayLimitHidden);
	const buttonHidden = !(months != null && months >= 0 && monthsError == null && !monthsHidden);

	const checkBudget = (num: number | "") => {
		const checked = logic.checkNumber(num);

		if (checked.error) {
			setBudgetError(checked.desc);
			return;
		}

		setBudgetError(null);
		setBudget(checked.result);
	};

	const checkDayLimit = (num: number | "") => {
		const checked = logic.checkNumber(num);

		if (checked.error) {
			setDayLimitError(checked.desc);
			return;
		}

		setDayLimitError(null);
		setDayLimit(checked.result);
	};

	const checkMonths = (num: number | "") => {
		const checked = logic.checkNumber(num, {zero: true});

		if (checked.error) {
			setMonthsError(checked.desc);
			return;
		}

		setMonthsError(null);
		setMonths(checked.result);
	};

	const submit = () => {
		if (!budget) return;
		if (!calcMode) return;
		if (!dayLimit) return;
		if (months == null) return;

		backend
			.createTracker({
				limit: budget,
				startLimit: budget,
				calc: calcMode,
				dayLimit: dayLimit,
				months: months,
			})
			.then(() => {
				backend.autoUpdateTracker().then(s => {
					if (s === 200) {
						SuccessNotification({message: `Трекер успешно создан`});
						navigate(`/tracker/app`);
					} else {
						ErrorNotification();
					}
				});
			})
			.catch(() => {
				ErrorNotification();
			});
	};

	return (
		<Flex justify={`center`} p={20}>
			<Grid columns={6} maw={`850px`} w={`100%`} p={0}>
				<Grid.Col>
					<Title align={`center`}>Давай создадим трекер</Title>
				</Grid.Col>

				<Grid.Col>
					<Divider />
				</Grid.Col>

				<Grid.Col>
					<Card withBorder>
						<Grid columns={1} gutter={10}>
							<Grid.Col>
								<Title order={2} align={`center`}>
									Для начала определим сколько у тебя есть денег
								</Title>
							</Grid.Col>

							<Grid.Col>
								<Text c={`dimmed`} size={`sm`} align={`center`} mt={`-10px`}>
									Если каждый месяц получаешь зарплату, то укажи сколько осталось по
									рассчетам до конца месяца. В ином случае можешь указать сколько есть
									в целом
								</Text>
							</Grid.Col>

							<Grid.Col>
								<NumberInput
									placeholder={`В рублях`}
									onChange={v => checkBudget(v)}
									error={budgetError}
									formatter={value =>
										!Number.isNaN(parseInt(value)) ? formatter.format(+value) : value
									}
									min={1}
								/>
							</Grid.Col>
						</Grid>
					</Card>
				</Grid.Col>

				{!calcHidden && (
					<>
						<Grid.Col>
							<Divider />
						</Grid.Col>

						<Grid.Col>
							<Card withBorder>
								<Grid columns={1} gutter={10}>
									<Grid.Col>
										<Title order={2} align={`center`}>
											А теперь определим режим расчетов
										</Title>
									</Grid.Col>

									<Grid.Col>
										<Text c={`dimmed`} size={`sm`} align={`center`} mt={`-10px`}>
											Считать по дням проще. А вот по неделям удобнее закупаться,
											например, едой. Тут каждый выбирает под себя
										</Text>
									</Grid.Col>

									<Grid.Col>
										<Center>
											<Radio.Group
												name={`calc`}
												label={
													<Text size={`md`}>Как рассчитывать лимит денег</Text>
												}
												description={`Еще работаем над этим, можно будет позже изменить`}
												onChange={e => setCalcMode(e)}
											>
												<Group position={`apart`}>
													<Radio
														label={`По дням`}
														value={`dayCalc`}
														color={`orange`}
													/>
													<Radio
														disabled
														label={`По неделям`}
														value={`weekCalc`}
														color={`orange`}
													/>
												</Group>
											</Radio.Group>
										</Center>
									</Grid.Col>
								</Grid>
							</Card>
						</Grid.Col>
					</>
				)}

				{!dayLimitHidden && (
					<>
						<Grid.Col>
							<Divider />
						</Grid.Col>

						<Grid.Col>
							<Card withBorder>
								<Grid columns={1} gutter={10}>
									<Grid.Col>
										<Title order={2} align={`center`}>
											Сколько ты хочешь тратить в {logic.getMode(calcMode)}
										</Title>
									</Grid.Col>

									<Grid.Col>
										<Text c={`dimmed`} size={`sm`} align={`center`} mt={`-10px`}>
											Исходя из твоих данных, чтобы тебе хватило на месяц, стоит
											тратить {logic.getDayLimit(calcMode, budget)}
										</Text>
									</Grid.Col>

									<Grid.Col>
										<NumberInput
											placeholder={`В рублях`}
											onChange={v => checkDayLimit(v)}
											error={dayLimitError}
											formatter={value =>
												!Number.isNaN(parseInt(value))
													? formatter.format(+value)
													: value
											}
											min={1}
										/>
									</Grid.Col>
								</Grid>
							</Card>
						</Grid.Col>
					</>
				)}

				{!monthsHidden && (
					<>
						<Grid.Col>
							<Divider />
						</Grid.Col>

						<Grid.Col>
							<Card withBorder>
								<Grid columns={1} gutter={10}>
									<Grid.Col>
										<Title order={2} align={`center`}>
											На сколько месяцев нужно рассчитывать бюджет
										</Title>
									</Grid.Col>

									<Grid.Col>
										<Text c={`dimmed`} size={`sm`} align={`center`} mt={`-10px`}>
											Если ты не хочешь рассчитывать бюджет на определенное
											количество месяцев, то просто вставь число 0
										</Text>
									</Grid.Col>

									<Grid.Col>
										<NumberInput
											placeholder={`0`}
											onChange={v => checkMonths(v)}
											error={monthsError}
											min={0}
										/>
									</Grid.Col>
								</Grid>
							</Card>
						</Grid.Col>
					</>
				)}

				{!buttonHidden && (
					<>
						<Grid.Col>
							<Divider />
						</Grid.Col>

						<Grid.Col>
							<Button fullWidth onClick={submit}>
								Меня все устраивает
							</Button>
						</Grid.Col>
					</>
				)}
			</Grid>
		</Flex>
	);
}

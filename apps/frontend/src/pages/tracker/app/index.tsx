import {useEffect, useState} from "react";
import {store} from "../../../store/store";
import {
	Flex,
	Grid,
	Button,
	Card,
	Title,
	Divider,
	Progress,
	Text,
	Accordion,
	Group,
	Stack,
} from "@mantine/core";
import {formatter} from "../../../context";
import TrackerLogic from "../logic";
import IncomeModal from "./@modals/income";
import SettingsModal from "./@modals/settings";
import SpendModal from "./@modals/spend";
import SpendList from "./@components/spendList";
import PlannedList from "./@components/plannedList";
import TrackerAPI from "../api";
import {useNavigate} from "react-router-dom";
import DefaultLoading from "../../../components/layout/loading";
import {IconCup} from "@tabler/icons-react";
import {useDocumentTitle} from "@mantine/hooks";
import BugForm from "../../../components/inputs/bugForm";
import ChangeDays from "./@components/changeDays";
import ErrorNotification from "../../../components/logical/notification/error.notification";

export default function TrackerApp() {
	useDocumentTitle(`Трекер`);

	const backend = new TrackerAPI();
	const logic = new TrackerLogic();
	const navigate = useNavigate();

	const [tracker, setTracker] = useState(store.getState().trackerReducer.tracker);
	store.subscribe(() => {
		const _tracker = store.getState().trackerReducer.tracker;
		if (tracker !== _tracker) setTracker(_tracker);
	});

	const [loading, setLoading] = useState(true);
	const [settingsButton, setSettingsButton] = useState(
		localStorage.getItem(`trackerSettingsEnabled`) != null
	);

	const onUnlockSettings = () => {
		localStorage.setItem(`trackerSettingsEnabled`, `true`);
		setSettingsButton(true);
	};

	useEffect(() => {
		setLoading(true);

		const source = backend.getSource();
		backend
			.autoUpdateTracker(source.token)
			.then(s => {
				if (s === 403) navigate(`/login`);
				if (s === 404) navigate(`/tracker/create`);
				else if (s !== 200) {
					ErrorNotification();
					navigate(`/tracker`);
				} else setLoading(false);
			})
			.catch(() => {
				ErrorNotification();
				navigate(`/tracker`);
			});

		return () => source.cancel();
	}, []);

	if (loading) return <DefaultLoading />;

	return (
		<>
			<Flex justify={`center`} py={20}>
				<Grid maw={`850px`} w={`100%`}>
					<Grid.Col>
						<Button disabled fullWidth>
							Это твой трекер
						</Button>
					</Grid.Col>

					<Grid.Col>
						<Card p={15} withBorder>
							<Grid gutter={5}>
								<Grid.Col>
									<Flex align={`center`} justify={`space-between`}>
										<Title order={2}>{logic.getCalcMode()} бюджет</Title>
										<Title order={2}>
											{formatter.format(logic.getTodayLimit())}
										</Title>
									</Flex>
								</Grid.Col>

								<Grid.Col>
									<Divider my={`10px`} />
								</Grid.Col>

								<Grid.Col>
									<Progress
										h={`15px`}
										value={logic.getProgress()}
										color={logic.getProgressColor()}
									/>
								</Grid.Col>

								<Grid.Col>
									<Flex align={`center`} justify={`space-between`}>
										<Text c={`dimmed`}>Осталось дней: {logic.getDaysCount()}</Text>
										<Text c={`dimmed`}>
											Бюджет: {formatter.format(logic.getTodayBudget())}
										</Text>
									</Flex>
								</Grid.Col>

								<SettingsModal />
							</Grid>
						</Card>
					</Grid.Col>

					<Grid.Col>
						<Group grow>
							<IncomeModal />

							<SpendModal />

							<Button disabled>Не готово</Button>
						</Group>
					</Grid.Col>

					<Grid.Col md={6} sm={12}>
						<ChangeDays add />
					</Grid.Col>

					<Grid.Col md={6} sm={12}>
						<ChangeDays />
					</Grid.Col>

					<Grid.Col md={8} sm={12}>
						<Card withBorder>
							<Grid columns={2}>
								<Grid.Col span={2}>
									<Title order={3} align={`center`}>
										Статистика за месяц
									</Title>
								</Grid.Col>

								<Grid.Col span={1}>
									<Card withBorder>
										<Title order={3} align={`center`} color={`green`}>
											+{formatter.format(logic.getMonthIncome())}
										</Title>
									</Card>
								</Grid.Col>

								<Grid.Col span={1}>
									<Card withBorder>
										<Title order={3} align={`center`} color={`red`}>
											{formatter.format(logic.getMonthSpend())}
										</Title>
									</Card>
								</Grid.Col>

								<Grid.Col span={2}>
									<Button fullWidth variant={`outline`} disabled>
										Тут скоро будет что-то интересное
									</Button>
								</Grid.Col>
							</Grid>
						</Card>
					</Grid.Col>

					<Grid.Col md={4} sm={12}>
						<Card withBorder h={`100%`}>
							<Flex align={`center`} justify={`center`} h={`100%`} w={`100%`}>
								<Title
									tt={`uppercase`}
									align={`center`}
									color={`dimmed`}
									size={`30px`}
									opacity={`20%`}
								>
									Еще не готово
								</Title>
							</Flex>
						</Card>
					</Grid.Col>

					<Grid.Col>
						<Divider
							label={
								<Text size={`lg`} tt={`uppercase`}>
									Запланированные расходы
								</Text>
							}
							labelPosition={`center`}
							my={`10px`}
						/>

						<PlannedList />
					</Grid.Col>

					<Grid.Col>
						<Divider
							label={
								<Text size={`lg`} tt={`uppercase`}>
									Последние операции
								</Text>
							}
							labelPosition={`center`}
							my={`10px`}
						/>

						<SpendList />
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<Accordion variant={`separated`} radius={`md`}>
							<Accordion.Item value={`org`}>
								<Accordion.Control>Подробнее о настройках трекера</Accordion.Control>
								<Accordion.Panel>
									<Stack>
										<Text>
											Бюджет - сумма, которая на текущий момент доступна для трат.
											Если она не совпадает с реальным бюджетом, то лучше
											воспользоваться кнопками "доход" и "расход", чтобы
											синхронизировать данные, так как изменение через настройки
											может сломать твои расчеты
										</Text>

										<Text>
											Дата начала отсчета - этот параметр стоит менять только если
											создали трекер позже, чем планировали. Если ты уже
											пользуешься трекером, то эта дата напрямую влияет на расчеты
											и может быть автоматически изменена системой
										</Text>

										<Divider />

										<Text>
											Если ты точно хочешь изменять эти параметры, то нажми на
											кнопку ниже
										</Text>

										<Button
											color={`red`}
											onClick={onUnlockSettings}
											disabled={settingsButton}
										>
											Я хочу
										</Button>
									</Stack>
								</Accordion.Panel>
							</Accordion.Item>

							<Accordion.Item value={`plannedSpend`}>
								<Accordion.Control>
									Подробнее о запланированных расходах
								</Accordion.Control>
								<Accordion.Panel>
									<Stack>
										<Text>
											Ты можешь добавить расход заранее. Он не будет учитываться в
											расчете лимита, пока не будет оплачен. В выбранный день он
											будет отмечен, напоминая о том, что его стоит оплатить
										</Text>
										<Text>
											Это удобно для того, чтобы держать в памяти определенные
											траты, такие как плата за Интернет или квартиру, и быть
											заранее готовым к этому дню
										</Text>
									</Stack>
								</Accordion.Panel>
							</Accordion.Item>

							<Accordion.Item value={`days`}>
								<Accordion.Control>
									Подробнее о добавить / забрать день
								</Accordion.Control>
								<Accordion.Panel>
									<Stack>
										<Text>
											Под прогрессом можно увидеть счетчик дней. Это число, сколько
											ты еще можешь прожить в таком темпе
										</Text>
										<Text>
											Количество дней можно изменять. Если вчера не был полностью
											потрачен лимит, то сегодня он будет выше. Поэтому, ты можешь
											вычесть свой дневной лимит из текущего дня и увеличить
											максимум дней на 1
										</Text>
										<Text>
											А если ты хочешь потратить сегодня больше сумму и количество
											дней у тебя большое, то можешь забрать день и это увеличит
											твой сегодняшний лимит
										</Text>
									</Stack>
								</Accordion.Panel>
							</Accordion.Item>

							<Accordion.Item value={`disabled`}>
								<Accordion.Control>Почему некоторые кнопки не жмутся</Accordion.Control>
								<Accordion.Panel>
									<Stack>
										<Text>
											Если кнопка серая (как ниже), то значит она заблокирована
										</Text>
										<Button fullWidth disabled>
											Я заблокированная кнопка
										</Button>

										<Text>
											Обычно нужно что-то сделать, чтобы ее разблокировать.
											Например, изменить поле в настройках и тогда кнопка
											сохранения станет активной
										</Text>
										<Text>Но есть некоторые кнопки, над которыми я еще работаю</Text>
									</Stack>
								</Accordion.Panel>
							</Accordion.Item>

							<Accordion.Item value={`help`}>
								<Accordion.Control>Что делать если нужна помощь?</Accordion.Control>
								<Accordion.Panel>
									<Stack>
										<BugForm />
									</Stack>
								</Accordion.Panel>
							</Accordion.Item>
						</Accordion>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<Button
							fullWidth
							variant={`outline`}
							leftIcon={<IconCup stroke={1.3} />}
							onClick={() => (window.location.href = `https://boosty.to/jourloy/donate`)}
						>
							Купи мне кофе
						</Button>
					</Grid.Col>
				</Grid>
			</Flex>
		</>
	);
}

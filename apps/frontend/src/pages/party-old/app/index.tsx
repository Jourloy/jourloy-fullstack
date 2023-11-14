import {
	Button,
	Card,
	Grid,
	Title,
	Divider,
	Container,
	Center,
	Modal,
	Text,
	Accordion,
	Stack,
} from "@mantine/core";
import {IconCup} from "@tabler/icons-react";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import PartyAPI from "../api";
import PartyMembers from "./@members";
import PartyAddMemberModal from "./@members/modals/add.modal";
import PartyPositions from "./@positions";
import PartyAddPositionModal from "./@positions/modals/add.modal";
import BugForm from "../../../components/inputs/bugForm";
import ErrorNotification from "../../../components/logical/notification/error.notification";
import SuccessNotification from "../../../components/logical/notification/success.notification";
import {formatter} from "../../../context";
import {partyActions} from "../../../store/features/party.slice";
import {userActions} from "../../../store/features/user.slice";
import {store} from "../../../store/store";
import LoginAPI from "../../login/api";

export default function PartyApp() {
	const backend = new PartyAPI();
	const loginBackend = new LoginAPI();
	const navigate = useNavigate();

	const [calculator, setCalculator] = useState(store.getState().partyReducer.calculator);
	const [logined, setLogined] = useState(store.getState().userReducer.logined);

	store.subscribe(() => {
		const calc = store.getState().partyReducer.calculator;
		const login = store.getState().userReducer.logined;
		if (calc !== calculator) setCalculator(calc);
		if (login !== logined) setLogined(login);
	});

	const [addMember, setAddMember] = useState(false);
	const closeAddMember = () => setAddMember(false);

	const [addPosition, setAddPosition] = useState(false);
	const closeAddPosition = () => setAddPosition(false);

	const [clearMembersDisable, setClearMembersDisable] = useState(true);
	const [clearMembersLoading, setClearMembersLoading] = useState(true);

	const [removeAllPositionsLoading, setRemoveAllPositionsLoading] = useState(false);
	const [removeAllPositionsDisable, setRemoveAllPositionsDisable] = useState(true);

	const [clearMembersModal, setClearMembersModal] = useState(false);
	const [clearPositionsModal, setClearPositionsModal] = useState(false);

	const removeAllMembers = () => {
		setClearMembersLoading(true);
		setClearMembersModal(false);
		backend
			.removeMembers(calculator.id)
			.then(() => {
				SuccessNotification({message: `Все участники удалены`});
			})
			.catch(() => {
				ErrorNotification();
			})
			.finally(() => {
				store.dispatch(partyActions.updateCalculator());
			});
	};

	const removeAllPositions = () => {
		setRemoveAllPositionsLoading(true);
		setClearPositionsModal(false);
		backend
			.removePositions(calculator.id)
			.then(() => {
				SuccessNotification({message: `Список позиций очищен`});
			})
			.catch(() => {
				ErrorNotification();
			})
			.finally(() => {
				store.dispatch(partyActions.updateCalculator());
				setRemoveAllPositionsLoading(false);
			});
	};

	const getAllCost = () => {
		let cost = 0;
		for (const pos of calculator.positions) {
			cost += pos.cost;
		}
		return cost;
	};

	useEffect(() => {
		if (!calculator) return;

		if (calculator.members.length <= 0) setClearMembersDisable(true);
		else setClearMembersDisable(false);
		setClearMembersLoading(false);
	}, [calculator]);

	useEffect(() => {
		if (!calculator) return;

		if (calculator.positions.length <= 0) setRemoveAllPositionsDisable(true);
		else setRemoveAllPositionsDisable(false);
		setRemoveAllPositionsLoading(false);
	}, [calculator]);

	useEffect(() => {
		const source = loginBackend.getSource();

		if (!logined) {
			loginBackend
				.checkUser(source.token)
				.then(d => {
					if (d.data.user.username)
						store.dispatch(userActions.changeUsername(d.data.user.username));
					if (d.data.user.avatar) store.dispatch(userActions.changeAvatar(d.data.user.avatar));
					if (d.data.user) store.dispatch(userActions.login());
				})
				.catch(() => {
					navigate(`/login`);
				});
		}
		if (!calculator) {
			backend
				.getCalculator(source.token)
				.then(d => {
					if (d && d.data && d.data.id) {
						store.dispatch(partyActions.forceUpdateCalculator(d.data));

						const memberPages = Math.ceil(d.data.members.length / 5);
						store.dispatch(partyActions.updateMemberPages(memberPages));

						const positionPages = Math.ceil(d.data.positions.length / 10);
						store.dispatch(partyActions.updatePositionPages(positionPages));
					}
				})
				.catch(() => {
					ErrorNotification({message: `Не нашли калькулятор`});
					navigate(`/party`);
				});
		}
		return () => source.cancel();
	}, []);

	if (!logined || !calculator) return <></>;

	return (
		<>
			<PartyAddMemberModal opened={addMember} onClose={closeAddMember} />

			<PartyAddPositionModal opened={addPosition} onClose={closeAddPosition} />

			<Modal opened={clearMembersModal} onClose={() => setClearMembersModal(false)} centered>
				<Grid>
					<Grid.Col>
						<Title order={2} align={`center`}>
							Точно очистить?
						</Title>
					</Grid.Col>
					<Grid.Col mt={`-15px`}>
						<Text align={`center`} color={`dimmed`}>
							Участников нельзя будет восстановить
						</Text>
					</Grid.Col>
					<Grid.Col span={6}>
						<Button fullWidth variant={`outline`} color={`red`} onClick={removeAllMembers}>
							Да
						</Button>
					</Grid.Col>
					<Grid.Col span={6}>
						<Button fullWidth color={`green`}>
							Нет
						</Button>
					</Grid.Col>
				</Grid>
			</Modal>

			<Modal opened={clearPositionsModal} onClose={() => setClearPositionsModal(false)} centered>
				<Grid>
					<Grid.Col>
						<Title order={2} align={`center`}>
							Точно очистить?
						</Title>
					</Grid.Col>
					<Grid.Col mt={`-15px`}>
						<Text align={`center`} color={`dimmed`}>
							Позиции нельзя будет восстановить
						</Text>
					</Grid.Col>
					<Grid.Col span={6}>
						<Button fullWidth variant={`outline`} color={`red`} onClick={removeAllPositions}>
							Да
						</Button>
					</Grid.Col>
					<Grid.Col span={6}>
						<Button fullWidth color={`green`}>
							Нет
						</Button>
					</Grid.Col>
				</Grid>
			</Modal>

			<Container py={20} px={20}>
				<Center w={`100%`}>
					<Grid maw={`850px`} w={`100%`}>
						<Grid.Col>
							<Button disabled fullWidth>
								Калькулятор 1
							</Button>
						</Grid.Col>

						<Grid.Col span={6}>
							<Card withBorder>
								<Grid gutter={1}>
									<Grid.Col>
										<Title order={3} align={`center`}>
											Участников
										</Title>
									</Grid.Col>

									<Grid.Col>
										<Title align={`center`}>{calculator.members.length}</Title>
									</Grid.Col>
								</Grid>
							</Card>
						</Grid.Col>

						<Grid.Col span={6}>
							<Card withBorder>
								<Grid gutter={1}>
									<Grid.Col>
										<Title order={3} align={`center`}>
											Позиций
										</Title>
									</Grid.Col>

									<Grid.Col>
										<Title align={`center`}>{calculator.positions.length}</Title>
									</Grid.Col>
								</Grid>
							</Card>
						</Grid.Col>

						<Grid.Col>
							<Card withBorder>
								<Grid gutter={1}>
									<Grid.Col>
										<Title order={3} align={`center`}>
											Потратили в сумме
										</Title>
									</Grid.Col>

									<Grid.Col>
										<Title align={`center`}>{formatter.format(getAllCost())}</Title>
									</Grid.Col>
								</Grid>
							</Card>
						</Grid.Col>

						<Grid.Col>
							<Button variant={`outline`} fullWidth disabled>
								Настроить
							</Button>
						</Grid.Col>

						<Grid.Col>
							<Grid>
								<Grid.Col>
									<Card withBorder style={{overflow: `visible`}}>
										<Grid>
											<Grid.Col>
												<Title order={3} align={`center`}>
													Участники
												</Title>
											</Grid.Col>

											<Grid.Col sm={8} xs={12}>
												<Button
													fullWidth
													variant={`outline`}
													onClick={() => setAddMember(true)}
												>
													Добавить
												</Button>
											</Grid.Col>

											<Grid.Col sm={4} xs={12}>
												<Button
													fullWidth
													color={`red`}
													variant={`outline`}
													disabled={clearMembersDisable}
													loading={clearMembersLoading}
													onClick={() => setClearMembersModal(true)}
												>
													Очистить список
												</Button>
											</Grid.Col>

											<Grid.Col>
												<Divider />
											</Grid.Col>

											<PartyMembers />
										</Grid>
									</Card>
								</Grid.Col>
							</Grid>
						</Grid.Col>

						<Grid.Col>
							<Card withBorder>
								<Grid>
									<Grid.Col>
										<Title order={3} align={`center`}>
											Позиции
										</Title>
									</Grid.Col>

									<Grid.Col sm={8} xs={12}>
										<Button
											fullWidth
											variant={`outline`}
											onClick={() => setAddPosition(true)}
										>
											Добавить
										</Button>
									</Grid.Col>

									<Grid.Col sm={4} xs={12}>
										<Button
											fullWidth
											variant={`outline`}
											color={`red`}
											disabled={removeAllPositionsDisable}
											loading={removeAllPositionsLoading}
											onClick={() => setClearPositionsModal(true)}
										>
											Очистить список
										</Button>
									</Grid.Col>

									<Grid.Col>
										<Divider />
									</Grid.Col>

									<PartyPositions />
								</Grid>
							</Card>
						</Grid.Col>

						<Grid.Col>
							<Divider />
						</Grid.Col>

						<Grid.Col>
							<Accordion variant={`separated`} radius={`md`}>
								<Accordion.Item value={`org`}>
									<Accordion.Control>Кто такой организатор?</Accordion.Control>
									<Accordion.Panel>
										<Stack>
											<Text>
												Организатор - человек, который закупается для вечеринки.
												Он как и все, может кушать или использовать позиции, но
												если нажать на его карточку, то можно посмотреть, сколько
												нужно ему вернуть денег.
											</Text>
											<Text>
												Среди участников организатор отмечен другой обводкой
												карточки.
											</Text>
										</Stack>
									</Accordion.Panel>
								</Accordion.Item>

								<Accordion.Item value={`howUse`}>
									<Accordion.Control>
										Я не помню как использовать калькулятор
									</Accordion.Control>
									<Accordion.Panel>
										<Stack>
											<Text>
												Чтобы вспомнить как им пользоваться, ты можешь перейти на
												страницу создания и пролистать чуть ниже
											</Text>
											<Button
												fullWidth
												variant={`outline`}
												onClick={() => navigate(`/party`)}
											>
												Перейти
											</Button>
										</Stack>
									</Accordion.Panel>
								</Accordion.Item>

								<Accordion.Item value={`disabled`}>
									<Accordion.Control>
										Почему некоторые кнопки не жмутся
									</Accordion.Control>
									<Accordion.Panel>
										<Stack>
											<Text>
												Если кнопка серая (как ниже), то значит она
												заблокирована.
											</Text>
											<Button fullWidth disabled>
												Я заблокированная кнопка
											</Button>
											<Text>
												Обычно нужно что-то сделать, чтобы ее разблокировать.
												Например, добавить участников и тогда кнопка очистки
												списка участников станет рабочей.
											</Text>
											<Text>
												Но есть некоторые кнопки, над которыми я еще работаю.
											</Text>
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
								onClick={() =>
									(window.location.href = `https://boosty.to/jourloy/donate`)
								}
							>
								Купи мне кофе
							</Button>
						</Grid.Col>
					</Grid>
				</Center>
			</Container>
		</>
	);
}

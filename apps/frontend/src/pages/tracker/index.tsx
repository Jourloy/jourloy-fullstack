import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TrackerAPI from "./api";
import {
	Paper,
	Group,
	Flex,
	Grid,
	Center,
	Title,
	Divider,
	Button,
	Text,
	Stack,
	Card,
	Progress,
} from "@mantine/core";
import ScrollHint from "../../components/layout/scrollHint";
import {store} from "../../store/store";
import {useDocumentTitle} from "@mantine/hooks";
import HistorySpend from "./app/@components/spend";
import {formatter} from "../../context";
import PlannedSpend from "./app/@components/planned";
import ErrorNotification from "../../components/logical/notification/error.notification";

export default function TrackerIndex() {
	useDocumentTitle(`Трекер`);

	const navigate = useNavigate();
	const backend = new TrackerAPI();

	const [tracker, setTracker] = useState(false);
	const [block, setBlock] = useState(false);

	const toTracker = () => {
		if (block) return;

		if (!store.getState().userReducer.logined) navigate(`/login`);
		else if (tracker) navigate(`/tracker/app`);
		else navigate(`/tracker/create`);
	};

	useEffect(() => {
		const source = backend.getSource();

		backend
			.autoUpdateTracker()
			.then(s => {
				if (s >= 400 && s < 500) setTracker(false);
				else setTracker(true);
			})
			.catch(() => {
				setTracker(false);
				ErrorNotification({message: `Сервер не доступен, попробуй позже`});
				setBlock(true);
			});

		return () => source.cancel();
	}, []);

	return (
		<Paper>
			<Paper
				style={{
					position: `absolute`,
					top: `90dvh`,
				}}
				w={`100%`}
				ml={`-16px`}
			>
				<Group position={`center`} w={`100%`}>
					<ScrollHint />
				</Group>
			</Paper>
			<Paper>
				<Flex justify={`center`}>
					<Grid maw={`850px`} w={`100%`} gutter={`xl`}>
						<Grid.Col>
							<Paper h={`calc(100dvh - 80px)`}>
								<Center h={`100%`} w={`100%`}>
									<Stack>
										<Title align={`center`} tt={`uppercase`} order={1}>
											Ты еще не {` `}
											<Text
												span
												variant={`gradient`}
												gradient={{from: `yellow`, to: `red`}}
											>
												следишь
											</Text>
											{` `} за своими расходами?
										</Title>

										<Text
											align={`center`}
											color={`dimmed`}
											size={`18px`}
											mt={`-10px`}
										>
											Все расходы и доходы прямо перед глазами
										</Text>

										<Divider
											label={
												<Text color={`red`} size={`15px`}>
													и бесплатно
												</Text>
											}
											labelPosition={`center`}
											mt={`-10px`}
										/>

										<Button fullWidth onClick={toTracker}>
											<Text>
												Начать пользоваться {` `}
												<Text span color={`red`}>
													[ БЕТА ]
												</Text>
											</Text>
										</Button>
									</Stack>
								</Center>
							</Paper>
						</Grid.Col>

						<Grid.Col>
							<Stack>
								<Title align={`center`} order={1} tt={`uppercase`}>
									Следить за расходами очень важно
								</Title>
								<Text
									align={`center`}
									color={`dimmed`}
									mt={`-10px`}
									size={`18px`}
									weight={800}
								>
									Но как это сделать лучше всего?
								</Text>
								<Divider />
							</Stack>
						</Grid.Col>

						<Grid.Col md={4} sm={12} order={1}>
							<Card withBorder h={`100%`}>
								<Stack>
									<Title order={3}>Представь себе инструмент</Title>

									<Text>Который хранит всю твою историю доходов и расходов</Text>
								</Stack>
							</Card>
						</Grid.Col>

						<Grid.Col md={8} sm={12} order={2}>
							<Card withBorder>
								<Stack spacing={0}>
									<HistorySpend
										spend={{
											id: 1,
											cost: 32000,
											category: `work`,
											createdAt: new Date(Date.now()).toString(),
											updatedAt: new Date(Date.now()).toString(),
										}}
										index={1}
										length={1}
									/>
									<HistorySpend
										spend={{
											id: 1,
											cost: -1200,
											category: `food`,
											createdAt: new Date(
												Date.now() - 24 * 60 * 60 * 1000
											).toString(),
											updatedAt: new Date(
												Date.now() - 24 * 60 * 60 * 1000
											).toString(),
										}}
										index={1}
										length={1}
									/>
								</Stack>
							</Card>
						</Grid.Col>

						<Grid.Col md={8} sm={12} orderMd={3} orderSm={4}>
							<Card withBorder h={`100%`}>
								<Center h={`100%`} w={`100%`}>
									<Stack spacing={0} w={`100%`}>
										<Flex align={`center`} justify={`space-between`}>
											<Title order={2}>Дневной бюджет</Title>
											<Title order={2}>{formatter.format(1200)}</Title>
										</Flex>

										<Divider my={`10px`} />

										<Progress h={`15px`} value={80} color={`green`} />

										<Flex align={`center`} justify={`space-between`}>
											<Text c={`dimmed`}>Осталось дней: 34</Text>
											<Text c={`dimmed`}>Бюджет: 40800</Text>
										</Flex>
									</Stack>
								</Center>
							</Card>
						</Grid.Col>

						<Grid.Col md={4} sm={12} orderMd={4} orderSm={3}>
							<Card withBorder h={`100%`}>
								<Stack>
									<Title order={3}>Представь себе инструмент</Title>

									<Text>Который расчитывает лимит денег на сегодня или неделю</Text>
								</Stack>
							</Card>
						</Grid.Col>

						<Grid.Col md={4} sm={12} order={5}>
							<Card withBorder h={`100%`}>
								<Stack>
									<Title order={3}>Представь себе инструмент</Title>

									<Text>Который напоминает о том, что нужно оплатить</Text>
								</Stack>
							</Card>
						</Grid.Col>

						<Grid.Col md={8} sm={12} order={6}>
							<Card withBorder>
								<Stack spacing={0}>
									<PlannedSpend
										spend={{
											id: 1,
											cost: -650,
											category: `housing`,
											date: new Date(Date.now()).toString(),
											createdAt: new Date(Date.now()).toString(),
											updatedAt: new Date(Date.now()).toString(),
										}}
										index={1}
										length={1}
									/>
									<PlannedSpend
										spend={{
											id: 1,
											cost: -3000,
											category: `health`,
											date: new Date(Date.now() + 24 * 60 * 60 * 1000).toString(),
											createdAt: new Date(
												Date.now() - 24 * 60 * 60 * 1000
											).toString(),
											updatedAt: new Date(
												Date.now() - 24 * 60 * 60 * 1000
											).toString(),
										}}
										index={1}
										length={1}
									/>
								</Stack>
							</Card>
						</Grid.Col>

						<Grid.Col order={7}>
							<Card withBorder>
								<Stack>
									<Title align={`center`}>Представь себе инструмент</Title>

									<Text align={`center`}>
										Который постоянно развивается и в нем постоянно появляются новые
										инструменты для более удобного контроля бюджета. Если чего-то не
										хватает, то с радостью готовы получить предложение об улучшении
									</Text>
								</Stack>
							</Card>
						</Grid.Col>

						<Grid.Col order={8}>
							<Divider />
						</Grid.Col>

						<Grid.Col mb={`100px`} order={9}>
							<Button fullWidth onClick={toTracker}>
								<Text>
									Начать пользоваться {` `}
									<Text span color={`red`}>
										[ БЕТА ]
									</Text>
								</Text>
							</Button>
						</Grid.Col>
					</Grid>
				</Flex>
			</Paper>
		</Paper>
	);
}

import {
	Button,
	Card,
	Center,
	Divider,
	Flex,
	Grid,
	Group,
	NumberInput,
	Paper,
	Space,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import PartyAPI from "../api";
import {partyActions} from "../../../store/features/party.slice";
import {store} from "../../../store/store";
import {useState} from "react";
import {formatter} from "../../../context";
import {useNavigate} from "react-router-dom";
import ScrollHint from "../../../components/layout/scrollHint";
import SuccessNotification from "../../../components/logical/notification/success.notification";
import ErrorNotification from "../../../components/logical/notification/error.notification";

export default function PartyCreate() {
	const backend = new PartyAPI();
	const navigate = useNavigate();

	const [exMemberNameF, setExMemberNameF] = useState(`Игорян`);
	const [exMemberNameS, setExMemberNameS] = useState(`Санек`);

	const [exPositionCost, setExPositionCost] = useState<number | "">(129);

	const createCalculator = () => {
		backend
			.createCalculator()
			.then(() => {
				SuccessNotification({message: `Калькулятор создан`});
				store.dispatch(partyActions.updateCalculator());
				navigate(`/party/app`);
			})
			.catch(e => {
				if (e && e.response) {
					if (e.response.status === 400) {
						navigate(`/party/app`);
					} else ErrorNotification();
				} else ErrorNotification();
			});
	};

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
					<Grid maw={`850px`} w={`100%`}>
						<Grid.Col>
							<Paper h={`calc(100dvh - 80px)`}>
								<Center h={`100%`} w={`100%`}>
									<Grid>
										<Grid.Col>
											<Title align={`center`} tt={`uppercase`} order={1}>
												У тебя еще нет {` `}
												<Text
													span
													variant={`gradient`}
													gradient={{from: `yellow`, to: `red`}}
												>
													Party
												</Text>
												{` `} калькулятора?
											</Title>
										</Grid.Col>

										<Grid.Col>
											<Text
												align={`center`}
												color={`dimmed`}
												size={`18px`}
												mt={`-10px`}
											>
												Удобный способ устроить вечеринку
											</Text>
										</Grid.Col>

										<Grid.Col>
											<Divider
												label={
													<Text color={`red`} size={`15px`}>
														и бесплатный
													</Text>
												}
												labelPosition={`center`}
												mt={`-10px`}
											/>
										</Grid.Col>

										<Grid.Col>
											<Center>
												<Button fullWidth onClick={createCalculator}>
													<Text>
														Начать пользоваться {` `}
														<Text span color={`red`}>
															[ БЕТА ]
														</Text>
													</Text>
												</Button>
											</Center>
										</Grid.Col>
									</Grid>
								</Center>
							</Paper>
						</Grid.Col>

						<Grid.Col>
							<Paper>
								<Grid>
									<Grid.Col>
										<Card withBorder p={15}>
											<Grid>
												<Grid.Col>
													<Text>
														Давай представим ситуацию. Ты хочешь устроить
														вечеринку, будет много людей, много еды и
														развлечений. Как стоимость всего честно
														распределить между всеми участниками?
													</Text>
												</Grid.Col>

												<Grid.Col>
													<Text>
														Взять со всех одинаковую сумму? Но ведь тогда
														кто-то переплатит, ведь он может не пить / кушать
														/ использовать все, что будет на вечеринке
													</Text>
												</Grid.Col>
											</Grid>
										</Card>
									</Grid.Col>

									<Grid.Col>
										<Divider
											labelPosition={`center`}
											label={
												<Title align={`center`} order={2}>
													Что тогда?
												</Title>
											}
										/>
									</Grid.Col>

									<Grid.Col md={8} sm={12}>
										<Card withBorder>
											<Grid>
												<Grid.Col>
													<TextInput
														label={`Имя первого участника`}
														description={`(можешь менять по желанию)`}
														value={exMemberNameF}
														onChange={e => setExMemberNameF(e.target.value)}
													/>
												</Grid.Col>

												<Grid.Col>
													<TextInput
														label={`Имя второго участника`}
														description={`(можешь менять по желанию)`}
														value={exMemberNameS}
														onChange={e => setExMemberNameS(e.target.value)}
													/>
												</Grid.Col>
											</Grid>
										</Card>
									</Grid.Col>

									<Grid.Col md={4} sm={12}>
										<Card>
											<Grid>
												<Grid.Col>
													<Text>Составляем список участников</Text>
												</Grid.Col>

												<Grid.Col>
													<Text>
														В калькуляторе нет ограничения на количество
														участников. Можешь добавить двух, а можешь и
														сотню
													</Text>
												</Grid.Col>
											</Grid>
										</Card>
									</Grid.Col>

									<Grid.Col>
										<Divider />
									</Grid.Col>

									<Grid.Col md={8} sm={12}>
										<Card withBorder>
											<Grid>
												<Grid.Col>
													<TextInput
														label={`Наименование`}
														value={`Кола`}
														disabled
													/>
												</Grid.Col>

												<Grid.Col>
													<NumberInput
														label={`Стоимость`}
														description={`(можешь менять по желанию)`}
														value={exPositionCost}
														onChange={e => setExPositionCost(e)}
													/>
												</Grid.Col>
											</Grid>
										</Card>
									</Grid.Col>

									<Grid.Col md={4} sm={12}>
										<Card>
											<Grid>
												<Grid.Col>
													<Text>
														Добавляем то, что будет на вечеринке. Здесь это
														называется {` `}
														<Text span color={`red`} weight={800}>
															позиция
														</Text>
													</Text>
												</Grid.Col>

												<Grid.Col>
													<Text>
														Если выбрано несколько человек, то стоимость
														разделится между ними
													</Text>
												</Grid.Col>
											</Grid>
										</Card>
									</Grid.Col>

									<Grid.Col>
										<Divider
											labelPosition={`center`}
											label={
												<Title align={`center`} order={2}>
													И в итоге
												</Title>
											}
										/>
									</Grid.Col>

									<Grid.Col md={8} sm={12}>
										<Card withBorder>
											<Grid>
												<Grid.Col>
													<Title order={3} align={`center`}>
														Участники
													</Title>
												</Grid.Col>

												<Grid.Col span={6}>
													<Card withBorder w={`100%`}>
														<Grid>
															<Grid.Col span={4}>
																<Text mt={`3px`}>
																	{formatter.format(
																		Math.ceil(+exPositionCost / 2)
																	)}
																</Text>
															</Grid.Col>

															<Grid.Col span={8}>
																<Text
																	align={`right`}
																	mt={`3px`}
																	truncate
																>
																	{exMemberNameF}
																</Text>
															</Grid.Col>
														</Grid>
													</Card>
												</Grid.Col>

												<Grid.Col span={6}>
													<Card withBorder w={`100%`}>
														<Grid>
															<Grid.Col span={4}>
																<Text mt={`3px`}>
																	{formatter.format(
																		Math.ceil(+exPositionCost / 2)
																	)}
																</Text>
															</Grid.Col>

															<Grid.Col span={8}>
																<Text
																	align={`right`}
																	mt={`3px`}
																	truncate
																>
																	{exMemberNameS}
																</Text>
															</Grid.Col>
														</Grid>
													</Card>
												</Grid.Col>
											</Grid>
										</Card>
									</Grid.Col>

									<Grid.Col md={4} sm={12}>
										<Card>
											<Grid>
												<Grid.Col>
													<Text>Примерно так будет выглядеть итог</Text>
												</Grid.Col>

												<Grid.Col>
													<Text>
														Около каждого участника будет сумма, которую он
														должен заплатить
													</Text>
												</Grid.Col>
											</Grid>
										</Card>
									</Grid.Col>

									<Grid.Col>
										<Divider
											labelPosition={`center`}
											label={
												<Title align={`center`} order={2}>
													А если покупает не один?
												</Title>
											}
										/>
									</Grid.Col>

									<Grid.Col md={8} sm={12}>
										<Card withBorder>
											<Grid>
												<Grid.Col>
													<Title order={3} align={`center`}>
														Участники
													</Title>
												</Grid.Col>

												<Grid.Col span={6}>
													<Card
														withBorder
														w={`100%`}
														style={{borderColor: `#f2d9ae`}}
													>
														<Grid>
															<Grid.Col span={4}>
																<Text mt={`3px`}>
																	{formatter.format(
																		Math.ceil(+exPositionCost / 2)
																	)}
																</Text>
															</Grid.Col>

															<Grid.Col span={8}>
																<Text
																	align={`right`}
																	mt={`3px`}
																	truncate
																>
																	{exMemberNameF}
																</Text>
															</Grid.Col>
														</Grid>
													</Card>
												</Grid.Col>

												<Grid.Col span={6}>
													<Card
														withBorder
														w={`100%`}
														style={{borderColor: `#f2d9ae`}}
													>
														<Grid>
															<Grid.Col span={4}>
																<Text mt={`3px`}>
																	{formatter.format(
																		Math.ceil(+exPositionCost / 2)
																	)}
																</Text>
															</Grid.Col>

															<Grid.Col span={8}>
																<Text
																	align={`right`}
																	mt={`3px`}
																	truncate
																>
																	{exMemberNameS}
																</Text>
															</Grid.Col>
														</Grid>
													</Card>
												</Grid.Col>
											</Grid>
										</Card>
									</Grid.Col>

									<Grid.Col md={4} sm={12}>
										<Card>
											<Grid>
												<Grid.Col>
													<Text>Можно добавить организаторов</Text>
												</Grid.Col>

												<Grid.Col>
													<Text>
														При создании позиции выбираешь кто платит и после
														можно посмотреть, сколько нужно вернуть какому
														человеку
													</Text>
												</Grid.Col>
											</Grid>
										</Card>
									</Grid.Col>
								</Grid>
							</Paper>
						</Grid.Col>

						<Grid.Col>
							<Divider />
						</Grid.Col>

						<Grid.Col>
							<Card withBorder>
								<Text>
									Как видишь, пользоваться им легко, а вот пользы он приносит много.
									Теперь все будут платить только за то, что используют сами, а ты
									будешь видеть всю картину в целом и понимать, чего не хватает, что
									никто не использует, а что стоит прикупить побольше
								</Text>
							</Card>
						</Grid.Col>

						<Grid.Col>
							<Center>
								<Button fullWidth onClick={createCalculator}>
									Начать пользоваться
								</Button>
							</Center>
						</Grid.Col>

						<Grid.Col>
							<Space h={`50px`} />
						</Grid.Col>
					</Grid>
				</Flex>
			</Paper>
		</Paper>
	);
}

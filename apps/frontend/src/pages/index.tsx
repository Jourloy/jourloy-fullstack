import {
	Button,
	Card,
	Divider,
	Grid,
	Title,
	Image,
	Text,
	Group,
	ActionIcon,
	Flex,
	Center,
	Space,
} from "@mantine/core";
import {useDocumentTitle} from "@mantine/hooks";
import {IconBrandDiscord, IconBrandGithub, IconBrandTwitch} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";

export default function Main() {
	useDocumentTitle(`Jourloy`);

	const navigate = useNavigate();

	return (
		<Flex justify={`center`} py={20} px={20}>
			<Grid maw={`850px`} w={`100%`} m={0} p={0} align={`center`} ml={`0px`}>
				<Grid.Col sm={12} md={4}>
					<Image
						src={`https://s.jourloy.com/web-images/me.png`}
						withPlaceholder
						radius={`md`}
					/>
				</Grid.Col>

				<Grid.Col sm={12} md={8} mah={`284px`} h={`100%`}>
					<Card withBorder h={"100%"}>
						<Center h={"100%"}>
							<Flex direction={"column"} align={"center"} gap={"xs"}>
								<Title tt={`uppercase`}>✌️ Это я ✌️</Title>

								<Divider w={"100%"} />

								<Text>
									Мужчина, муж, брат, сын, программист и просто хороший человек
								</Text>

								<Group>
									<ActionIcon
										component={"a"}
										href={`https://discord.gg/PB8rdcXyRR`}
										color={"indigo.5"}
									>
										<IconBrandDiscord />
									</ActionIcon>

									<ActionIcon
										component={"a"}
										href={`https://twitch.tv/jourloy`}
										color={"violet.5"}
									>
										<IconBrandTwitch />
									</ActionIcon>

									<ActionIcon
										component={"a"}
										href={"https://github.com/jourloy"}
										color={`dark`}
									>
										<IconBrandGithub />
									</ActionIcon>
								</Group>
							</Flex>
						</Center>
					</Card>
				</Grid.Col>

				<Grid.Col>
					<Divider />
				</Grid.Col>

				<Grid.Col>
					<Card withBorder w={`100%`} h={`100%`}>
						<Grid>
							<Grid.Col>
								<Title align={`center`}>Мои проекты</Title>
							</Grid.Col>

							<Grid.Col>
								<Divider w={"100%"} />
							</Grid.Col>

							<Grid.Col md={6} sm={12}>
								<Button fullWidth onClick={() => navigate(`/tracker`)}>
									Денежный трекер
								</Button>
							</Grid.Col>

							<Grid.Col md={6} sm={12}>
								<Button fullWidth onClick={() => navigate(`/keyboard`)}>
									Клавиатура
								</Button>
							</Grid.Col>
						</Grid>
					</Card>
				</Grid.Col>

				<Grid.Col>
					<Card withBorder>
						<Grid>
							<Grid.Col>
								<Title align={`center`}>Инструменты</Title>
							</Grid.Col>

							<Grid.Col>
								<Divider w={"100%"} />
							</Grid.Col>

							<Grid.Col md={6} sm={12}>
								<Button fullWidth onClick={() => navigate(`/party`)} variant={`outline`}>
									Party калькулятор
								</Button>
							</Grid.Col>

							<Grid.Col md={6} sm={12}>
								<Button fullWidth onClick={() => navigate(`/coding`)} variant={`outline`}>
									Coding
								</Button>
							</Grid.Col>
						</Grid>
					</Card>
				</Grid.Col>

				<Grid.Col>
					<Space h={`45px`} />
				</Grid.Col>
			</Grid>
		</Flex>
	);
}

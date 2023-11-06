import {
	Button,
	Center,
	Divider,
	Flex,
	Text,
	Title,
	Image,
	Container,
	Stack,
	Group,
	Paper,
} from "@mantine/core";
import ScrollHint from "../../components/layout/scrollHint/index.tsx";
import {useState} from "react";
import KeyboardBuyModal from "./@modals/buy.modal";
import {useNavigate} from "react-router-dom";
import {useDocumentTitle} from "@mantine/hooks";
import FeatureList from "./feature.list.tsx";
import FeatureCards from "./feature.card.tsx";

export default function KeyboardIndex() {
	useDocumentTitle(`Framework`);

	const navigate = useNavigate();

	const [buyModal, setBuyModal] = useState(false);

	return (
		<>
			<KeyboardBuyModal
				opened={buyModal}
				onClose={() => {
					setBuyModal(false);
				}}
			/>

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

			<Container>
				<Flex justify={`center`} align={`stretch`} direction={`column`} gap={`md`}>
					<Stack mb={50} h={`calc(100dvh - 80px)`}>
						<Center h={`100%`}>
							<Stack>
								<Image src={`https://s.jourloy.com/web-images/FrameworkPreview.png`} />

								<Text align={`center`} color={`dimmed`} size={`20px`}>
									Самая удобная клавиатура
								</Text>

								<Divider />

								<Center>
									<Button fullWidth onClick={() => setBuyModal(true)}>
										Начать пользоваться
									</Button>
								</Center>
							</Stack>
						</Center>
					</Stack>
					<Stack mt={50} align={`center`}>
						<Title tt={`uppercase`}>
							Это все, что {` `}
							<Text span color={`indigo.5`}>
								тебе
							</Text>
							{` `} нужно
						</Title>

						<Text align={`center`} maw={`600px`}>
							У клавиатуры 59 клавиш и 1 энкодер, который отвечает за громкость звука,
							колесо мыши или яркость экрана. В этой клавиатуре собраны практически все
							преимущества современных клавиатур.
						</Text>
					</Stack>

					<FeatureList />

					<Title my={50} align={`center`} tt={`uppercase`} order={1}>
						Помогаем всем сферам
					</Title>

					<FeatureCards />

					<Divider />

					<Title order={2} align={`center`}>
						Частые вопросы
					</Title>

					<Button fullWidth onClick={() => navigate(`/tutorial/framework`)}>
						Узнать
					</Button>
				</Flex>
			</Container>
		</>
	);
}

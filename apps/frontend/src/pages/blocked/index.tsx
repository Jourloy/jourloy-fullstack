import {Container, Card, Title, Text, Stack, Button} from "@mantine/core";
import {useDocumentTitle} from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

export default function Blocked() {
	useDocumentTitle(`Нет доступа`);

	const navigate = useNavigate();

	return (
		<>
			<Container
				style={{
					position: `absolute`,
					left: `50%`,
					top: `50%`,
					transform: `translate(-50%, -50%)`,
					display: `flex`,
					justifyContent: `space-between`,
					alignItems: `center`,
					maxWidth: `720px`,
					width: `100%`,
				}}
			>
				<Stack maw={`700px`} w={`100%`} p={0} align={`center`}>
					<Card withBorder w={`100%`} h={`100%`}>
						<Stack>
							<Title align={`center`} tt={`uppercase`}>Упс</Title>

							<Text align={`center`}>
								Кажется у тебя нет доступа к этой странице
							</Text>

							<Text align={`center`} mt={`-15px`}>
								Попробуй авторизоваться, возможно это решит проблему
							</Text>
						</Stack>
					</Card>

					<Button onClick={() => navigate(`/`)} fullWidth>
						На главную
					</Button>
				</Stack>
			</Container>
		</>
	);
}

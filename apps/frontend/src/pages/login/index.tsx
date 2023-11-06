import {Button, Card, Center, Container, Divider, Flex, Stack, Text, Title} from "@mantine/core";
import {IconArrowNarrowLeft, IconBrandGoogle} from "@tabler/icons-react";
import LoginAPI from "./api";
import {useEffect, useState} from "react";
import {store} from "../../store/store";
import {userActions} from "../../store/features/user.slice";
import {useLocation, useNavigate} from "react-router-dom";
import DefaultLoading from "../../components/layout/loading";
import {useDocumentTitle} from "@mantine/hooks";

export default function Login() {
	useDocumentTitle(`Вход`);

	const backend = new LoginAPI();
	const navigate = useNavigate();
	const location = useLocation();

	const [loading, setLoading] = useState(true);

	const googleRedirect = () => {
		window.location.href = `${backend.context.getUri()}/google`;
	};

	const toMain = () => {
		navigate(`/`);
	};

	useEffect(() => {
		const source = backend.getSource();

		backend
			.checkUser(source.token)
			.then(d => {
				if (d.data.user.username)
					store.dispatch(userActions.changeUsername(d.data.user.username));
				if (d.data.user.avatar) store.dispatch(userActions.changeAvatar(d.data.user.avatar));
				if (d.data.user) {
					store.dispatch(userActions.login());
					location.key === `default` ? navigate(`/`) : navigate(-1);
				}
			})
			.catch(() => {
				setLoading(false);
			});

		return () => source.cancel();
	}, []);

	if (loading) return <DefaultLoading />;

	return (
		<Container
			style={{
				position: `absolute`,
				top: `50%`,
				left: `50%`,
				transform: `translate(-50%, -50%)`,
				maxWidth: `720px`,
				width: `100%`,
			}}
		>
			<Flex direction={"column"} align={`flex-start`}>
				<Button mb={`5px`} variant={`subtle`} p={0} compact onClick={toMain}>
					<Center inline>
						<IconArrowNarrowLeft stroke={1.3} />
						<Text>Вернуться на главную</Text>
					</Center>
				</Button>

				<Card withBorder w={"100%"}>
					<Stack>
						<Title align={`center`}>Привет!</Title>

						<Text c={`dimmed`} align={`center`} mt={`-10px`}>
							Если аккаунта нет, то он будет создан автоматически
						</Text>
						<Divider
							label={
								<Text size={`md`} tt={`uppercase`}>
									войти через
								</Text>
							}
							labelPosition={`center`}
						/>

						<Button
							leftIcon={<IconBrandGoogle />}
							w={`100%`}
							variant={`outline`}
							onClick={googleRedirect}
						>
							Google
						</Button>
					</Stack>
				</Card>
			</Flex>
		</Container>
	);
}

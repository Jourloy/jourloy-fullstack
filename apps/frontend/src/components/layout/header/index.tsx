import {
	Avatar,
	Center,
	Container,
	Flex,
	Group,
	Header,
	MantineProvider,
	Title,
	UnstyledButton,
} from "@mantine/core";
import {store} from "../../../store/store";
import {useEffect, useState} from "react";
import LoginAPI from "../../../pages/login/api";
import HeaderSettingsModal from "./modals/settings.modal";
import {useNavigate} from "react-router-dom";

type TProps = {
	ignoreWidthLimit?: boolean;
};

export default function HeaderComponent(props: TProps) {
	const loginBackend = new LoginAPI();
	const navigate = useNavigate();

	const [avatar, setAvatar] = useState(store.getState().userReducer.avatar);
	const [logined, setLogined] = useState(false);
	store.subscribe(() => {
		const _avatar = store.getState().userReducer.avatar;
		const _logined = store.getState().userReducer.logined;
		if (avatar !== _avatar) setAvatar(_avatar);
		if (logined !== _logined) setLogined(_logined);
	});

	const [userSettings, setUserSettings] = useState(false);

	const toMain = () => {
		navigate(`/`);
	};

	useEffect(() => {
		const source = loginBackend.getSource();
		loginBackend.autoLogin(source.token);
		return () => source.cancel();
	});

	return (
		<>
			<HeaderSettingsModal opened={userSettings} onClose={() => setUserSettings(false)} />
			<Header height={45} w={`100%`}>
				<Flex h={40} w={`100%`} justify={`center`} align={`center`}>
					<Container
						maw={props.ignoreWidthLimit ? `100%` : `850px`}
						w={`100%`}
						p={props.ignoreWidthLimit ? 20 : 0}
					>
						<Center h={`100%`}>
							<Group position={`apart`} w={`100%`} px={8} mt={`4px`}>
								<UnstyledButton onClick={toMain}>
									<Title color={`red`} style={{fontWeight: 500}}>
										JOURLOY
									</Title>
								</UnstyledButton>
								<UnstyledButton onClick={() => setUserSettings(true)}>
									<Flex>
										<Group position={`right`} spacing={`xs`}>
											<MantineProvider
												inherit
												theme={{
													colorScheme: `dark`,
												}}
											>
												<Avatar src={avatar} />
											</MantineProvider>
										</Group>
									</Flex>
								</UnstyledButton>
							</Group>
						</Center>
					</Container>
				</Flex>
			</Header>
		</>
	);
}

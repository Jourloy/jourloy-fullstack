import {
	Button,
	Divider,
	Modal,
	Title,
	Stack,
} from "@mantine/core";
import {store} from "../../../../store/store";
import {userActions} from "../../../../store/features/user.slice";
import LoginAPI from "../../../../pages/login/api";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import BugForm from "../../../inputs/bugForm";
import ThemeSwitch from "../../../actions/themeSwitch";
import ErrorNotification from "../../../logical/notification/error.notification";

type TProps = {
	opened: boolean;
	onClose: () => void;
};

export default function HeaderSettingsModal(props: TProps) {
	const loginBackend = new LoginAPI();
	const navigate = useNavigate();

	const [logined, setLogined] = useState(store.getState().userReducer.logined);
	const [admin, setAdmin] = useState(store.getState().userReducer.role === `admin`);

	store.subscribe(() => {
		const _logined = store.getState().userReducer.logined;
		const _admin = store.getState().userReducer.role === `admin`;
		if (logined !== _logined) setLogined(_logined);
		if (admin !== _admin) setAdmin(_admin);
	});

	const [bugMode, setBugMode] = useState(false);

	const logout = () => {
		loginBackend
			.logout()
			.then(() => {
				store.dispatch(userActions.reset());
				closeModal();
				navigate(`/`);
			})
			.catch(() => {
				ErrorNotification();
			});
	};

	const toAdmin = () => {
		closeModal();
		navigate(`/admin`);
	};

	const login = () => {
		closeModal();
		navigate(`/login`);
	};

	const onCloseBugMode = () => {
		setBugMode(false);
	};

	const closeModal = () => {
		props.onClose();
		onCloseBugMode();
	};

	if (!logined) {
		return (
			<Modal opened={props.opened} onClose={closeModal} centered style={{position: `absolute`}}>
				<Stack>
					<Title order={2} align={`center`}>
						Кажется ты не вошел в аккаунт
					</Title>

					<Button fullWidth onClick={login}>
						Войти
					</Button>

					<Divider />

					<ThemeSwitch />
				</Stack>
			</Modal>
		);
	}

	return (
		<Modal opened={props.opened} onClose={closeModal} centered style={{position: `absolute`}}>
			<Stack>
				<Title align={`center`}>{store.getState().userReducer.username}</Title>

				<Divider />

				<ThemeSwitch />

				<Divider />

				{admin && (
					<>
						<Button fullWidth onClick={toAdmin}>
							Панель управления
						</Button>

						<Divider />
					</>
				)}

				{!bugMode && (
					<Button fullWidth variant={`outline`} onClick={() => setBugMode(true)}>
						Сообщить о баге
					</Button>
				)}

				{bugMode && (
					<>
						<BugForm onClose={onCloseBugMode} />

						<Button fullWidth variant={`outline`} onClick={onCloseBugMode}>
							Отменить
						</Button>

						<Divider />
					</>
				)}

				<Button color={`red`} fullWidth onClick={logout}>
					Выйти
				</Button>
			</Stack>
		</Modal>
	);
}

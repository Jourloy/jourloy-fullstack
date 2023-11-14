import {Button, Card, Divider, Loader, LoadingOverlay, PasswordInput, TextInput} from "@mantine/core";
import {IconArrowNarrowLeft} from "@tabler/icons-react";
import {z} from "zod";
import {useForm, zodResolver} from "@mantine/form";
import LoginAPI from "./api";
import {useState} from "react";
import {useUserStore} from "../../store/user.store";
import {showNotification} from "@mantine/notifications";
import {useNavigate} from "react-router-dom";

export default function LoginIndex() {
	const api = new LoginAPI();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const zodSchema = z.object({
		login: z
			.string()
			.min(3, {message: `Минимум 3 символа`})
			.max(15, {message: `Максимум 15 символов`}),
		password: z
			.string()
			.min(6, {message: `Минимум 6 символов`})
			.max(20, {message: `Максимум 20 символов`}),
	});

	const form = useForm({
		initialValues: {
			login: ``,
			password: ``,
		},
		validate: zodResolver(zodSchema),
	});

	const onSubmit = (values: typeof form.values) => {
		setLoading(true);
		api.login(values.login, values.password)
			.then(data => {
				if (data) {
					useUserStore.setState({
						username: data.data.username,
						avatar: data.data.avatar,
						role: data.data.role,
						logined: true,
					});
					showNotification({
						title: `Авторизация прошла успешно`,
						message: `Добро пожаловать, ${data.data.username}`,
						autoClose: 5000,
						color: `green`,
					});
					navigate(`/`);
					return;
				}

				showNotification({
					title: `Авторизация не удалась`,
					message: `Неправильное имя пользователя или пароль`,
					autoClose: 5000,
					color: `red`,
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<main className={`flex flex-col justify-center items-center min-h-screen`}>
			<div className={`flex flex-col max-w-[650px] w-full`}>
				<Button variant={`transparent`} className={`max-w-[200px]`} color={`black`}>
					<IconArrowNarrowLeft stroke={1.3} />
					<p>Вернуться на главную</p>
				</Button>
				<Card withBorder className={`w-full flex flex-col justify-center items-center`}>
					<LoadingOverlay
						visible={loading}
						zIndex={1000}
						overlayProps={{radius: `md`, blur: 5}}
						loaderProps={{
							children: (
								<>
									<div className={`flex flex-col justify-center items-center`}>
										<Loader color={`black`} />
										<h2>Думаем...</h2>
									</div>
								</>
							),
						}}
					/>

					<h1 className={`text-[40px]`}>Привет!</h1>
					<p>Если аккаунта нет, то он будет создан автоматически</p>

					<Divider className={`w-full my-[15px]`} />

					<form
						className={`w-full flex flex-col space-y-5`}
						onSubmit={form.onSubmit(onSubmit)}
					>
						<TextInput
							label={`Логин`}
							placeholder={`Логин`}
							withAsterisk
							{...form.getInputProps(`login`)}
						/>
						<PasswordInput
							label={`Пароль`}
							placeholder={`Пароль`}
							withAsterisk
							{...form.getInputProps(`password`)}
						/>
						<Button type={`submit`} color={`black`} fullWidth>
							Войти
						</Button>
					</form>

					<Divider
						className={`w-full my-[15px]`}
						labelPosition={`center`}
						label={<p className={`text-[16px]`}>или через</p>}
					/>

					<Button color={`blue`} fullWidth>
						Войти через Google
					</Button>
				</Card>
				<div
					className={`flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 mt-[20px]`}
				>
					<Card withBorder className={`w-full md:w-[50%]`}>
						<p>У нас один аккаунт для всех сервисов на домене Jourloy</p>
					</Card>
					<Card withBorder className={`w-full md:w-[50%]`}>
						<p>Аккаунт Google можно будет добавить позже</p>
					</Card>
				</div>
			</div>
		</main>
	);
}

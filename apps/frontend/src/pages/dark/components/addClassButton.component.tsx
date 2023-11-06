import {Button, Divider, Grid, LoadingOverlay, Modal, Stack, TextInput, Title} from "@mantine/core";
import {useForm, zodResolver} from "@mantine/form";
import {useState} from "react";
import {z} from "zod";
import DarkAPI from "../api";
import SuccessNotification from "../../../components/logical/notification/success.notification";
import ErrorNotification from "../../../components/logical/notification/error.notification";

export default function AddClassButton() {
	const backend = new DarkAPI();

	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const schema = z.object({
		enName: z
			.string()
			.min(3, {message: `Минимум 3 символов`})
			.max(15, {message: `Максимум 15 символов`}),
		ruName: z
			.string()
			.min(3, {message: `Минимум 3 символов`})
			.max(15, {message: `Максимум 15 символов`}),
	});

	const form = useForm({
		initialValues: {
			enName: ``,
			enDescription: ` `,
			ruName: ``,
			ruDescription: ` `,
		},
		validate: zodResolver(schema),
	});

	const submit = (values: {
		enName: string;
		enDescription: string;
		ruName: string;
		ruDescription: string;
	}) => {
		setLoading(true);
		console.log(values);
		backend.addClass(values)
			.then(() => {
				SuccessNotification({message: `Класс успешно добавлен`})
				onCloseModal();
			})
			.catch(() => {
				ErrorNotification();
			})
			.finally(() => {
				setLoading(false);
				backend.getAllClassesInStore();
			});
	};

	const onCloseModal = () => {
		setShowModal(false);
		form.reset();
	};

	return (
		<>
			<Modal opened={showModal} onClose={onCloseModal} centered>
				<LoadingOverlay visible={loading} overlayBlur={3} />
				<Stack>
					<Title order={2} align={`center`}>
						Добавление класса
					</Title>
					<Divider />

					<form style={{width: `100%`}} onSubmit={form.onSubmit(submit)}>
						<Grid>
							<Grid.Col md={6} sm={12}>
								<TextInput
									label={`Название`}
									placeholder={`На английском`}
									{...form.getInputProps(`enName`)}
								/>
							</Grid.Col>
							<Grid.Col md={6} sm={12}>
								<TextInput
									label={`Название`}
									placeholder={`На русском`}
									{...form.getInputProps(`ruName`)}
								/>
							</Grid.Col>
							<Grid.Col>
								<Button fullWidth type={`submit`} loading={loading}>
									Добавить
								</Button>
							</Grid.Col>
						</Grid>
					</form>
				</Stack>
			</Modal>
			<Button fullWidth onClick={() => setShowModal(true)}>
				Добавить класс
			</Button>
		</>
	);
}

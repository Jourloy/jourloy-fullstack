import {
	Button,
	Divider,
	Grid,
	LoadingOverlay,
	Modal,
	Stack,
	TextInput,
	Textarea,
	Title,
} from "@mantine/core";
import {useForm, zodResolver} from "@mantine/form";
import {useState} from "react";
import {z} from "zod";
import DarkAPI from "../api";
import SuccessNotification from "../../../components/logical/notification/success.notification";
import ErrorNotification from "../../../components/logical/notification/error.notification";

export default function AddAttributeButton() {
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
		enDescription: z
			.string()
			.min(3, {message: `Минимум 3 символов`})
			.max(30, {message: `Максимум 30 символов`}),
		ruDescription: z
			.string()
			.min(3, {message: `Минимум 3 символов`})
			.max(30, {message: `Максимум 30 символов`}),
	});

	const form = useForm({
		initialValues: {
			enName: ``,
			enDescription: ``,
			ruName: ``,
			ruDescription: ``,
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
		backend
			.addAttribute(values)
			.then(() => {
				SuccessNotification({message: `Атрибут успешно добавлен`});
				onCloseModal();
			})
			.catch(() => {
				ErrorNotification();
			})
			.finally(() => {
				setLoading(false);
				backend.getAllAttributesInStore();
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
						Добавление атрибута
					</Title>
					<Divider />

					<form style={{width: `100%`}} onSubmit={form.onSubmit(submit)}>
						<Grid>
							<Grid.Col>
								<TextInput
									label={`Название`}
									placeholder={`На английском`}
									{...form.getInputProps(`enName`)}
								/>
							</Grid.Col>
							<Grid.Col>
								<Textarea
									label={`Описание`}
									placeholder={`На английском`}
									{...form.getInputProps(`enDescription`)}
								/>
							</Grid.Col>
							<Grid.Col>
								<TextInput
									label={`Название`}
									placeholder={`На русском`}
									{...form.getInputProps(`ruName`)}
								/>
							</Grid.Col>
							<Grid.Col>
								<Textarea
									label={`Описание`}
									placeholder={`На русском`}
									{...form.getInputProps(`ruDescription`)}
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
				Добавить атрибут
			</Button>
		</>
	);
}

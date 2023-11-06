import {Stack, Textarea, Button, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import SuccessNotification from "../../logical/notification/success.notification";

type TProps = {
	onClose?: () => void;
};

export default function BugForm(props: TProps) {
	const form = useForm({
		initialValues: {
			description: ``,
			contact: ``,
		},
		validate: {
			description: value => (value.length < 10 ? `Минимум 10 символов` : null),
		},
	});

	const onSubmit = () => {
		SuccessNotification({message: `Ошибка принята в обработку`});

		form.reset();
		if (props.onClose) props.onClose();
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Stack>
				<Textarea
					label={`В чем проблема?`}
					placeholder={`Можешь вкратце описать действия`}
					minRows={3}
					maxRows={5}
					withAsterisk
					{...form.getInputProps(`description`)}
				/>

				<TextInput 
					label={`Для обратной связи`}
					placeholder={`EMail или Telegram`}
					{...form.getInputProps(`contact`)}
				/>

				<Button fullWidth type={`submit`}>
					Отправить
				</Button>
			</Stack>
		</form>
	);
}

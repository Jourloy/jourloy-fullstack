import { notifications } from "@mantine/notifications";

type TProps = {
	title?: string;
	message?: string;
	icon?: string;
}

export default function ErrorNotification(props?: TProps) {
	notifications.show({
		color: `red`,
		title: props?.title || `Ошибка`,
		message: props?.message || `Что-то пошло не так, попробуй позже`,
		icon: props?.icon || `😰`,
	});
}
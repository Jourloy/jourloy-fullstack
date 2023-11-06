import { notifications } from "@mantine/notifications";

type TProps = {
	title?: string;
	message?: string;
	icon?: string;
}

export default function SuccessNotification(props?: TProps) {
	notifications.show({
		color: `green`,
		title: props?.title || `Успех`,
		message: props?.message || `Получилось`,
		icon: props?.icon || `😎`,
	});
}
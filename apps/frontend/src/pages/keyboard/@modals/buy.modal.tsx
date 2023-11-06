import {Card, Divider, Stack, Modal, Title, UnstyledButton, Text} from "@mantine/core";
import { formatter } from "../../../context";

type TProps = {
	opened: boolean;
	onClose: () => void;
};

export default function KeyboardBuyModal(props: TProps) {
	const toTelegram = () => {
		window.location.href = `https://t.me/jourloy/`;
	};

	const onClose = () => {
		props.onClose();
	};

	return (
			<Modal opened={props.opened} onClose={onClose} centered>
				<Stack>
						<Title align={`center`}>Заказать клавиатуру</Title>

						<Divider />

						<Text>Стоимость клавиатуры: {formatter.format(10000)}</Text>

						<Divider />

						<Text>
							Временно принимаем заказы только через Telegram. Чтобы написать -
							нажми на кнопку ниже или найди нас в поиске
						</Text>

						<UnstyledButton onClick={toTelegram} w={`100%`}>
							<Card withBorder>
								<Text align={`center`}>
									@jourloy
								</Text>
							</Card>
						</UnstyledButton>

			</Stack>
			</Modal>
	);
}

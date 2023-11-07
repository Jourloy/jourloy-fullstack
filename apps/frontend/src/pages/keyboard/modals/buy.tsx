import {Button, Card, Divider, Modal} from "@mantine/core";

interface IProps {
	opened: boolean;
	onClose: () => void;
}

export default function BuyModal(props: IProps) {
	return (
		<Modal opened={props.opened} onClose={props.onClose} centered withCloseButton={false}>
			<div className={`w-full flex flex-col justify-center items-center space-y-3`}>
				<h1 className={`uppercase text-[30px] text-center`}>Все готово</h1>
				<Divider w={`100%`} />
				<h2 className={`text-[20px]`}>Клавиатуру можно заказать тут</h2>
				<div className={`w-full flex flex-row space-x-5`}>
					<Button fullWidth color={`yellow.7`} disabled>
						Яндекс Маркет
					</Button>
					<Button fullWidth disabled className={`hidden`}>
						OZON
					</Button>
				</div>
				<p className={`text-[14px] text-red-500`}>
					Заказ через маркеты временно недоступен
				</p>
				<Divider w={`100%`} />
				<h2 className={`text-[20px]`}>Или напрямую через меня</h2>
				<Card withBorder className={`flex flex-col w-full justify-center items-center`}>
					<h3 className={`text-[20px] text-center`}>Telegram</h3>
					<p className={`text-[14px] text-center`}>@jourloy</p>
				</Card>
			</div>
		</Modal>
	);
}

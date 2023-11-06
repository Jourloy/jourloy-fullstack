import {Button, Checkbox, Divider, Grid, Modal, TextInput, Title, Text} from "@mantine/core";
import {useState} from "react";
import ErrorNotification from "../../../../../components/logical/notification/error.notification";
import SuccessNotification from "../../../../../components/logical/notification/success.notification";
import {partyActions} from "../../../../../store/features/party.slice";
import {store} from "../../../../../store/store";
import PartyAPI from "../../../api";

type TProps = {
	opened: boolean;
	onClose: () => void;
};

export default function PartyAddMemberModal(props: TProps) {
	const backend = new PartyAPI();

	const [calculator, setCalculator] = useState(store.getState().partyReducer.calculator);

	store.subscribe(() => {
		const calc = store.getState().partyReducer.calculator;
		setCalculator(calc);
	});

	const [memberName, setMemberName] = useState(``);
	const [addMemberLoading, setAddMemberLoading] = useState(false);
	const [payer, setPayer] = useState(false);

	const closeModal = () => {
		setMemberName(``);
		setAddMemberLoading(false);
		setPayer(false);
		props.onClose();
	};

	const submit = () => {
		setAddMemberLoading(true);
		backend
			.createMember(calculator.id, memberName, payer)
			.then(() => {
				store.dispatch(partyActions.updateCalculator());
				SuccessNotification({message: `Участник добавлен`});
			})
			.catch(() => {
				ErrorNotification();
			})
			.finally(() => {
				closeModal();
			});
	};

	return (
		<Modal opened={props.opened} onClose={props.onClose} centered>
			<Grid>
				<Grid.Col>
					<Title tt={`uppercase`} order={3} align={`center`}>
						Добавить участника
					</Title>
				</Grid.Col>

				<Grid.Col>
					<Divider />
				</Grid.Col>

				<Grid.Col>
					<TextInput
						placeholder={`Как зовут участника?`}
						onChange={e => setMemberName(e.target.value)}
					/>
				</Grid.Col>

				<Grid.Col>
					<Checkbox
						label={<Text>Он организатор</Text>}
						checked={payer}
						onChange={e => setPayer(e.currentTarget.checked)}
					/>
				</Grid.Col>

				<Grid.Col>
					<Button
						fullWidth
						variant={`outline`}
						disabled={memberName === ``}
						onClick={submit}
						loading={addMemberLoading}
					>
						Добавить
					</Button>
				</Grid.Col>
			</Grid>
		</Modal>
	);
}

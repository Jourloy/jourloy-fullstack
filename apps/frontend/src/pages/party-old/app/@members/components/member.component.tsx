import {
	Card,
	Grid,
	Text,
	Modal,
	Title,
	Divider,
	TextInput,
	UnstyledButton,
	Checkbox,
	Button,
} from "@mantine/core";
import {useState} from "react";
import ErrorNotification from "../../../../../components/logical/notification/error.notification";
import SuccessNotification from "../../../../../components/logical/notification/success.notification";
import {formatter} from "../../../../../context";
import {partyActions} from "../../../../../store/features/party.slice";
import {store} from "../../../../../store/store";
import {TMember} from "../../../../../types";
import PartyAPI from "../../../api";

type TProps = {
	member: TMember;
};

export default function PartyMemberComponent(props: TProps) {
	const member = props.member;
	const backend = new PartyAPI();

	const [calculator, setCalculator] = useState(store.getState().partyReducer.calculator);

	store.subscribe(() => {
		const calc = store.getState().partyReducer.calculator;
		setCalculator(calc);
	});

	const [memberSettingsModal, setMemberSettingModal] = useState(false);

	const [memberName, setMemberName] = useState(member.name);
	const [memberNameError, setMemberNameError] = useState<string>();

	const [payerState, setPayerState] = useState(member.payer ? member.payer : false);

	// TODO: Move to logic file
	const getCredit = (memberId: number) => {
		let cost = 0;
		for (const pos of calculator.positions) {
			if (pos.memberIds.length > 0 && pos.memberIds.includes(memberId)) {
				cost += Math.ceil(pos.cost / pos.memberIds.length);
			}
		}
		return cost;
	};

	const getPayerCost = (memberId: number) => {
		let cost = 0;
		for (const pos of calculator.positions) {
			if (pos.payerId && pos.payerId === memberId) {
				cost += pos.cost;
			}
		}
		return cost;
	};

	const [deleteLoading, setDeleteLoading] = useState(false);
	// TODO
	const [changeLoading] = useState(false);

	const onRemove = () => {
		setDeleteLoading(true);
		backend
			.removeMember(member.id)
			.then(() => {
				SuccessNotification({message: `Участник удален`});
			})
			.catch(() => {
				ErrorNotification();
			})
			.finally(() => {
				store.dispatch(partyActions.updateCalculator());
				setDeleteLoading(false);
			});
	};

	const closeModal = () => {
		setMemberSettingModal(false);
		setMemberName(member.name);
		setMemberNameError(undefined);
		setPayerState(member.payer ? member.payer : false);
	};

	const checkMemberName = (name: string) => {
		if (name.length <= 0) {
			setMemberNameError(`Имя не может быть пустым`);
			return;
		}

		setMemberName(name);
		setMemberNameError(undefined);
	};

	return (
		<>
			<Modal opened={memberSettingsModal} onClose={closeModal} centered>
				<Grid>
					<Grid.Col>
						<Title order={2} align={`center`}>
							Участник
						</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col span={member.payer ? 6 : 12}>
						<Card withBorder p={5}>
							<Grid.Col>
								<Title align={`center`} order={3}>
									Должен
								</Title>
							</Grid.Col>
							<Grid.Col>
								<Text align={`center`}>{formatter.format(getCredit(member.id))}</Text>
							</Grid.Col>
						</Card>
					</Grid.Col>

					<Grid.Col span={6} hidden={!member.payer}>
						<Card withBorder p={5}>
							<Grid.Col>
								<Title align={`center`} order={3}>
									Купил на
								</Title>
							</Grid.Col>
							<Grid.Col>
								<Text align={`center`}>{formatter.format(getPayerCost(member.id))}</Text>
							</Grid.Col>
						</Card>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<TextInput
							label={`Имя`}
							value={memberName}
							error={memberNameError}
							onChange={e => checkMemberName(e.target.value)}
						/>
					</Grid.Col>

					<Grid.Col>
						<Checkbox
							label={<Text>Он организатор</Text>}
							checked={payerState}
							onChange={e => setPayerState(e.currentTarget.checked)}
						/>
					</Grid.Col>

					<Grid.Col>
						<Button fullWidth disabled loading={changeLoading}>
							Временно нельзя изменять
						</Button>
					</Grid.Col>

					<Grid.Col>
						<Button
							fullWidth
							variant={`outline`}
							color={`red`}
							onClick={() => onRemove()}
							loading={deleteLoading}
						>
							Удалить
						</Button>
					</Grid.Col>
				</Grid>
			</Modal>
			<Grid.Col key={member.id} md={6} sm={12}>
				<UnstyledButton w={`100%`} onClick={() => setMemberSettingModal(true)}>
					<Card
						withBorder
						w={`100%`}
						py={5}
						px={10}
						style={{
							borderColor: member.payer ? `#f2d9ae` : `#dee2e6`,
						}}
					>
						<Grid w={`100%`} m={0}>
							<Grid.Col span={4}>
								<Text align={`left`} mt={`3px`}>
									{formatter.format(getCredit(member.id))}
								</Text>
							</Grid.Col>

							<Grid.Col span={8}>
								<Text align={`right`} mt={`3px`} truncate>
									{member.name}
								</Text>
							</Grid.Col>
						</Grid>
					</Card>
				</UnstyledButton>
			</Grid.Col>
		</>
	);
}

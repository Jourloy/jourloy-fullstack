import {
	Button,
	Divider,
	Grid,
	Modal,
	MultiSelect,
	NumberInput,
	Select,
	TextInput,
	Title,
} from "@mantine/core";
import {useState} from "react";
import ErrorNotification from "../../../../../components/logical/notification/error.notification";
import SuccessNotification from "../../../../../components/logical/notification/success.notification";
import {partyActions} from "../../../../../store/features/party.slice";
import {store} from "../../../../../store/store";
import {TPosition} from "../../../../../types";
import PartyAPI from "../../../api";
import PartyPositionLogic from "../../logic";

type TProps = {
	opened: boolean;
	onClose: () => void;
	position: TPosition;
};

export default function PositionModal(props: TProps) {
	const [calculator, setCalculator] = useState(store.getState().partyReducer.calculator);

	store.subscribe(() => {
		const calc = store.getState().partyReducer.calculator;
		setCalculator(calc);
	});

	const backend = new PartyAPI();
	const logic = new PartyPositionLogic(calculator);

	const [positionName, setPositionName] = useState(props.position.name);
	const [positionNameError, setPositionNameError] = useState<undefined | string>(undefined);
	const [positonCost, setPositionCost] = useState<number | undefined>(props.position.cost);
	const [positionCostError, setPositionCostError] = useState<undefined | string>(undefined);
	const [positionMembers, setPositionMembers] = useState<string[]>(
		logic.getMembersAsString(props.position.id)
	);
	const [positionPayer, setPositionPayer] = useState<number | undefined>(props.position.payerId);

	const [removePositionLoading, setRemovePositionLoading] = useState(false);
	const [changePositionLoading, setChangePositionLoading] = useState(false);

	const getData = () => {
		const data = [];
		for (const member of calculator.members) {
			data.push({value: member.id.toString(), label: member.name, image: member.avatar});
		}
		return data;
	};

	const getDataOrgs = () => {
		const data = [];
		for (const member of calculator.members) {
			if (member.payer)
				data.push({value: member.id.toString(), label: member.name, image: member.avatar});
		}
		return data;
	};

	const checkName = (str: string) => {
		if (str === ``) setPositionNameError(`Имя не может быть пустым`);
		else setPositionNameError(undefined);

		setPositionName(str);
	};

	const checkCost = (num: number | "") => {
		const checked = logic.checkNumber(num);

		if (checked.error) {
			setPositionCostError(checked.desc);
			return;
		}

		setPositionCostError(undefined);
		setPositionCost(checked.result);
	};

	const submitChange = () => {
		if (positionNameError != undefined) return;
		if (positionCostError != undefined) return;

		setChangePositionLoading(true);

		const members: number[] = [];
		positionMembers.forEach(v => members.push(+v));

		backend
			.updatePosition({
				name: positionName,
				cost: positonCost,
				memberIds: members,
				positionId: props.position.id,
				payerId: positionPayer,
			})
			.then(() => {
				SuccessNotification({message: `Позиция обновлена`});
				store.dispatch(partyActions.updateCalculator());
				closeModal();
			})
			.catch(() => {
				ErrorNotification();
			})
			.finally(() => {
				setChangePositionLoading(false);
			});
	};

	const closeModal = () => {
		setPositionName(``);
		setPositionCost(undefined);
		setPositionCostError(undefined);
		setPositionMembers([]);
		setChangePositionLoading(false);
		setRemovePositionLoading(false);
		props.onClose();
	};

	const removePosition = (positionId: number) => {
		setRemovePositionLoading(true);
		backend
			.removePosition(positionId)
			.then(() => {
				SuccessNotification({message: `Позиция удалена`});
			})
			.catch(() => {
				ErrorNotification();
			})
			.finally(() => {
				store.dispatch(partyActions.updateCalculator());
				setRemovePositionLoading(false);
				props.onClose();
			});
	};

	return (
		<>
			<Modal opened={props.opened} onClose={closeModal} centered>
				<Grid>
					<Grid.Col>
						<Title align={`center`} order={3} tt={`uppercase`}>
							Позиция
						</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col span={6}>
						<TextInput
							label={`Название`}
							value={positionName}
							onChange={e => checkName(e.target.value)}
							error={positionNameError}
						/>
					</Grid.Col>

					<Grid.Col span={6}>
						<NumberInput
							label={`Стоимость`}
							value={positonCost}
							onChange={checkCost}
							error={positionCostError}
						/>
					</Grid.Col>

					<Grid.Col>
						<MultiSelect
							label={`Используют`}
							data={getData()}
							value={positionMembers}
							onChange={setPositionMembers}
						/>
					</Grid.Col>

					<Grid.Col>
						<Select
							label={`Купил`}
							data={getDataOrgs()}
							value={positionPayer?.toString()}
							onChange={e => setPositionPayer(e ? +e : undefined)}
						/>
					</Grid.Col>

					<Grid.Col mt={`15px`}>
						<Button fullWidth onClick={submitChange} loading={changePositionLoading}>
							Сохранить
						</Button>
					</Grid.Col>

					<Grid.Col>
						<Button
							fullWidth
							variant={`outline`}
							color={`red`}
							onClick={() => removePosition(props.position.id)}
							loading={removePositionLoading}
						>
							Удалить
						</Button>
					</Grid.Col>
				</Grid>
			</Modal>
		</>
	);
}

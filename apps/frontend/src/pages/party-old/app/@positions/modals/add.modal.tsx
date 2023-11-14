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
import PartyPositionLogic from "../../logic";
import {store} from "../../../../../store/store";
import ErrorNotification from "../../../../../components/logical/notification/error.notification";
import SuccessNotification from "../../../../../components/logical/notification/success.notification";
import {partyActions} from "../../../../../store/features/party.slice";
import PartyAPI from "../../../api";

type TProps = {
	opened: boolean;
	onClose: () => void;
};

export default function PartyAddPositionModal(props: TProps) {
	const [calculator, setCalculator] = useState(store.getState().partyReducer.calculator);

	store.subscribe(() => {
		const calc = store.getState().partyReducer.calculator;
		setCalculator(calc);
	});

	const backend = new PartyAPI();
	const logic = new PartyPositionLogic(calculator);

	const [positionName, setPositionName] = useState(``);
	const [positonCost, setPositionCost] = useState<number>();
	const [positionCostError, setPositionCostError] = useState<undefined | string>(undefined);
	const [positionMembers, setPositionMembers] = useState<string[]>([]);
	const [positionPayer, setPositionPayer] = useState<string | null>(``);

	const [addPositionLoading, setAddPositionLoading] = useState(false);

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

	const submit = () => {
		if (positionName === `` || positonCost == undefined) return;
		setAddPositionLoading(true);

		const members: number[] = [];
		positionMembers.forEach(v => members.push(+v));

		backend
			.createPosition({
				name: positionName,
				cost: positonCost,
				memberIds: members,
				calculatorId: calculator.id,
				payerId: positionPayer ? +positionPayer : undefined,
			})
			.then(() => {
				SuccessNotification({message: `Позиция добавлена`});
				store.dispatch(partyActions.updateCalculator());
				closeModal();
			})
			.catch(() => {
				ErrorNotification();
			});
	};

	const closeModal = () => {
		setPositionName(``);
		setPositionCost(undefined);
		setPositionCostError(undefined);
		setPositionMembers([]);
		setAddPositionLoading(false);
		props.onClose();
	};

	return (
		<>
			<Modal
				opened={props.opened}
				onClose={closeModal}
				centered
				style={{
					overflow: `visible`,
				}}
			>
				<Grid>
					<Grid.Col>
						<Title tt={`uppercase`} order={3} align={`center`}>
							Добавить позицию
						</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<TextInput placeholder={`Что это?`} onChange={e => checkName(e.target.value)} />
					</Grid.Col>

					<Grid.Col>
						<NumberInput
							placeholder={`Сколько это стоит?`}
							onChange={e => checkCost(e)}
							error={positionCostError}
						/>
					</Grid.Col>

					<Grid.Col>
						<MultiSelect
							data={getData()}
							placeholder={`Кто участвует`}
							searchable
							nothingFound={`Никого не нашли`}
							onChange={v => setPositionMembers(v)}
							dropdownPosition={`top`}
							maxDropdownHeight={`120px`}
						/>
					</Grid.Col>

					<Grid.Col>
						<Select
							data={getDataOrgs()}
							placeholder={`Кто платит`}
							searchable
							nothingFound={`Никого не нашли`}
							onChange={v => setPositionPayer(v)}
							dropdownPosition={`top`}
							maxDropdownHeight={120}
						/>
					</Grid.Col>

					<Grid.Col>
						<Button
							fullWidth
							variant={`outline`}
							onClick={submit}
							loading={addPositionLoading}
						>
							Добавить
						</Button>
					</Grid.Col>
				</Grid>
			</Modal>
		</>
	);
}

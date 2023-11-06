import {
	Card,
	Grid,
	UnstyledButton,
	Text,
	Group,
	Title,
	Avatar,
	Center,
	Pagination,
	TextInput,
} from "@mantine/core";
import {store} from "../../../../store/store";
import {useState} from "react";
import {TMember, TPosition} from "../../../../types";
import PositionModal from "./modals/position.modal";
import {IconSearch} from "@tabler/icons-react";

const formatter = new Intl.NumberFormat("ru", {
	style: `currency`,
	currency: `RUB`,
	maximumFractionDigits: 0,
});

export default function PartyPositions() {
	const [calculator, setCalculator] = useState(store.getState().partyReducer.calculator);
	const [positionPages, setPositionPages] = useState(store.getState().partyReducer.positionPages);
	const [positionPage, setPositionPage] = useState(1);

	store.subscribe(() => {
		const calc = store.getState().partyReducer.calculator;
		const pages = store.getState().partyReducer.positionPages;
		if (calc !== calculator) setCalculator(calc);
		if (pages !== positionPages) setPositionPages(pages);
	});

	const [currentPosition, setCurrentPosition] = useState<TPosition | null>(null);
	const [positionModal, setPositionModal] = useState(false);

	const [positionSearch, setPositionSearch] = useState(``);

	const openPosition = (pos: TPosition) => {
		setCurrentPosition(pos);
		setPositionModal(true);
	};

	const closePosition = () => {
		setCurrentPosition(null);
		setPositionModal(false);
	};

	if (calculator.positions.length === 0) {
		return (
			<Grid.Col>
				<Title align={`center`} tt={`uppercase`} color={`dimmed`} opacity={`20%`}>
					Скучная Party, ведь ничего нет
				</Title>
			</Grid.Col>
		);
	}

	const getInitials = (name: string) => {
		const split = name.split(` `);
		if (split.length === 1) return split[0][0].toUpperCase();
		return `${split[0][0].toUpperCase()}${split[1][0].toUpperCase()}`;
	};

	const getMembersAvatars = (memberIds: number[]) => {
		const filtered = calculator.members.filter(m => memberIds.includes(m.id));
		const members: TMember[] = [];
		for (let i = 0; i !== 2; i++) {
			if (filtered[i]) members.push(filtered[i]);
		}

		return members.map(m => <Avatar key={m.id}>{getInitials(m.name)}</Avatar>);
	};

	const getMemberOver = (memberIds: number[]) => {
		const filtered = calculator.members.filter(m => memberIds.includes(m.id));
		const members: TMember[] = [];
		for (let i = 0; i !== 2; i++) {
			if (filtered[i]) members.push(filtered[i]);
		}

		const amount = filtered.length - members.length;
		if (amount > 0) return <Avatar>+{amount}</Avatar>;
		return <></>;
	};

	const positions: TPosition[] = [];

	if (positionSearch === ``) {
		for (let i = (positionPage - 1) * 5; i < positionPage * 5; i++) {
			if (calculator.positions[i]) positions.push(calculator.positions[i]);
		}
	} else {
		const filtered = calculator.positions.filter(m => m.name.includes(positionSearch));
		for (let i = (positionPage - 1) * 5; i < positionPage * 5; i++) {
			if (filtered[i]) positions.push(filtered[i]);
		}
	}

	const getMap = () => {
		return positions.map(position => (
			<Grid.Col key={position.id}>
				<UnstyledButton
					w={`100%`}
					mah={`50px`}
					h={`100%`}
					onClick={() => openPosition(position)}
				>
					<Card withBorder px={10} py={5} h={`50px`}>
						<Grid>
							<Grid.Col span={4}>
								<Text truncate mt={8}>
									{position.name}
								</Text>
							</Grid.Col>

							<Grid.Col span={4}>
								<Text align={`center`} mt={8} truncate>
									{formatter.format(position.cost)}
								</Text>
							</Grid.Col>

							<Grid.Col span={4}>
								<Group position={`right`}>
									<Avatar.Group>
										{getMembersAvatars(position.memberIds)}
										{getMemberOver(position.memberIds)}
									</Avatar.Group>
								</Group>
							</Grid.Col>
						</Grid>
					</Card>
				</UnstyledButton>
			</Grid.Col>
		));
	};

	return (
		<>
			{currentPosition && (
				<PositionModal
					opened={positionModal}
					onClose={closePosition}
					position={currentPosition}
				/>
			)}
			<Grid.Col>
				<TextInput
					icon={<IconSearch stroke={1.3} />}
					placeholder={`Наименование`}
					value={positionSearch}
					onChange={e => setPositionSearch(e.target.value)}
				/>
			</Grid.Col>
			{getMap()}
			<Grid.Col hidden={positionSearch !== ``}>
				<Center>
					<Pagination
						total={positionPages}
						value={positionPage}
						onChange={setPositionPage}
						color={`dark`}
					/>
				</Center>
			</Grid.Col>
		</>
	);
}

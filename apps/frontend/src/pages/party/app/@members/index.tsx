import {Grid, Title, Pagination, Center, TextInput, Menu, Button} from "@mantine/core";
import {useState} from "react";
import {store} from "../../../../store/store";
import {TMember} from "../../../../types";
import PartyMemberComponent from "./components/member.component";
import {IconSearch} from "@tabler/icons-react";

export default function PartyMembers() {
	const [calculator, setCalculator] = useState(store.getState().partyReducer.calculator);
	const [memberPages, setMemberPages] = useState(store.getState().partyReducer.memberPages);
	const [memberPage, setMemberPage] = useState(1);

	store.subscribe(() => {
		const calc = store.getState().partyReducer.calculator;
		const pages = store.getState().partyReducer.memberPages;
		setCalculator(calc);
		setMemberPages(pages);
	});

	const [memberSearch, setMemberSearch] = useState(``);
	const [memberFilter, setMemberFilter] = useState(`all`);

	if (!calculator) return <></>;

	if (calculator.members.length === 0) {
		return (
			<Grid.Col>
				<Title align={`center`} tt={`uppercase`} color={`dimmed`} opacity={`20%`}>
					Пока никого нет
				</Title>
			</Grid.Col>
		);
	}

	const memberArr = calculator.members.filter(m => {
		if (memberFilter === `all`) return true;
		if (memberFilter === `noOrg`) return !m.payer;
		if (memberFilter === `org`) return m.payer;
	});
	const members: TMember[] = [];

	if (memberSearch === ``) {
		for (let i = (memberPage - 1) * 6; i < memberPage * 6; i++) {
			if (memberArr[i]) members.push(memberArr[i]);
		}
	} else {
		const filtered = memberArr.filter(m => m.name.includes(memberSearch));
		for (let i = (memberPage - 1) * 6; i < memberPage * 6; i++) {
			if (filtered[i]) {
				if (memberSearch === ``) members.push(filtered[i]);
				else {
					if (filtered[i].name.includes(memberSearch)) members.push(filtered[i]);
				}
			}
		}
	}

	const membersMap = () => members.map(member => <PartyMemberComponent member={member} />);

	return (
		<>
			<Grid.Col md={8} sm={12}>
				<TextInput
					value={memberSearch}
					onChange={e => setMemberSearch(e.target.value)}
					icon={<IconSearch stroke={1.3} />}
					placeholder={`Имя участника`}
				/>
			</Grid.Col>

			<Grid.Col md={4} sm={12}>
				<Menu>
					<Menu.Target>
						<Button fullWidth>Фильтр</Button>
					</Menu.Target>

					<Menu.Dropdown>
						<Menu.Item
							disabled={memberFilter === `all`}
							onClick={() => setMemberFilter(`all`)}
						>
							Все
						</Menu.Item>
						<Menu.Item
							disabled={memberFilter === `noOrg`}
							onClick={() => setMemberFilter(`noOrg`)}
						>
							Не организаторы
						</Menu.Item>
						<Menu.Item
							disabled={memberFilter === `org`}
							onClick={() => setMemberFilter(`org`)}
						>
							Организаторы
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</Grid.Col>

			{membersMap()}

			<Grid.Col hidden={memberSearch !== ``}>
				<Center>
					<Pagination
						total={memberPages}
						value={memberPage}
						onChange={setMemberPage}
						color={`dark`}
					/>
				</Center>
			</Grid.Col>
		</>
	);
}

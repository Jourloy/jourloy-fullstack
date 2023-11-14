import {Card, Grid, TextInput, Title, Center, Pagination} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import {useState} from "react";
import {store} from "../../../../store/store";
import {TSpend, IPlannedSpend} from "../../../../types";
import PlannedSpend from "./planned";

export default function PlannedList() {
	const [tracker, setTracker] = useState(store.getState().trackerReducer.tracker);
	store.subscribe(() => {
		const _tracker = store.getState().trackerReducer.tracker;
		if (tracker !== _tracker) setTracker(_tracker);
	});

	const [plannedPage, setPlannedPage] = useState(1);
	const [plannedSearch, setPlannedSearch] = useState(``);
	// TODO
	const [plannedCategory] = useState(``);

	const plannedSpendsArray = tracker.spends.filter(s => s.date != null).sort((s1, s2) => {
		return new Date(s1.date!).getTime() - new Date(s2.date!).getTime();
	});

	const plannedSpends: TSpend[] = [];
	if (plannedSearch === ``) {
		for (let i = (plannedPage - 1) * 6; i < plannedPage * 6; i++) {
			if (plannedSpendsArray[i]) plannedSpends.push(plannedSpendsArray[i]);
		}
	} else {
		const filtered = plannedSpendsArray.filter(m => {
			if (m.description && plannedSearch)
				return m.description.toLowerCase().includes(plannedSearch.toLowerCase());
			if (m.category && plannedCategory !== ``)
				return m.category.toLowerCase() === plannedCategory.toLowerCase();
			return false;
		});
		for (let i = (plannedPage - 1) * 6; i < plannedPage * 6; i++) {
			if (filtered[i]) plannedSpends.push(plannedSpendsArray[i]);
		}
	}

	const [plannedPages] = useState(Math.ceil(plannedSpends.length / 6));

	const getPlannedSpendsComponents = () => {
		return plannedSpends.map((s, i) => (
			<PlannedSpend
				key={s.id}
				length={plannedSpends.length}
				spend={s as IPlannedSpend}
				index={i}
			/>
		));
	};

	return (
		<Card p={0} bg={`transparent`} withBorder={false} radius={`xs`}>
			<Grid>
				<Grid.Col hidden={plannedSpends.length === 0 && plannedSearch === ``}>
					<TextInput
						icon={<IconSearch stroke={1.3} />}
						placeholder={`Описание`}
						value={plannedSearch}
						onChange={e => setPlannedSearch(e.target.value)}
					/>
				</Grid.Col>

				<Grid.Col hidden={plannedSpends.length > 0} mt={`35px`}>
					<Title align={`center`} c={`dimmed`} tt={`uppercase`} opacity={`20%`}>
						Нет запланированных расходов
					</Title>
				</Grid.Col>

				{getPlannedSpendsComponents()}

				<Grid.Col hidden={plannedSearch !== ``}>
					<Center>
						<Pagination total={plannedPages} value={plannedPage} onChange={setPlannedPage} />
					</Center>
				</Grid.Col>
			</Grid>
		</Card>
	);
}

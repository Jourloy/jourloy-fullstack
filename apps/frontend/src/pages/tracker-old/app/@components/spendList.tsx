import {Card, Grid, Title} from "@mantine/core";
import {useState} from "react";
import {store} from "../../../../store/store";
import {TSpend} from "../../../../types";
import HistorySpend from "./spend";
import SpendHistoryModal from "../@modals/spendHistory";

export default function SpendList() {
	const [tracker, setTracker] = useState(store.getState().trackerReducer.tracker);
	store.subscribe(() => {
		const _tracker = store.getState().trackerReducer.tracker;
		if (tracker !== _tracker) setTracker(_tracker);
	});

	const spendsArray = tracker.spends.filter(s => s.date == null).sort(() => -1);
	const spends: TSpend[] = [];
	for (let i = 0; i < 10; i++) {
		if (spendsArray[i]) spends.push(spendsArray[i]);
	}

	const calculateSpan = (i: number) => {
		if (spends.length === 1) {
			return 12;
		}
		if (spends.length - 1 === i && spends.length % 2 !== 0) {
			return 12;
		}
		return 6;
	};

	const getSpendsComponents = () => {
		return spends.map((s, i) => (
			<Grid.Col key={s.id} span={calculateSpan(i)}>
				<HistorySpend length={spends.length} spend={s} index={i} />
			</Grid.Col>
		));
	};

	return (
		<Card p={0} bg={`transparent`} withBorder={false} radius={`xs`}>
			<Grid>
				<Grid.Col hidden={spends.length > 0} mt={`25px`} mb={`15px`}>
					<Title align={`center`} c={`dimmed`} tt={`uppercase`} opacity={`20%`}>
						Нет ни трат, ни доходов
					</Title>
				</Grid.Col>

				{getSpendsComponents()}

				<Grid.Col>
					<SpendHistoryModal />
				</Grid.Col>
			</Grid>
		</Card>
	);
}

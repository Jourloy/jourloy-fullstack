import {Button, Center, Modal, Pagination, Stack, TextInput, Title} from "@mantine/core";
import {useState} from "react";
import {store} from "../../../../store/store";
import HistorySpend from "../@components/spend";
import {TSpend} from "../../../../types";
import {IconSearch} from "@tabler/icons-react";

export default function SpendHistoryModal() {
	const [tracker, setTracker] = useState(store.getState().trackerReducer.tracker);
	store.subscribe(() => {
		const _tracker = store.getState().trackerReducer.tracker;
		if (tracker !== _tracker) setTracker(_tracker);
	});

	const [modalShow, setModalShow] = useState(false);
	const [spendPage, setSpendPage] = useState(1);
	const [spendSearch, setSpendSearch] = useState(``);
	// TODO
	const [spendCategory] = useState(``);

	const getSpendsComponents = () => {
		return spends.map((s, i) => (
			<HistorySpend key={s.id} length={spends.length} spend={s} index={i} />
		));
	};

	const spendsArray = tracker.spends.filter(s => s.date == null).sort(() => -1);
	const spends: TSpend[] = [];
	if (spendSearch === ``) {
		for (let i = (spendPage - 1) * 6; i < spendPage * 6; i++) {
			if (spendsArray[i]) spends.push(spendsArray[i]);
		}
	} else {
		const filtered = spendsArray.filter(m => {
			if (m.description && spendSearch)
				return m.description.toLowerCase().includes(spendSearch.toLowerCase());
			if (m.category && spendCategory !== ``)
				return m.category.toLowerCase() === spendCategory.toLowerCase();
			return false;
		});
		for (let i = (spendPage - 1) * 6; i < spendPage * 6; i++) {
			if (filtered[i]) spends.push(spendsArray[i]);
		}
	}

	const [spendPages] = useState(Math.ceil(spendsArray.length / 6));

	const onClose = () => {
		setSpendSearch(``);
		setModalShow(false);
	};
	
	return (
		<>
			<Modal centered opened={modalShow} onClose={onClose}>
				<Stack>
					{(spends.length > 0 || spendSearch !== ``) && (
						<TextInput
							icon={<IconSearch stroke={1.3} />}
							placeholder={`Описание`}
							value={spendSearch}
							onChange={e => setSpendSearch(e.target.value)}
						/>
					)}
					{spends.length === 0 && (
						<Title align={`center`} c={`dimmed`} tt={`uppercase`} opacity={`20%`}>
							Нет ни трат, ни доходов
						</Title>
					)}
					{getSpendsComponents()}
					<Center>
						<Pagination
							siblings={1}
							total={spendPages}
							value={spendPage}
							onChange={setSpendPage}
						/>
					</Center>
				</Stack>
			</Modal>

			<Button variant={`outline`} fullWidth onClick={() => setModalShow(true)}>
				Все операции
			</Button>
		</>
	);
}

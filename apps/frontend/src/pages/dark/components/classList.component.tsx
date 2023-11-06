import {Grid} from "@mantine/core";
import {useEffect, useState} from "react";
import {TDarkClass} from "../../../types";
import {store} from "../../../store/store";
import Class from "./class.component";
import DarkAPI from "../api";

export default function ClassList() {
	const [classes, setClasses] = useState<TDarkClass[]>(store.getState().darkReducer.classes);
	store.subscribe(() => {
		const _classes = store.getState().darkReducer.classes;
		if (_classes !== classes) setClasses(_classes);
	});

	const classesArray = classes.filter(c => {
		if (c.enName === `Druid`) return false;
		return true;
	});

	const classesComponents = () => {
		return classesArray.map((c) => (
			<Grid.Col key={c.id} sm={6} xs={12} mt={`80px`}>
				<Class class={c} />
			</Grid.Col>
		));
	};

	useEffect(() => {
		const backend = new DarkAPI();

		const source = backend.getSource();
		backend.getAllClassesInStore(source.token);

		return () => {
			source.cancel();
		};
	}, []);

	return (
		<>
			{classesComponents()}
		</>
	);
}

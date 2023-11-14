import {Grid, TextInput} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {store} from "../../../store/store";
import {TDarkAttribute} from "../../../types";
import DarkAPI from "../api";
import Attribute from "./attribute.component";

export default function AttributeList() {
	const [attributes, setAttributes] = useState<TDarkAttribute[]>(
		store.getState().darkReducer.attributes
	);
	store.subscribe(() => {
		const _attributes = store.getState().darkReducer.attributes;
		if (_attributes !== attributes) setAttributes(_attributes);
	});

	const [search, setSearch] = useState(``);

	const attributesArray = attributes.filter(c => {
		const enName = c.enName.toLowerCase().includes(search.toLowerCase());
		const ruName = c.ruName.toLowerCase().includes(search.toLowerCase());

		if (search) {
			return enName || ruName;
		}

		return true;
	});

	const calculateSpan = (index: number) => {
		if (attributes.length === 1) {
			return 12;
		}
		if (attributes.length - 1 === index && attributes.length % 2 !== 0) {
			return 12;
		}
		return 6;
	};

	const attributeComponents = () => {
		return attributesArray.map((a, i) => (
			<Grid.Col key={a.id} span={calculateSpan(i)}>
				<Attribute attribute={a} />
			</Grid.Col>
		));
	};

	useEffect(() => {
		const backend = new DarkAPI();

		const source = backend.getSource();
		backend.getAllAttributesInStore(source.token);

		return () => {
			source.cancel();
		};
	}, []);

	return (
		<>
			<Grid.Col>
				<TextInput
					icon={<IconSearch stroke={1.3} />}
					placeholder={`Название`}
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			</Grid.Col>

			{attributeComponents()}
		</>
	);
}

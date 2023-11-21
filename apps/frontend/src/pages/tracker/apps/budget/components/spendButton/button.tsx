import {Button} from "@mantine/core";
import SpendModal from "./modal";
import { useState } from "react";

type TProps = {
	type: `income` | `spend` | `credit`;
	className?: string;
};

export default function SpendButton(props: TProps) {
	const [opened, setOpened] = useState(false);

	const typeLabel = {
		income: `Доход`,
		spend: `Расход`,
		credit: `Кредит`,
	};

	return (
		<>
			<SpendModal opened={opened} onClose={() => setOpened(false)} type={props.type}/>
			<Button className={props.className} color={`black`} onClick={() => setOpened(true)}>
				{typeLabel[props.type]}
			</Button>
		</>
	);
}

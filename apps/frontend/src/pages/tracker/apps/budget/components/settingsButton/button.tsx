import {Button} from "@mantine/core";
import SettingsModal from "./modal";
import {useState} from "react";

type TProps = {
	budgetId: number;
};

export default function SettingsButton(props: TProps) {
	const [opened, setOpened] = useState(false);

	return (
		<>
			<SettingsModal opened={opened} onClose={() => setOpened(false)} budgetId={props.budgetId} />
			<Button className={`mt-[15px]`} onClick={() => setOpened(true)} color={`black`} variant={`outline`}>
				Настройки
			</Button>
		</>
	);
}

import {Button} from "@mantine/core";

type TProps = {
	type: `add` | `remove`;
	className?: string;
};

export default function DaysButton(props: TProps) {
	const typeLabel = {
		add: `Добавить`,
		remove: `Убрать`,
	};

	return (
		<>
			<Button className={props.className} color={`black`} variant={`outline`}>
				{typeLabel[props.type]} день
			</Button>
		</>
	);
}

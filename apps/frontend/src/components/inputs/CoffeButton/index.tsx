import { Button } from "@mantine/core";
import { IconCup } from "@tabler/icons-react";

type TProps = {
	className?: string;
	target?: `general` | `budget` | `calendar` | `party`;
}

export default function CoffeButton(props: TProps) {
	const target = props.target || `general`;

	const targetURL = {
		general: `https://pay.cloudtips.ru/p/1d03fc9f`,
		budget: `https://pay.cloudtips.ru/p/6daac858`,
		calendar: `https://pay.cloudtips.ru/p/f0b71822`,
		party: `https://pay.cloudtips.ru/p/79bea9f2`,
	}

	return (
		<a className={props.className} href={targetURL[target]} target={`_blank`}>
			<Button
				fullWidth
				variant={`outline`}
				leftSection={<IconCup stroke={1.3} />}
				color={`indigo.9`}
			>
				Купи мне кофе
			</Button>
		</a>
	);
}

import {Button} from "@mantine/core";
import {IconCup} from "@tabler/icons-react";

export default function BuyCoffeButton() {
	return (
		<a href={`https://boosty.to/jourloy/donate`} style={{textDecoration: `none`}}>
			<Button fullWidth variant={`light`} leftIcon={<IconCup stroke={1.3} />}>
				Купи мне кофе
			</Button>
		</a>
	);
}

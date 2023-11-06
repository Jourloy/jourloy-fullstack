import {Card, UnstyledButton} from "@mantine/core";
import {TDarkAttribute} from "../../../types";

type TProps = {
	attribute: TDarkAttribute;
};

export default function Attribute(props: TProps) {
	return (
		<UnstyledButton w={`100%`}>
			<Card withBorder>{props.attribute.enName}</Card>
		</UnstyledButton>
	);
}

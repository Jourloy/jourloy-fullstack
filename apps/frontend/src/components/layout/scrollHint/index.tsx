import {motion} from "framer-motion";
import {IconMouse} from "@tabler/icons-react";
import {Flex, Text} from "@mantine/core";
import {useWindowScroll} from "@mantine/hooks";

type TProps = {
	pos?: number;
	label?: string;
};

export default function ScrollHint(props: TProps) {
	const [scroll] = useWindowScroll();
	const maxScroll = 800;

	return (
		<motion.div style={{opacity: 1 - scroll.y / maxScroll}}>
			<Flex>
				<IconMouse stroke={1} color={`rgb(115 115 115)`} />
				<Text color={`dimmed`}>{props.label ? props.label : `Скролл чтобы узнать больше`}</Text>
			</Flex>
		</motion.div>
	);
}

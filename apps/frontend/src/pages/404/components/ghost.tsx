import {IconGhost} from "@tabler/icons-react";
import {motion} from "framer-motion";
import * as _ from "lodash";

interface IProps {
	initialX?: number;
	initialY?: number;
}

export default function GhostComponent(props: IProps) {
	const getRandomMovement = () => {
		const x = [0];
		const steps = _.random(3, 6);

		for (let i = 0; i < steps; i++) {
			x.push(_.random(-20, 20));
		}

		x.push(0);

		return x;
	};

	return (
		<motion.div
			initial={{x: 0, y: 0}}
			animate={{x: getRandomMovement(), y: getRandomMovement()}}
			transition={{duration: 5, repeat: Infinity, ease: `easeInOut`}}
			{...props}
		>
			<IconGhost stroke={1.3} size={50} color={`lightgray`} />
		</motion.div>
	);
}

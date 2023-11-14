import {IconMouse} from "@tabler/icons-react";
import {motion, useScroll} from "framer-motion";
import {useEffect, useState} from "react";

interface IScrollHist {
	pos?: number;
	label?: string;
}

export default function ScrollHint(props: IScrollHist) {
	const {scrollYProgress} = useScroll();
	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		scrollYProgress.on(`change`, d => setScrollPosition(d));
	}, []);

	return (
		<motion.div style={{opacity: -(scrollPosition - (props.pos ? props.pos : 0.9))}}>
			<div className={`flex opacity-100`}>
				<IconMouse stroke={1} color={`rgb(115 115 115)`} className={`opacity-100`} />
				<p className={`text-neutral-500 opacity-100`}>
					{props.label ? props.label : `Скролл чтобы узнать больше`}
				</p>
			</div>
		</motion.div>
	);
}

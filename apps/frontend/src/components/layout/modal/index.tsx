"use client";

import {useRef, useEffect, PropsWithChildren, useState} from "react";
import {motion} from "framer-motion";
import {IconX} from "@tabler/icons-react";
import Card from "../card";

interface IModal {
	hidden: boolean;
	toggle: () => void;
	className?: string;
}

export default function Modal(props: PropsWithChildren<IModal>) {
	const [variant, setVariant] = useState(`hidden`);

	const overlay = useRef<HTMLDivElement>(null);
	const wrapper = useRef(null);

	const onMouseEnter = () => {
		const cursor = document.getElementsByClassName(`cursor`)[0];
		cursor?.classList.remove(`cursor-default`);
		cursor?.classList.add(`cursor-hover`);
	};

	const onMouseLeave = () => {
		const cursor = document.getElementsByClassName(`cursor`)[0];
		cursor?.classList.remove(`cursor-hover`);
		cursor?.classList.add(`cursor-default`);
	};

	const variants = {
		hidden: {opacity: 0},
		show: {opacity: 1},
	};

	useEffect(() => {
		if (!props.hidden) setVariant(`show`);
	}, [props.hidden]);

	return (
		<motion.div
			variants={variants}
			hidden={props.hidden}
			initial={`hidden`}
			animate={variant}
			ref={overlay}
			className={`fixed z-[99] left-0 right-0 top-0 bottom-0 mx-auto bg-black/60 backdrop-blur-sm`}
			transition={{
				ease: `easeInOut`,
				duration: 0.5,
			}}
		>
			<div
				ref={wrapper}
				className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 
				lg:w-1/2 p-6`}
			>
				<Card className={`grid grid-cols-1 w-[100%]`}>
					<IconX
						className={`absolute right-[50px]`}
						onClick={() => {
							setVariant(`hidden`);
							setTimeout(() => props.toggle(), 500);
						}}
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
					/>
					{props.children}
				</Card>
			</div>
		</motion.div>
	);
}

"use client";

import {PropsWithChildren} from "react";
import {
	motion,
	useScroll,
	useSpring,
	useTransform,
	useMotionValue,
	useVelocity,
	useAnimationFrame,
} from "framer-motion";
import {useRef} from "react";
import {wrap} from "@motionone/utils";
import "./index.css";

interface ParallaxProps {
	baseVelocity?: number;
	baseX?: number;
	parallaxClassName?: string;
	scrollerClassName?: string;
	direction?: 1 | -1;
}

export default function Parallax(props: PropsWithChildren<ParallaxProps>) {
	let parallaxClassName = `parallax`;
	let scrollerClassName = `scroller`;

	const baseVelocity = props.baseVelocity ? props.baseVelocity : 100;

	const baseX = useMotionValue(props.baseX ? props.baseX : 0);
	const {scrollY} = useScroll();
	const scrollVelocity = useVelocity(scrollY);
	const smoothVelocity = useSpring(scrollVelocity, {
		damping: 50,
		stiffness: 400,
	});
	const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
		clamp: false,
	});

	/**
	 * This is a magic wrapping for the length of the text - you
	 * have to replace for wrapping that works for you or dynamically
	 * calculate
	 */
	const x = useTransform(baseX, v => `${wrap(-20, -45, v)}%`);

	const directionFactor = useRef<number>(1);
	useAnimationFrame((t, delta) => {
		let moveBy = baseVelocity * (delta / 1000);

		if (!props.direction || props.direction === 1) {
			if (moveBy < 0) moveBy *= -1;
		} else {
			if (moveBy > 0) moveBy *= -1;
		}

		baseX.set(baseX.get() + moveBy);
	});

	if (props.parallaxClassName) parallaxClassName += ` ${props.parallaxClassName}`;
	if (props.scrollerClassName) scrollerClassName += ` ${props.scrollerClassName}`;

	return (
		<div className={parallaxClassName}>
			<motion.div className={scrollerClassName} style={{x}}>
				{props.children}
			</motion.div>
		</div>
	);
}

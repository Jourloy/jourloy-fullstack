"use client";

import {useState} from "react";
import {IconRocket} from "@tabler/icons-react";
import {motion} from "framer-motion";
import FeaturesModal from "@/app/keyboard-old/featuresModal";
import Card from "@/components/layout/card";

interface IFrameworkFeatures {
	className?: string;
}

export default function FrameworkFeatures(props: IFrameworkFeatures) {
	const [selected, setSelected] = useState(0);
	const [hidden, setHidden] = useState(true);

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

	return (
		<>
			<FeaturesModal hidden={hidden} toggle={() => setHidden(!hidden)} selected={selected}>
				<p>d</p>
			</FeaturesModal>
			<motion.div
				initial={{opacity: 0}}
				whileInView={{opacity: 1}}
				transition={{duration: 1}}
				viewport={{amount: 0.9}}
				className={`col-span-3 mt-[150px] mb-[-45px]`}
			>
				<div className={`opacity-100 w-[100%] flex place-items-center`}>
					<p className={`text-neutral-500 opacity-100`}>Кликай на карточку для информации</p>
				</div>
			</motion.div>
			<motion.div
				initial={{opacity: 0}}
				whileInView={{opacity: 1}}
				transition={{duration: 1}}
				className={`col-span-3 w-[100%]`}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onClick={() => {
					setHidden(false);
					setSelected(0);
				}}
			>
				<Card variant={`outline`} className={`flex justify-center place-items-center`}>
					<IconRocket stroke={1} className={`stroke-indigo-500`} />
					<h1 className={`text-[30px] text-center mx-[10px]`}>Запуск, 3, 2, 1!</h1>
					<IconRocket stroke={1} className={`rotate-[270deg] stroke-indigo-500 z-50`} />
				</Card>
			</motion.div>

			<motion.div
				initial={{opacity: 0}}
				whileInView={{opacity: 1}}
				transition={{duration: 1}}
				className={`w-[100%]`}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onClick={() => {
					setHidden(false);
					setSelected(1);
				}}
			>
				<Card variant={`outline`} className={`grid grid-cols-1 place-items-center`}>
					<h1 className={`text-[30px] text-center`}>Все при себе</h1>
				</Card>
			</motion.div>

			<motion.div
				initial={{opacity: 0}}
				whileInView={{opacity: 1}}
				transition={{duration: 2}}
				className={`w-[100%]`}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onClick={() => {
					setHidden(false);
					setSelected(2);
				}}
			>
				<Card variant={`outline`} className={`grid grid-cols-1 place-items-center`}>
					<h1 className={`text-[30px] text-center`}>Компактность</h1>
				</Card>
			</motion.div>

			<motion.div
				initial={{opacity: 0}}
				whileInView={{opacity: 1}}
				transition={{duration: 2}}
				className={`w-[100%]`}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onClick={() => {
					setHidden(false);
					setSelected(3);
				}}
			>
				<Card variant={`outline`} className={`grid grid-cols-1 place-items-center`}>
					<h1 className={`text-[30px] text-center`}>Механика</h1>
				</Card>
			</motion.div>

			<motion.div
				initial={{opacity: 0}}
				whileInView={{opacity: 1}}
				transition={{duration: 2}}
				className={`w-[100%]`}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onClick={() => {
					setHidden(false);
					setSelected(4);
				}}
			>
				<Card variant={`outline`} className={`grid grid-cols-1 place-items-center`}>
					<h1 className={`text-[30px] text-center`}>Удобство</h1>
				</Card>
			</motion.div>
			<motion.div
				initial={{opacity: 0}}
				whileInView={{opacity: 1}}
				transition={{duration: 2}}
				className={`col-span-2 w-[100%]`}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onClick={() => {
					setHidden(false);
					setSelected(5);
				}}
			>
				<Card variant={`outline`} className={`grid grid-cols-1 place-items-center`}>
					<h1 className={`text-[30px] text-center`}>Подходит каждому</h1>
				</Card>
			</motion.div>

			<motion.div
				initial={{opacity: 0}}
				whileInView={{opacity: 1}}
				transition={{duration: 2}}
				className={`col-span-3 w-[100%]`}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onClick={() => {
					setHidden(false);
					setSelected(6);
				}}
			>
				<Card variant={`outline`} className={`grid grid-cols-1 place-items-center`}>
					<h1 className={`text-[30px] text-center`}>Полный комплект</h1>
				</Card>
			</motion.div>
		</>
	);
}

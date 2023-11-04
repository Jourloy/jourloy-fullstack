"use client";

import {motion} from "framer-motion";
import {
	IconBrandDiscordFilled,
	IconBrandGithub,
	IconBrandTypescript,
	IconBrandXbox,
	IconDeviceGamepad2,
	IconDeviceImac,
	IconGitFork,
	IconKeyboard,
	IconMouse2,
} from "@tabler/icons-react";
import Card from "@/components/layout/card";

export default function CategoryCards() {
	return (
		<>
			<motion.div
				initial={{opacity: 0}}
				whileInView={{opacity: 1}}
				transition={{duration: 2}}
				className={`w-[100%] col-span-2`}
			>
				<Card variant={`outline`} className={`grid grid-cols-1 place-items-center gap-4`}>
					<h1 className={`text-center text-[40px]`}>Киберспорт</h1>
					<div className={`grid grid-cols-1 gap-0`}>
						<p className={`text-center`}>
							Частота опроса клавиатуры - 1мс. Далеко не все кастомные клавиатуры позволяют достичь такого
							значения
						</p>
						<p className={`text-center`}>
							Также стоит отметить, что все клавиши, которые ты зажмешь в один момент, они все будут
							обработаны
						</p>
					</div>
				</Card>
			</motion.div>

			<div className={`w-[100%] flex justify-center`}>
				<motion.div
					transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
					initial={{y: 0, x: 0}}
					animate={{y: [0, 15, 0], x: [0, 10, 0]}}
				>
					<IconBrandDiscordFilled size={40} className={`rotate-[-25deg]`} />
				</motion.div>
				<motion.div
					initial={{y: 0}}
					animate={{y: [0, 10, 0]}}
					transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
				>
					<IconDeviceGamepad2 size={100} stroke={1} className={`rotate-[5deg] stroke-indigo-500`} />
				</motion.div>
				<motion.div
					transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
					initial={{y: 80, x: 0}}
					animate={{y: [80, 15, 80], x: [0, 10, 0, 10, 0]}}
				>
					<IconBrandXbox size={25} />
				</motion.div>
			</div>

			<div className={`w-[100%] flex justify-center`}>
				<motion.div
					transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
					initial={{y: 80, x: 150}}
					animate={{y: [80, 40, 80], x: [150, 140, 150]}}
				>
					<IconMouse2 size={40} stroke={1} className={`rotate-[15deg]`} />
				</motion.div>
				<motion.div
					initial={{y: 0}}
					animate={{y: [0, 10, 0]}}
					transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
				>
					<IconDeviceImac size={100} stroke={1} className={`rotate-[-5deg] stroke-indigo-500`} />
				</motion.div>
				<motion.div
					transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
					initial={{y: 100, x: -30}}
					animate={{y: [100, 120, 100], x: [-30, -70, -30]}}
				>
					<IconKeyboard size={25} />
				</motion.div>
			</div>

			<motion.div
				initial={{opacity: 0}}
				whileInView={{opacity: 1}}
				transition={{duration: 2}}
				className={`col-span-2`}
			>
				<div>
					<Card variant={`outline`} className={`grid grid-cols-1 place-items-center gap-4`}>
						<h1 className={`text-center text-[40px]`}>Офисы</h1>
						<div className={`grid grid-cols-1 gap-0`}>
							<p className={`text-center`}>
								Если ты или твои сотрудники часто работают в Excel или подобных приложениях, то
								значительно облегчить работу помогут макросы - наборы действий, которые пользователь
								может настроить сам
							</p>
						</div>
					</Card>
				</div>
			</motion.div>

			<motion.div
				initial={{opacity: 0}}
				whileInView={{opacity: 1}}
				transition={{duration: 2}}
				className={`w-[100%] col-span-2`}
			>
				<Card variant={`outline`} className={`grid grid-cols-1 place-items-center gap-4`}>
					<h1 className={`text-center text-[40px]`}>Разработчики</h1>
					<div className={`grid grid-cols-1 gap-0`}>
						<p className={`text-center`}>
							Благодаря наличию слоев, ты можешь назначить все необходимые символы и сочетания рядом, как
							тебе удобно. Это позволяет не только ускорить свою работу, но и снижает нагрузку на пальцы.
						</p>
					</div>
				</Card>
			</motion.div>

			<div className={`w-[100%] flex justify-center`}>
				<motion.div
					transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
					initial={{y: 80, x: 0}}
					animate={{y: [80, 15, 80], x: [0, -10, 0, -10, 0]}}
				>
					<IconBrandTypescript size={40} className={`rotate-[25deg]`} stroke={1} />
				</motion.div>
				<motion.div
					initial={{y: 0}}
					animate={{y: [0, 10, 0]}}
					transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
				>
					<IconBrandGithub size={100} stroke={1} className={`stroke-indigo-500`} />
				</motion.div>
				<motion.div
					transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
					initial={{y: 30, x: 0}}
					animate={{y: [30, 60, 30], x: [0, 10, 0, 10, 0]}}
				>
					<IconGitFork size={25} />
				</motion.div>
			</div>
		</>
	);
}

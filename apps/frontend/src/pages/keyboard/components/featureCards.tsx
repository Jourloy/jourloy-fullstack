import {IconBriefcase, IconCode, IconDeviceGamepad2} from "@tabler/icons-react";
import {motion} from "framer-motion";
import CustomCard from "../../../components/layout/CustomCard";
import {Divider} from "@mantine/core";

const data = [
	{
		title: `Киберспорт`,
		text: `Частота опроса клавиатуры составляет 1 мс, не все кастомные клавиатуры способны достичь такой скорости. Важно также отметить, что все нажатые клавиши в один момент времени будут надежно обработаны`,
		icon: IconDeviceGamepad2,
		color: `border-red-500/30 hover:border-red-500/50 bg-red-500/5 hover:shadow-md hover:shadow-red-500/70`,
	},
	{
		title: `Офисы`,
		text: `Если ты или твои сотрудники часто работают в Excel или подобных приложениях, то значительно облегчить работу помогут макросы - наборы действий, которые пользователь может настроить сам`,
		icon: IconBriefcase,
		color: `border-green-500/30 hover:border-green-500/50 bg-green-500/5 hover:shadow-md hover:shadow-green-500/70`,
	},
	{
		title: `Разработчики`,
		text: `Благодаря наличию слоев, ты можешь назначить все необходимые символы и сочетания рядом, как тебе удобно. Это позволяет не только ускорить свою работу, но и снижает нагрузку на пальцы`,
		icon: IconCode,
		color: `border-purple-500/30 hover:border-purple-500/50 bg-purple-500/5 hover:shadow-md hover:shadow-purple-500/70`,
	},
];

export default function FeatureCards() {
	const features = data.map(item => (
		<motion.div
			key={item.title}
			initial={{opacity: 0}}
			whileInView={{opacity: 1}}
			transition={{duration: 3}}
			className={`h-full`}
		>
			<CustomCard
				className={`flex flex-col min-[875px]:max-w-[270px] space-y-5 h-full items-start transition-all duration-300`}
				color={item.color}
			>
				<item.icon size={33} stroke={1.3} color={`white`} className={`mt-[5px] mb-[-5px]`} />
				<h2 className={`text-[25px] text-white`}>{item.title}</h2>
				<Divider w={`100%`} />
				<p className={`text-white`}>{item.text}</p>
			</CustomCard>
		</motion.div>
	));

	return <>{features}</>;
}

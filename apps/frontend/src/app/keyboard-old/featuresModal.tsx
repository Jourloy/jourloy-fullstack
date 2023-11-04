import {motion} from "framer-motion";
import {
	IconBrandApple,
	IconBrandSpeedtest,
	IconBrandWindows,
	IconCodeOff,
	IconPackage,
	IconRocket,
	IconSettings2,
	IconWeight,
} from "@tabler/icons-react";
import {PropsWithChildren} from "react";
import Modal from "@/components/layout/modal";

interface IModal {
	hidden: boolean;
	toggle: () => void;
	selected: number;
	className?: string;
}

const data = [
	<>
		<div className={`grid grid-cols-1 gap-4 place-items-center w-[100%]`}>
			<div className={`w-[100%]`}>
				<motion.div
					className={`absolute left-[100px] top-[70px]`}
					initial={{y: 0}}
					animate={{y: [0, -15, 0]}}
					transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
				>
					<IconRocket className={` rotate-[300deg]`} />
				</motion.div>
				<h1 className={`text-center text-[30px]`}>Запуск, 3, 2, 1!</h1>
			</div>
			<p className={`text-center`}>
				Неважно где ты, использовать клавиатуру всегда легко, достаточно просто вставить провод. Все ее
				настройки перемещаются вместе с ней, а ее компактный дизайн позволяет использоваться клавиатуру даже без
				стола. В качестве подставки можно использовать коленки или клавиатуру ноутбука
			</p>
			<motion.div
				className={`absolute right-[70px] bottom-[40px]`}
				initial={{y: 0}}
				animate={{y: [0, 10, 0]}}
				transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
			>
				<IconRocket className={`rotate-[320deg]`} />
			</motion.div>
		</div>
	</>,

	<>
		<div className={`grid grid-cols-1 gap-4 place-items-center w-[100%]`}>
			<div className={`w-[100%]`}>
				<motion.div
					className={`absolute left-[100px] top-[60px]`}
					initial={{y: 0}}
					animate={{y: [0, -15, 0]}}
					transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
				>
					<IconCodeOff className={` rotate-[20deg]`} />
				</motion.div>
				<h1 className={`text-center text-[30px]`}>Все при себе</h1>
			</div>
			<p className={`text-center`}>
				Благодаря слоям, все, что ты используешь, точно вместится на клавиатуру. Мы постарались сделать удобную
				раскладку за которой и сами работаем, но ты всегда можешь изменить ее. Для этого не нужно уметь
				программировать, все делается в простой программе
			</p>
			<motion.div
				className={`absolute right-[70px] bottom-[30px]`}
				initial={{y: 0}}
				animate={{y: [0, 5, 0]}}
				transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
			>
				<IconCodeOff className={`rotate-[-10deg]`} />
			</motion.div>
		</div>
	</>,

	<>
		<div className={`grid grid-cols-1 gap-4 place-items-center w-[100%]`}>
			<div className={`w-[100%]`}>
				<motion.div
					className={`absolute left-[100px] top-[60px]`}
					initial={{y: 0}}
					animate={{y: [0, -15, 0]}}
					transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
				>
					<IconWeight className={` rotate-[20deg]`} />
				</motion.div>
				<h1 className={`text-center text-[30px]`}>Компактность</h1>
			</div>
			<p className={`text-center`}>
				С такой клавиатурой не придется искать место ни на столе, ни у себя в сумке или рюкзаке. А весит она
				совсем не много, можно брать с собой на работу, в путешествие или в кафе
			</p>
			<motion.div
				className={`absolute right-[70px] bottom-[30px]`}
				initial={{y: 0}}
				animate={{y: [0, 5, 0]}}
				transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
			>
				<IconWeight className={`rotate-[-10deg]`} />
			</motion.div>
		</div>
	</>,

	<>
		<div className={`grid grid-cols-1 gap-4 place-items-center w-[100%]`}>
			<div className={`w-[100%]`}>
				<motion.div
					className={`absolute left-[100px] top-[60px]`}
					initial={{y: 0}}
					animate={{y: [0, -15, 0]}}
					transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
				>
					<IconSettings2 className={` rotate-[20deg]`} />
				</motion.div>
				<h1 className={`text-center text-[30px]`}>Механика</h1>
			</div>
			<p className={`text-center`}>
				Все клавиши - механические. Поэтому приятный отклик и звук присутствует. При желании заменить клавишу не
				нужно ничего паять, можешь просто достать свитч и вставить новый. А клавиши еще проще, их можно легко
				достать даже рукой
			</p>
			<motion.div
				className={`absolute right-[70px] bottom-[30px]`}
				initial={{y: 0}}
				animate={{y: [0, 5, 0]}}
				transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
			>
				<IconSettings2 className={`rotate-[-10deg]`} />
			</motion.div>
		</div>
	</>,

	<>
		<div className={`grid grid-cols-1 gap-4 place-items-center w-[100%]`}>
			<div className={`w-[100%]`}>
				<motion.div
					className={`absolute left-[100px] top-[60px]`}
					initial={{y: 0}}
					animate={{y: [0, -15, 0]}}
					transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
				>
					<IconBrandSpeedtest className={` rotate-[20deg]`} />
				</motion.div>
				<h1 className={`text-center text-[30px]`}>Удобство</h1>
			</div>
			<p className={`text-center`}>
				Ортогональное расположение клавиш помогает ускорить печать засчет того, что пальцам нужно преодолевать
				меньшее расстояние между клавишами. А для тех, кто любит печатать вслепую в комплекте лежат две
				маленькие капельки
			</p>
			<motion.div
				className={`absolute right-[70px] bottom-[30px]`}
				initial={{y: 0}}
				animate={{y: [0, 5, 0]}}
				transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
			>
				<IconBrandSpeedtest className={`rotate-[-10deg]`} />
			</motion.div>
		</div>
	</>,

	<>
		<div className={`grid grid-cols-1 gap-4 place-items-center w-[100%]`}>
			<div className={`w-[100%]`}>
				<motion.div
					className={`absolute left-[100px] top-[60px]`}
					initial={{y: 0}}
					animate={{y: [0, -15, 0]}}
					transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
				>
					<IconBrandApple className={` rotate-[20deg]`} />
				</motion.div>
				<h1 className={`text-center text-[30px]`}>Подходит каждому</h1>
			</div>
			<p className={`text-center`}>
				Не важно какой операционной системой ты пользуешься, клавиатура везде работает одинаково. Если есть
				предпочтения в маркировке раскладки на клавишах, то мы подготовили такие клавиши для MacOS и Windows, а
				если ты пользуешься Linux или постоянно меняешь ОС, то у нас есть универсальная раскладка. Ну а для тех,
				кто любит минимализм, мы готовы оставить клавиши абсолютно пустые
			</p>
			<motion.div
				className={`absolute right-[70px] bottom-[30px]`}
				initial={{y: 0}}
				animate={{y: [0, 5, 0]}}
				transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
			>
				<IconBrandWindows className={`rotate-[-10deg]`} />
			</motion.div>
		</div>
	</>,

	<>
		<div className={`grid grid-cols-1 gap-4 place-items-center w-[100%]`}>
			<div className={`w-[100%]`}>
				<motion.div
					className={`absolute left-[100px] top-[60px]`}
					initial={{y: 0}}
					animate={{y: [0, -15, 0]}}
					transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
				>
					<IconPackage className={` rotate-[20deg]`} />
				</motion.div>
				<h1 className={`text-center text-[30px]`}>Полный комплект</h1>
			</div>
			<p className={`text-center`}>
				Мы уважаем твое время, а поэтому уже собрали в коробку все, что может тебе пригодиться. Там и капельки
				для слепой печати, и запасные капельки для того, чтобы не скользило по столу, и кейкап пуллер, чтобы
				клавиши легче менять было, и еще много всего. А также мы не забыли про подарок, ведь все любят подарки,
				да?
			</p>
			<motion.div
				className={`absolute right-[70px] bottom-[30px]`}
				initial={{y: 0}}
				animate={{y: [0, 5, 0]}}
				transition={{repeat: Infinity, duration: 5, ease: "easeInOut"}}
			>
				<IconPackage className={`rotate-[-10deg]`} />
			</motion.div>
		</div>
	</>,
];

export default function FeaturesModal(props: PropsWithChildren<IModal>) {
	return (
		<>
			<Modal hidden={props.hidden} toggle={props.toggle}>
				{data[props.selected]}
			</Modal>
		</>
	);
}

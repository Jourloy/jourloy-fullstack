import Section from "../../components/layout/Section";
import {Button, Divider, Image} from "@mantine/core";
import KeyboardImage from "./assets/FrameworkPreview.png";
import KeycapsDropping from "./assets/KeycapsDropping.png";
import Parallax from "../../components/layout/Parallax";
import ScrollHint from "../../components/layout/ScrollHint";
import CustomCard from "../../components/layout/CustomCard";
import FeatureCards from "./components/featureCards";
import {motion} from "framer-motion";
import {IconUser} from "@tabler/icons-react";
import BuyButton from "./components/buy";

export default function KeyboardIndex() {
	return (
		<main>
			<Section className={`flex flex-col justify-center items-center min-h-[1000px] bg-black`}>
				<div className={`max-w-[850px] w-full flex justify-center items-center p-5`}>
					<Image
						src={KeyboardImage}
						width={1000}
						height={1000}
						alt={`Picture of the keyboard`}
					/>
				</div>
				<h2 className={`text-center mt-[100px] uppercase text-[40px] text-white`}>
					Самая удобная клавиатура
				</h2>
				<div
					className={`text-center uppercase text-[64px] md:text-[120px] lg:text-[138px] w-full`}
				>
					<Parallax
						baseVelocity={0.5}
						direction={-1}
						parallaxClassName={`text-darkPrimaryColor`}
					>
						<span>
							<h1 className={`mx-[30px] text-red-500`}>FRAMEWORK</h1>
						</span>
						<span>
							<h1 className={`mx-[30px] mt-[-10px] text-white`}>•</h1>
						</span>
						<span>
							<h1 className={`mx-[30px] text-orange-500`}>FRAMEWORK</h1>
						</span>
						<span>
							<h1 className={`mx-[30px] mt-[-10px] text-white`}>•</h1>
						</span>
						<span>
							<h1 className={`mx-[30px] text-amber-500`}>FRAMEWORK</h1>
						</span>
						<span>
							<h1 className={`mx-[30px] mt-[-10px] text-white`}>•</h1>
						</span>
					</Parallax>
				</div>
				<div className={`absolute flex justify-center top-[calc(97dvh)]`}>
					<ScrollHint pos={0.5} />
				</div>
				<div className={`p-5 w-full flex flex-col items-center justify-center`}>
					<BuyButton
						className={`max-w-[850px] mt-[40px]`}
						w={`100%`}
						size={`md`}
						variant={`white`}
						color={`black`}
					>
						<p className={`w-full text-center text-[20px] font-semibold`}>Купить</p>
					</BuyButton>
				</div>
			</Section>

			<Section
				image={KeycapsDropping}
				className={`flex flex-col justify-center items-center space-y-[10px] p-5 snap-center text-black bg-white min-h-[1000px]`}
			>
				<CustomCard
					className={`flex flex-col justify-center items-center space-y-[10px] max-w-[850px] max-h-[500px]`}
					variant={`glass`}
					withBorder
				>
					<div className={`flex justify-center max-w-[650px] w-full`}>
						<Button
							className={`mb-[25px] rotate-[-1deg]`}
							color={`#8cd988`}
							size={`compact-xl`}
						>
							Всегда готова к работе
						</Button>
					</div>
					<div className={`flex justify-between max-w-[650px] w-full`}>
						<Button
							className={`mb-[25px] rotate-[-15deg]`}
							color={`#8cd988`}
							size={`compact-xl`}
						>
							59 клавиш
						</Button>
						<Button
							className={`mb-[25px] rotate-[2deg]`}
							color={`#8cd988`}
							size={`compact-xl`}
						>
							Все при себе
						</Button>
						<Button
							className={`mt-[20px] mb-[5px] rotate-[5deg]`}
							color={`#8cd988`}
							size={`compact-xl`}
						>
							1 энкодер
						</Button>
					</div>
					<h2 className={`uppercase text-[55px] text-darkPrimaryColor text-center`}>
						Это все, что {` `}
						<span className={`bg-darkPrimaryColor px-[10px] rounded-md`}>
							<span className={`text-white`}>тебе</span>
						</span>
						{` `} нужно
					</h2>
					<div className={`flex justify-between max-w-[650px] w-full`}>
						<Button
							className={`mb-[25px] mt-[10px] rotate-[9deg]`}
							color={`#8cd988`}
							size={`compact-xl`}
						>
							Программируемость
						</Button>
						<Button
							className={`mb-[20px] mt-[15px] rotate-[-2deg]`}
							color={`#8cd988`}
							size={`compact-xl`}
						>
							Механика
						</Button>
						<Button
							className={`mt-[30px] rotate-[-10deg]`}
							color={`#8cd988`}
							size={`compact-xl`}
						>
							Компактность
						</Button>
					</div>
					<div className={`flex justify-center max-w-[650px] w-full`}>
						<Button
							className={`mb-[25px] mt-[10px] rotate-[1deg]`}
							color={`#8cd988`}
							size={`compact-xl`}
						>
							Выглядит круто
						</Button>
					</div>
				</CustomCard>
			</Section>
			<Section
				className={`flex flex-col justify-center items-center space-y-5 min-h-[1000px] p-5 bg-black`}
			>
				<h1 className={`text-center uppercase text-[40px] text-white`}>Помогаем всем сферам</h1>
				<div
					className={`flex max-w-[850px] w-full justify-between items-center space-y-5 min-[875px]:space-y-0 h-max flex-col min-[875px]:flex-row`}
				>
					<FeatureCards />
				</div>
				<motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 3}}>
					<CustomCard
						className={`flex flex-col max-w-[850px] w-full space-y-5 items-start transition-all duration-300`}
						color={`border-cyan-500/40 bg-cyan-500/5 hover:shadow-lg hover:shadow-cyan-500/70`}
					>
						<IconUser
							size={33}
							stroke={1.3}
							color={`white`}
							className={`mt-[5px] mb-[-5px]`}
						/>
						<h2 className={`text-[25px] text-white`}>Просто пользователь</h2>
						<Divider w={`100%`} />
						<p className={`text-white`}>
							Если ты хочешь клавиатуру для того, чтобы просто буднично что-то на ней
							печатать, то это твой выбор. Приятный отклик и звук скрасят любой набираемый
							текст.
						</p>
					</CustomCard>
				</motion.div>
				<BuyButton
					className={`max-w-[850px]`}
					fullWidth
					variant={`white`}
					color={`black`}
					size={`md`}
				>
					<p className={`w-full text-center text-[15px] font-semibold`}>
						Мне нужна такая клавиатура
					</p>
				</BuyButton>
			</Section>
		</main>
	);
}

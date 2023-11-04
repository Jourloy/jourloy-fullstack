import KeyboardImage from "./assets/FrameworkPreview.png";
import Image from "next/image";
import Section from "@/components/layout/section";
import Parallax from "@/components/layout/parallax";
import ScrollHint from "@/components/layout/scrollHint";
import Badge from "@/components/layout/badge";
import Button from "@/components/actions/button";
import Card from "@/components/layout/card";
import Divider from "@/components/layout/divider";
import {MantineProvider} from "@mantine/core";

export default function KeyboardPage() {
	return (
		<main>
			<Section className={`flex flex-col justify-center items-center`}>
				<div className={`max-w-[850px] w-full flex justify-center items-center`}>
					<Image src={KeyboardImage} width={1000} height={1000} alt={`Picture of the keyboard`} />
				</div>
				<p className={`text-center mt-[100px] uppercase text-[40px]`}>Самая удобная клавиатура</p>
				<div className={`text-center uppercase text-[64px] md:text-[120px] lg:text-[138px] w-full`}>
					<Parallax baseVelocity={0.5} direction={-1} parallaxClassName={`text-darkPrimaryColor`}>
						<span>
							<h1 className={`mx-[30px]`}>FRAMEWORK</h1>
						</span>
						<span>
							<h1 className={`mx-[30px] mt-[-10px]`}>•</h1>
						</span>
						<span>
							<h1 className={`mx-[30px]`}>FRAMEWORK</h1>
						</span>
						<span>
							<h1 className={`mx-[30px] mt-[-10px]`}>•</h1>
						</span>
						<span>
							<h1 className={`mx-[30px]`}>FRAMEWORK</h1>
						</span>
						<span>
							<h1 className={`mx-[30px] mt-[-10px]`}>•</h1>
						</span>
						<span>
							<h1 className={`mx-[30px]`}>FRAMEWORK</h1>
						</span>
						<span>
							<h1 className={`mx-[30px] mt-[-10px]`}>•</h1>
						</span>
					</Parallax>
				</div>
				<div className={`absolute flex justify-center top-[calc(97dvh)]`}>
					<ScrollHint pos={0.5} />
				</div>
				<Button className={`max-w-[850px] mt-[40px]`} w={`100%`}>
					<p className={`w-full text-center text-[20px] font-semibold`}>Купить</p>
				</Button>
				<p className={`mt-[5px]`}>10.000 рублей</p>
			</Section>

			<Section
				image={`./KeycapsDropping.png`}
				className={`flex flex-col justify-center items-center space-y-[10px] p-2 snap-center text-black bg-white`}
			>
				<Card
					className={`flex flex-col justify-center items-center space-y-[10px] max-w-[850px] max-h-[500px]`}
					variant={`glass`}
					withBorder
				>
					<div className={`flex justify-center max-w-[650px] w-full`}>
						<Button className={`mb-[25px] rotate-[-1deg]`} color={`#8cd988`} size={`compact-xl`}>
							Всегда готова к работе
						</Button>
					</div>
					<div className={`flex justify-between max-w-[650px] w-full`}>
						<Button className={`mb-[25px] rotate-[-15deg]`} color={`#8cd988`} size={`compact-xl`}>
							59 клавиш
						</Button>
						<Button className={`mb-[25px] rotate-[2deg]`} color={`#8cd988`} size={`compact-xl`}>
							Все при себе
						</Button>
						<Button className={`mt-[20px] mb-[5px] rotate-[5deg]`} color={`#8cd988`} size={`compact-xl`}>
							1 энкодер
						</Button>
					</div>
					<h2 className={`uppercase text-[55px] text-darkPrimaryColor`}>
						Это все, что {` `}
						<span className={`bg-darkPrimaryColor px-[10px] rounded-md`}>
							<span className={`text-white`}>тебе</span>
						</span>
						{` `} нужно
					</h2>
					<div className={`flex justify-between max-w-[650px] w-full`}>
						<Button className={`mb-[25px] mt-[10px] rotate-[9deg]`} color={`#8cd988`} size={`compact-xl`}>
							Программируемость
						</Button>
						<Button className={`mb-[20px] mt-[15px] rotate-[-2deg]`} color={`#8cd988`} size={`compact-xl`}>
							Механика
						</Button>
						<Button className={`mt-[30px] rotate-[-10deg]`} color={`#8cd988`} size={`compact-xl`}>
							Компактность
						</Button>
					</div>
					<div className={`flex justify-center max-w-[650px] w-full`}>
						<Button className={`mb-[25px] mt-[10px] rotate-[1deg]`} color={`#8cd988`} size={`compact-xl`}>
							Выглядит круто
						</Button>
					</div>
				</Card>
			</Section>
			<Section className={`flex flex-col justify-center items-center space-y-10`}>
				<h1 className={`text-center uppercase text-[40px]`}>Помогаем всем сферам</h1>
				<div className={`flex max-w-[850px] w-full justify-between items-center h-max`}>
					<Card className={`flex flex-col max-w-[250px] space-y-5 h-full items-start`} color={`primary`}>
						<h2 className={`text-[25px]`}>Киберспорт</h2>
						<Divider />
						<p>
							Частота опроса клавиатуры составляет 1 мс, не все кастомные клавиатуры способны достичь
							такой скорости. Важно также отметить, что все нажатые клавиши в один момент времени будут
							надежно обработаны.
						</p>
					</Card>
					<Card className={`flex flex-col max-w-[250px] space-y-5 h-full  items-start`} color={`primary`}>
						<h2 className={`text-[25px]`}>Офисы</h2>
						<Divider />
						<p>
							Если ты или твои сотрудники часто работают в Excel или подобных приложениях, то значительно
							облегчить работу помогут макросы - наборы действий, которые пользователь может настроить
							сам.
						</p>
					</Card>
					<Card className={`flex flex-col max-w-[250px] space-y-5 h-full items-start`} color={`primary`}>
						<h2 className={`text-[25px]`}>Разработчики</h2>
						<Divider />
						<p>
							Благодаря наличию слоев, ты можешь назначить все необходимые символы и сочетания рядом, как
							тебе удобно. Это позволяет не только ускорить свою работу, но и снижает нагрузку на пальцы.
						</p>
					</Card>
				</div>
				<Button className={`max-w-[850px]`} fullWidth>
					<p className={`w-full text-center text-[15px] font-semibold`}>Мне нужна такая клавиатура</p>
				</Button>
			</Section>
		</main>
	);
}

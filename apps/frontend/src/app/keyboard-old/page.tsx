import "./page.css";
import Image from "next/image";
import KeyboardImage from "./assets/FrameworkPreview.png";
import FrameworkFeatures from "@/app/keyboard-old/frameworkFeatures";
import CategoryCards from "@/app/keyboard-old/categoryCards";
import BuyModal from "@/app/keyboard-old/buyModal";
import Card from "@/components/layout/card";
import Parallax from "@/components/layout/parallax";
import ScrollHint from "@/components/layout/scrollHint";
import Section from "@/components/layout/section";

export default function KeyboardPage() {
	return (
		<div className={`snap-y`}>
			<Section className={`flex justify-center items-center p-2 snap-center`}>
				<div className={`grid grid-cols-1 max-w-[850px] w-[100%]`}>
					<div className={`max-w-[850px] w-[100%]`}>
						<div className={`grid grid-cols-1 gap-4 max-w-[850px] place-items-center`}>
							<div>
								<Image
									src={KeyboardImage}
									width={1000}
									height={1000}
									alt={`Picture of the keyboard`}
									className={`cursor-none`}
								/>
							</div>

							<p className={`text-center mt-[200px] uppercase text-[40px]`}>Самая удобная клавиатура</p>
							<div
								className={`text-center uppercase text-[64px] 
							md:text-[120px] lg:text-[138px]`}
							>
								<Parallax baseVelocity={2} direction={-1}>
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
						</div>
					</div>
				</div>
				<div className={`absolute flex justify-center top-[calc(97dvh)]`}>
					<ScrollHint pos={0.5} />
				</div>
			</Section>
			<Section className={`flex justify-center items-start p-2 snap-center bg-white`}>
				<div className={`grid grid-cols-3 max-w-[850px] w-[100%] place-items-center gap-y-[50px] gap-x-[50px]`}>
					<Card
						className={`col-span-3 grid grid-cols-1 place-items-center mt-[200px] w-[100%]`}
						variant={`outline`}
					>
						<div className={`flex`}>
							<h1 className={`uppercase text-center text-[60px] text-black`}>Это все, что</h1>
							<h1
								className={`uppercase text-center text-[60px] mx-[10px] border-b-[2px] border-indigo-500
							leading-none mb-[20px] text-indigo-500`}
							>
								тебе
							</h1>
							<h1 className={`uppercase text-center text-[60px] text-black`}>нужно</h1>
						</div>
						<p className={`text-center text-black`}>
							У клавиатуры 59 клавиш и 1 энкодер, который отвечает за громкость звука, колесо мыши или
							яркость экрана. Это все, что тебе нужно, ведь ты можешь назначить нужные клавиши или их
							сочетания и на другие слои. В этой клавиатуре собраны практически все преимущества
							современных клавиатур.
						</p>

						<BuyModal />
					</Card>

					<FrameworkFeatures />
				</div>
				<div className={`absolute flex justify-center top-[calc(197dvh)]`}>
					<ScrollHint pos={0.9} label={`Там есть еще кое-что`} />
				</div>
			</Section>
			<Section className={`flex justify-center items-start p-2 snap-center`}>
				<div
					className={`grid grid-cols-3 max-w-[850px] w-[100%] place-content-center place-items-center 
				gap-y-[50px] gap-x-[50px]`}
				>
					<Card
						className={`col-span-3 grid grid-cols-1 place-items-center mt-[70px] w-[100%]`}
						variant={`outline`}
					>
						<div className={`flex`}>
							<h1 className={`uppercase text-center text-[55px]`}>Помогаем</h1>
							<h1
								className={`uppercase text-center text-[55px] mx-[10px] border-b-[2px] border-indigo-500
							leading-none mb-[20px] text-indigo-500`}
							>
								всем сферам
							</h1>
						</div>
					</Card>

					<CategoryCards />

					<BuyModal buttonClassName={`col-span-3`} label={`Забрать свою клавиатуру`} />
				</div>
			</Section>
		</div>
	);
}

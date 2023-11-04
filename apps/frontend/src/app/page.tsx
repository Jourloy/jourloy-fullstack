import CustomButton from "@/components/actions/button";
import Divider from "@/components/layout/divider";
import {ActionIcon, Button, Card} from "@mantine/core";
import {IconBrandDiscord, IconBrandGithub, IconBrandTwitch} from "@tabler/icons-react";
import Image from "next/image";

export default function Home() {
	return (
		<main className={`dark flex p-[20px] w-full h-[calc(95dvh)] justify-center items-center`}>
			<div className={`grid grid-cols-12 w-full max-w-[850px] gap-5 justify-items-center`}>
				<div className={`col-span-12 md:col-span-4 md:block`}>
					<Image
						src={`https://s.jourloy.com/web-images/me.png`}
						alt={`Me :)`}
						width={300}
						height={300}
						className={`rounded-md`}
					/>
				</div>

				<Card className={`col-span-12 md:col-span-8 flex flex-col justify-center h-full w-full`} withBorder>
					<h2 className={`text-center text-[50px]`}>✌️ Привет ✌️</h2>
					<Divider className={`px-[20px] my-[10px]`} />
					<p className={`text-center`}>Я мужчина, муж, брат, сын, программист и просто хороший человек</p>
					<div className={`flex space-x-3 mt-[15px] justify-center`}>
						<a href={`https://discord.gg/PB8rdcXyRR`}>
							<ActionIcon radius={`xl`} variant={`subtle`} size={`lg`}>
								<IconBrandDiscord color={`#5865F2`} />
							</ActionIcon>
						</a>

						<a href={`https://twitch.tv/jourloy`}>
							<ActionIcon radius={`xl`} variant={`subtle`} size={`lg`}>
								<IconBrandTwitch color={`#6441A4`} />
							</ActionIcon>
						</a>

						<a href={`https://github.com/jourloy`}>
							<ActionIcon radius={`xl`} variant={`subtle`} size={`lg`}>
								<IconBrandGithub color={`#000000`} />
							</ActionIcon>
						</a>
					</div>
				</Card>

				<Divider className={`col-span-12`} color={`neutral`} />

				<Card className={`col-span-12 flex flex-col w-full`} variant={`outline`} withBorder>
					<h3 className={`col-span-2 text-[40px] text-center`}>Мои проекты</h3>

					<div className={`flex flex-col md:flex-row w-full md:space-x-5 space-y-5 md:space-y-0`}>
						<CustomButton color={`black`} fullWidth>Трекер</CustomButton>

						<CustomButton color={`black`} fullWidth redirect={`/keyboard`}>
							Клавиатура
						</CustomButton>
					</div>
				</Card>
			</div>
		</main>
	);
}

import {useDocumentTitle} from "@mantine/hooks";
import {ActionIcon, Button, Card, Divider, Image} from "@mantine/core";
import {IconBrandDiscord, IconBrandTwitch, IconBrandGithub} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";

export default function Main() {
	useDocumentTitle(`Jourloy`);

	const navigate = useNavigate();

	const onKeyboard = () => {
		navigate(`/keyboard`);
	};

	const onTracker = () => {
		navigate(`/tracker`);
	};

	return (
		<main className={`dark flex p-[20px] w-full h-[calc(95dvh)] justify-center items-center`}>
			<div className={`grid grid-cols-12 w-full max-w-[850px] gap-5 justify-items-center`}>
				<div className={`col-span-12 md:col-span-4 md:block`}>
					<Image src={`https://s.jourloy.com/web-images/me.png`} radius={`md`} />
				</div>

				<Card
					className={`col-span-12 md:col-span-8 flex flex-col justify-center h-full w-full`}
					withBorder
				>
					<h2 className={`text-center text-[50px]`}>✌️ Привет ✌️</h2>
					<Divider className={`px-[20px] my-[10px]`} w={`100%`} />
					<p className={`text-center`}>
						Я мужчина, муж, брат, сын, программист и просто хороший человек
					</p>
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

				<Divider className={`col-span-12`} w={`100%`} />

				<Card className={`col-span-12 flex flex-col w-full`} withBorder>
					<h3 className={`text-[40px] text-center`}>Мои проекты</h3>

					<div
						className={`flex flex-col md:flex-row w-full md:space-x-5 space-y-5 md:space-y-0 mt-5`}
					>
						<Button color={`black`} fullWidth onClick={onTracker}>
							Трекер
						</Button>

						<Button color={`black`} fullWidth onClick={onKeyboard}>
							Клавиатура
						</Button>
					</div>
				</Card>
			</div>
		</main>
	);
}

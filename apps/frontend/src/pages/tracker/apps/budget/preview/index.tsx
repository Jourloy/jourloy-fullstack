import {Divider, Skeleton, Button, Card, Progress} from "@mantine/core";
import {useDocumentTitle} from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import CustomCard from "src/components/layout/CustomCard";
import ScrollHint from "src/components/layout/ScrollHint";
import Section from "src/components/layout/Section";
import {formatter} from "src/context";
import SpendComponent from "src/pages/tracker/components/spend";
import { spends } from "src/pages/tracker/mock/spends";
import { store } from "src/store/store";

export default function BudgetPreview() {
	useDocumentTitle(`Бюджет`);

	const navigate = useNavigate();

	const toApp = () => {
		if (store.getState().budgetReducer.budgets.length > 0) {
			navigate(`/budget`);
		} else {
			navigate(`/budget/create`);
		}
	}

	return (
		<main>
			<Section className={`flex flex-col justify-center items-center min-h-[1000px] bg-black p-5`}>
				<div className={`absolute flex justify-center top-[calc(97dvh)]`}>
					<ScrollHint pos={0.5} />
				</div>
				<h3 className={`text-center uppercase text-[25px] text-white`}>
					Теперь все расходы под
				</h3>
				<h1 className={`text-center uppercase text-amber-500 text-[100px] mt-[-20px]`}>
					Контролем
				</h1>
				<Divider
					label={<p className={`text-[18px]`}>твоим и тотальным</p>}
					labelPosition={`center`}
					className={`w-full`}
				/>
				<div className={`flex text-center text-neutral-400 text-[20px] transition-all`}>
					<div>
						<div className={`text-white`}>
							Никогда еще не было так просто {` `}
							<div
								className={`relative inline-grid grid-cols-1 grid-rows-1 gap-12 overflow-hidden ml-[10px]`}
							>
								<span
									className={`animate-word col-span-full row-span-full text-amber-500 font-extrabold`}
								>
									Тратить
								</span>
								<span
									className={`animate-word-delay-1 col-span-full row-span-full text-indigo-500 font-extrabold`}
								>
									Считать
								</span>
								<span
									className={`animate-word-delay-2 col-span-full row-span-full text-green-500 font-extrabold`}
								>
									Копить
								</span>
								<span
									className={`animate-word-delay-3 col-span-full row-span-full text-cyan-500 font-extrabold`}
								>
									Следить
								</span>
								<span
									className={`animate-word-delay-4 col-span-full row-span-full text-red-500 font-extrabold`}
								>
									Мечтать
								</span>
							</div>
						</div>
					</div>
				</div>

				<div
					className={`flex flex-col md:flex-row md:space-x-5 space-y-5 md:space-y-0 mt-[100px]`}
				>
					<CustomCard
						className={`flex flex-col items-center justify-between space-y-3 w-[300px] h-full opacity-50`}
						color={`bg-white`}
					>
						<div className={`w-full flex flex-col space-y-3`}>
							<Skeleton height={20} radius={`sm`} className={`mt-[8px]`} color={`green`} />
							<Divider className={`w-full`} />
							<div className={`w-full flex flex-row space-x-3`}>
								<Skeleton height={10} circle />
								<Skeleton height={10} radius={`xs`} />
							</div>
							<div className={`w-full flex flex-row space-x-3`}>
								<Skeleton height={10} circle />
								<Skeleton height={10} radius={`xs`} />
							</div>
							<div className={`w-full flex flex-row space-x-3`}>
								<Skeleton height={10} circle />
								<Skeleton height={10} radius={`xs`} />
							</div>
						</div>

						<Button fullWidth variant={`white`} color={`black`} disabled>
							В разработке
						</Button>
					</CustomCard>
					<CustomCard
						withBorder
						className={`flex flex-col space-y-3 w-[300px] h-full`}
						color={`bg-white border-[3px] border-cyan-500 shadow-xl shadow-cyan-500/50`}
					>
						<h2 className={`text-[20px] text-center`}>Временно бесплатно</h2>
						<Divider className={`w-full`} />
						<p>
							На данном этапе все имеющиеся функции в трекере доступны всем без исключения
						</p>
						<p>В будущем определенный набор функций станет доступным только по подписке</p>
						<p>
							Заранее появится оповещение и возможность использование скидки на первую
							подписку
						</p>
						<Button fullWidth color={`black`} onClick={toApp}>
							Начать пользоваться
						</Button>
					</CustomCard>
					<CustomCard
						className={`flex flex-col items-center justify-between space-y-3 w-[300px] h-full opacity-50`}
						color={`bg-white`}
					>
						<div className={`w-full flex flex-col space-y-3`}>
							<Skeleton height={20} radius={`sm`} className={`mt-[8px]`} color={`green`} />
							<Divider className={`w-full`} />
							<div className={`w-full flex flex-row space-x-3`}>
								<Skeleton height={10} circle />
								<Skeleton height={10} radius={`xs`} />
							</div>
							<div className={`w-full flex flex-row space-x-3`}>
								<Skeleton height={10} circle />
								<Skeleton height={10} radius={`xs`} />
							</div>
							<div className={`w-full flex flex-row space-x-3`}>
								<Skeleton height={10} circle />
								<Skeleton height={10} radius={`xs`} />
							</div>
						</div>

						<Button fullWidth variant={`white`} color={`black`} disabled>
							В разработке
						</Button>
					</CustomCard>
				</div>
			</Section>

			<Section
				className={`flex flex-col justify-center items-center min-h-[1000px] p-5 space-y-5`}
			>
				<h1 className={`text-center uppercase text-[40px]`}>Следить за расходами очень важно</h1>
				<h2 className={`text-center text-[25px] text-neutral-500`}>
					Но как это сделать лучше всего?
				</h2>
				<Divider className={`w-full my-[20px]`} />
				<div
					className={`flex flex-col md:flex-row max-w-[850px] w-full justify-between space-x-5`}
				>
					<Card withBorder className={`flex flex-col w-full md:max-w-[300px]`}>
						<h2 className={`text-[25px] mb-[10px]`}>Представь себе инструмент</h2>
						<p>Который хранит всю твою историю доходов и расходов</p>
					</Card>
					<Card withBorder className={`flex flex-col space-y-5 w-full`}>
						<SpendComponent
							spend={{...spends[0].spend}}
							length={spends[0].length}
							index={spends[0].index}
						/>

						<SpendComponent
							spend={{...spends[1].spend}}
							length={spends[0].length}
							index={spends[0].index}
						/>
					</Card>
				</div>
				<div
					className={`flex flex-col md:flex-row max-w-[850px] w-full justify-between space-x-5`}
				>
					<Card withBorder className={`flex flex-col space-y-3 w-full`}>
						<div className={`flex flex-row justify-between`}>
							<h2 className={`text-[25px]`}>Дневной бюджет</h2>
							<h2 className={`text-[25px]`}>{formatter.format(1200)}</h2>
						</div>
						<Divider className={`w-full`} />
						<Progress value={88} h={`15px`} color={`green`} />
						<div className={`flex flex-row justify-between`}>
							<p className={`text-neutral-500`}>Осталось дней: 34</p>
							<p className={`text-neutral-500`}>Бюджет: {formatter.format(40800)}</p>
						</div>
					</Card>
					<Card withBorder className={`flex flex-col w-full md:max-w-[300px]`}>
						<h2 className={`text-[25px] mb-[10px]`}>Представь себе инструмент</h2>
						<p>Который расчитывает лимит денег на сегодня или неделю</p>
					</Card>
				</div>
			</Section>
		</main>
	);
}

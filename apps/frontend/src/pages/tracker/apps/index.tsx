import {AppShell, Burger, Button, Divider} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import TrackerDefault from "./default";
import {useEffect, useState} from "react";
import TrackerBlocked from "./blocked";
import {useSearchParams} from "react-router-dom";
import BudgetIndex from "./budget";
import {store} from "src/store/store";
import LoginAPI from "src/pages/login/api";
import BudgetAPI from "./budget/budgetAPI";
import DefaultLoading from "src/components/layout/Loading";

type TActiveApps = `default` | `calendar` | `budget` | `party` | `settings`;

export default function TrackerApp() {
	const loginAPI = new LoginAPI();
	const budgetAPI = new BudgetAPI();

	const [searchParams, setSearchParams] = useSearchParams();
	const [opened, {toggle}] = useDisclosure();

	const [loading, setLoading] = useState(true);
	const [activeApp, setActiveApp] = useState<TActiveApps>(
		(searchParams.get(`app`) as TActiveApps) || `default`
	);

	const getActiveAppDisabled = (target: TActiveApps) => {
		if (target === activeApp) return true;
		return false;
	};

	const apps = {
		default: <TrackerDefault />,
		calendar: <div>Calendar</div>,
		budget: <BudgetIndex />,
		party: <div>Party</div>,
		settings: <div>Settings</div>,
		blocked: <TrackerBlocked />,
	};

	const getActiveApp = (target: TActiveApps) => {
		if (!store.getState().userReducer.logined) return apps.blocked;
		return apps[target];
	};

	useEffect(() => {
		if (!store.getState().userReducer.logined) {
			loginAPI
				.updateUserInStore()
				.then(async () => {
					await budgetAPI.updateBudgetsInStore();
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			budgetAPI.updateBudgetsInStore().finally(() => {
				setLoading(false);
			});
		}
	});

	if (loading) return <DefaultLoading />;
	
	return (
		<AppShell
			header={{height: 50}}
			navbar={{
				width: 250,
				breakpoint: `sm`,
				collapsed: {
					mobile: !opened || !store.getState().userReducer.logined,
					desktop: !opened || !store.getState().userReducer.logined,
				},
			}}
			padding={`md`}
		>
			<AppShell.Header className={`grid grid-cols-3 items-center px-5`}>
				<Burger
					className={`col-span-1`}
					opened={opened}
					onClick={toggle}
					size={`sm`}
					hidden={!store.getState().userReducer.logined}
				/>
				<div className={`col-span-1`} hidden={store.getState().userReducer.logined} />
				<h1 className={`uppercase text-[30px] text-center col-span-1`}>Трекер</h1>
				<div />
			</AppShell.Header>

			<AppShell.Navbar p={`md`}>
				<AppShell.Section grow className={`flex flex-col w-full space-y-5`}>
					<Button
						color={`black`}
						variant={`subtle`}
						disabled={getActiveAppDisabled(`default`)}
						onClick={() => {
							setSearchParams({app: `default`});
							setActiveApp(`default`);
							toggle();
						}}
					>
						Главная
					</Button>

					<Divider className={`w-full`} />

					<Button
						color={`black`}
						variant={`outline`}
						disabled={getActiveAppDisabled(`calendar`)}
						onClick={() => {
							setSearchParams({app: `calendar`});
							setActiveApp(`calendar`);
							toggle();
						}}
					>
						Календарь
					</Button>
					<Button
						color={`black`}
						variant={`outline`}
						disabled={getActiveAppDisabled(`budget`)}
						onClick={() => {
							setSearchParams({app: `budget`});
							setActiveApp(`budget`);
							toggle();
						}}
					>
						Бюджет
					</Button>
					<Button
						color={`black`}
						variant={`outline`}
						disabled={getActiveAppDisabled(`party`)}
						onClick={() => {
							setSearchParams({app: `party`});
							setActiveApp(`party`);
							toggle();
						}}
					>
						Вечеринка
					</Button>
				</AppShell.Section>

				<AppShell.Section className={`flex flex-col w-full`}>
					<Button
						color={`black`}
						variant={`outline`}
						disabled={getActiveAppDisabled(`settings`)}
						onClick={() => {
							setSearchParams({app: `settings`});
							setActiveApp(`settings`);
							toggle();
						}}
					>
						Настройки
					</Button>
				</AppShell.Section>
			</AppShell.Navbar>

			<AppShell.Main>{getActiveApp(activeApp)}</AppShell.Main>
		</AppShell>
	);
}

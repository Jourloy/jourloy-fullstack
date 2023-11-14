import {AppShell, Burger, Button} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import TrackerDefault from "./default";
import {useState} from "react";
import {useUserStore} from "../../../store/user.store";
import TrackerBlocked from "./blocked";

type TActiveApps = `default` | `calendar` | `budget` | `party` | `settings`;

export default function TrackerApp() {
	const userStore = useUserStore(state => state);

	const [opened, {toggle}] = useDisclosure();

	const [activeApp, setActiveApp] = useState<TActiveApps>(`default`);

	const getActiveAppDisabled = (target: TActiveApps) => {
		if (target === activeApp) return true;
		return false;
	};

	const apps = {
		default: <TrackerDefault />,
		calendar: <div>Calendar</div>,
		budget: <div>Budget</div>,
		party: <div>Party</div>,
		settings: <div>Settings</div>,
		blocked: <TrackerBlocked />,
	};

	const getActiveApp = (target: TActiveApps) => {
		if (!userStore.logined) return apps.blocked;
		return apps[target];
	};

	return (
		<AppShell
			header={{height: 50}}
			navbar={{
				width: 250,
				breakpoint: `sm`,
				collapsed: {
					mobile: !opened || !userStore.logined,
					desktop: !opened || !userStore.logined,
				},
			}}
			padding={`md`}
		>
			<AppShell.Header className={`flex flex-row justify-between items-center p-5`}>
				<Burger opened={opened} onClick={toggle} size={`sm`} hidden={!userStore.logined} />
				<div hidden={userStore.logined} />
				<h1 className={`uppercase text-[30px]`}>Трекер</h1>
				<div />
			</AppShell.Header>

			<AppShell.Navbar p={`md`}>
				<AppShell.Section grow className={`flex flex-col w-full space-y-5`}>
					<Button
						color={`black`}
						variant={`outline`}
						disabled={getActiveAppDisabled(`calendar`)}
						onClick={() => setActiveApp(`calendar`)}
					>
						Календарь
					</Button>
					<Button
						color={`black`}
						variant={`outline`}
						disabled={getActiveAppDisabled(`budget`)}
						onClick={() => setActiveApp(`budget`)}
					>
						Бюджет
					</Button>
					<Button
						color={`black`}
						variant={`outline`}
						disabled={getActiveAppDisabled(`party`)}
						onClick={() => setActiveApp(`party`)}
					>
						Вечеринка
					</Button>
				</AppShell.Section>

				<AppShell.Section className={`flex flex-col w-full`}>
					<Button
						color={`black`}
						variant={`outline`}
						disabled={getActiveAppDisabled(`settings`)}
						onClick={() => setActiveApp(`settings`)}
					>
						Настройки
					</Button>
				</AppShell.Section>
			</AppShell.Navbar>

			<AppShell.Main>{getActiveApp(activeApp)}</AppShell.Main>
		</AppShell>
	);
}

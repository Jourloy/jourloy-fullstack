import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "dayjs/locale/ru";
import {MantineProvider} from "@mantine/core";
import {PropsWithChildren} from "react";
import {Notifications} from "@mantine/notifications";
import {DatesProvider} from "@mantine/dates";

export default function MantineContainer(props: PropsWithChildren) {
	return (
		<MantineProvider>
			<DatesProvider settings={{locale: `ru`, firstDayOfWeek: 1}}>
				<Notifications />
				{props.children}
			</DatesProvider>
		</MantineProvider>
	);
}

import "@mantine/notifications/styles.css";
import {MantineProvider} from "@mantine/core";
import {PropsWithChildren} from "react";
import { Notifications } from "@mantine/notifications";

export default function MantineContainer(props: PropsWithChildren) {
	return (
		<MantineProvider>
			<Notifications />
			{props.children}
		</MantineProvider>
	);
}

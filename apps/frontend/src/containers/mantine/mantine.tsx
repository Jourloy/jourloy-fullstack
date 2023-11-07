import { MantineProvider } from "@mantine/core";
import { PropsWithChildren } from "react";

export default function MantineContainer(props: PropsWithChildren) {
	return(
		<MantineProvider>
			{props.children}
		</MantineProvider>
	)
}
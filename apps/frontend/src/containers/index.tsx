import "dayjs/locale/ru";
import {ColorScheme, ColorSchemeProvider, MantineProvider} from "@mantine/core";
import {DatesProvider} from "@mantine/dates";
import {PropsWithChildren} from "react";
import {Providers} from "../store/provider";
import {useColorScheme, useLocalStorage} from "@mantine/hooks";
import {Notifications} from "@mantine/notifications";

export default function DefaultContainer(props: PropsWithChildren) {
	const prefersColorScheme = useColorScheme();
	// const prefersColorScheme = `dark`;
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: "mantine-color-scheme",
		defaultValue: prefersColorScheme,
		getInitialValueInEffect: true,
	});
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === `dark` ? `light` : `dark`));

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: colorScheme,
					components: {
						Button: {
							defaultProps: theme => ({
								color: theme.colorScheme === `dark` ? `gray` : `dark`,
							}),
						},
						Modal: {
							defaultProps: {
								withCloseButton: false,
								overlayProps: {
									blur: 3,
								},
							},
						},
						Card: {
							defaultProps: theme => ({
								radius: `md`,
								withBorder: theme.colorScheme === `dark` ? false : true,
							}),
						},
						Pagination: {
							defaultProps: theme => ({
								color: theme.colorScheme === `dark` ? `gray` : `dark`,
								variant: theme.colorScheme === `dark` ? `white` : `filled`,
							}),
						},
						Header: {
							defaultProps: theme => ({
								style: {
									backgroundColor: theme.colors.dark[7],
								},
							}),
						},
						Footer: {
							defaultProps: theme => ({
								style: {
									backgroundColor: theme.colorScheme === `dark` ? theme.colors.dark[7] : `white`,
								},
							}),
						},
					},
				}}
			>
				<DatesProvider settings={{locale: `ru`}}>
					<Providers>{props.children}</Providers>
				</DatesProvider>
				<Notifications position={`top-right`} limit={5}/>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

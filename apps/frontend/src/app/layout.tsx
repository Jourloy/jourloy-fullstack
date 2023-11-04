import "@mantine/core/styles.css";
import "@mantine/core/styles/Input.css";
import "./globals.scss";
import type {Metadata} from "next";
import Header from "@/components/layout/header";
import {MantineProvider} from "@mantine/core";

export const metadata: Metadata = {
	title: "JOURLOY",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang={`ru`} data-theme={`light`}>
			<body>
				<MantineProvider defaultColorScheme={`light`}>
					<Header />
					{children}
				</MantineProvider>
			</body>
		</html>
	);
}

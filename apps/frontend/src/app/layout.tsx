import "@mantine/core/styles.css";
import "@mantine/core/styles/Input.css";
import "./globals.scss";
import type {Metadata} from "next";
import Header from "@/components/layout/header";
import {MantineProvider} from "@mantine/core";

export const metadata: Metadata = {
	title: "JOURLOY",
};

const googleAnalytics = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-PFTMF6TXF7"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-PFTMF6TXF7');
</script>
`

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang={`ru`} data-theme={`light`}>
			<body>
				<div dangerouslySetInnerHTML={{__html: googleAnalytics}} />
				<MantineProvider defaultColorScheme={`light`}>
					<Header />
					{children}
				</MantineProvider>
			</body>
		</html>
	);
}

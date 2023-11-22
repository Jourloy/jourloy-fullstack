import "@mantine/core/styles.css";
import "./index.css";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import MantineContainer from "./containers/mantine/mantine.tsx";
import ReactQueryContainer from "./containers/reactQuery/index.tsx";
import DefaultContainer from "./containers/default/index.tsx";
import {Providers} from "./store/provider.tsx";

const container = document.getElementById(`root`);
ReactDOM.createRoot(container!).render(
	<Providers>
		<MantineContainer>
			<ReactQueryContainer>
				<DefaultContainer>
					<App />
				</DefaultContainer>
			</ReactQueryContainer>
		</MantineContainer>
	</Providers>
);

import "@mantine/core/styles.css";
import "./index.css";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import MantineContainer from "./containers/mantine/mantine.tsx";
import ReactQueryContainer from "./containers/reactQuery/index.tsx";

const container = document.getElementById(`root`);
ReactDOM.createRoot(container!).render(
	<ReactQueryContainer>
		<MantineContainer>
			<App />
		</MantineContainer>
	</ReactQueryContainer>
);

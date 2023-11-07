import '@mantine/core/styles.css';
import "./index.css";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import MantineContainer from './containers/mantine/mantine.tsx';

const container = document.getElementById(`root`);
ReactDOM.createRoot(container!).render(
	<MantineContainer>
		<App />
	</MantineContainer>
);

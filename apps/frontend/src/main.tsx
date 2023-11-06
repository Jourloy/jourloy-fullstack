import "./index.css";
import App from "./App.tsx";
import DefaultContainer from "./containers/index.tsx";
import ReactDOM from "react-dom/client";

const container = document.getElementById(`root`);
ReactDOM.createRoot(container!).render(
	<DefaultContainer>
		<App />
	</DefaultContainer>
);

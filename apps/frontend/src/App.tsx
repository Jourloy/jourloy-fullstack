import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages";
import KeyboardIndex from "./pages/keyboard";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* MAIN */}
				<Route element={<Main />} path="/" />
				
				{/* KEYBOARD */}
				<Route element={<KeyboardIndex />} path="/keyboard" />
			</Routes>
		</BrowserRouter>
	);
}

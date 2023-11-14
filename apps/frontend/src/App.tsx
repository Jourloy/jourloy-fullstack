import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages";
import KeyboardIndex from "./pages/keyboard";
import TrackerIndex from "./pages/tracker";
import { Page404 } from "./pages/404";
import LoginIndex from "./pages/login";
import TrackerApp from "./pages/tracker/apps";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* MAIN */}
				<Route element={<Main />} path="/" />
				
				{/* KEYBOARD */}
				<Route element={<KeyboardIndex />} path="/keyboard" />
				
				{/* TRACKER */}
				<Route element={<TrackerIndex />} path="/tracker" />
				<Route element={<TrackerApp />} path="/tracker/app" />

				{/* LOGIN */}
				<Route element={<LoginIndex />} path="/login" />

				{/* 404 */}
				<Route element={<Page404 />} path="*" />
			</Routes>
		</BrowserRouter>
	);
}

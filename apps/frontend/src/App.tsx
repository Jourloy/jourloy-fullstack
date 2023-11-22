import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages";
import KeyboardIndex from "./pages/keyboard";
import {Page404} from "./pages/404";
import LoginIndex from "./pages/login";
import TrackerApp from "./pages/tracker/apps";
import BudgetIndex from "./pages/tracker/apps/budget";
import BudgetPreview from "./pages/tracker/apps/budget/preview";
import BudgetCreate from "./pages/tracker/apps/budget/create";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* MAIN */}
				<Route element={<Main />} path="/" />

				{/* KEYBOARD */}
				<Route element={<KeyboardIndex />} path="/keyboard" />

				{/* TRACKER */}
				<Route element={<TrackerApp />} path="/tracker" />

				{/* Budget */}
				<Route element={<BudgetIndex />} path="/budget" />
				<Route element={<BudgetPreview />} path="/budget/preview" />
				<Route element={<BudgetCreate />} path="/budget/create" />

				{/* LOGIN */}
				<Route element={<LoginIndex />} path="/login" />

				{/* 404 */}
				<Route element={<Page404 />} path="*" />
			</Routes>
		</BrowserRouter>
	);
}

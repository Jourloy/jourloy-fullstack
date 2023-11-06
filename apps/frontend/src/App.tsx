import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages";
import Login from "./pages/login";
import PartyIndex from "./pages/party";
import Check from "./pages/login/check";
import PartyApp from "./pages/party/app";
import LayoutContainer from "./containers/layout";
import KeyboardIndex from "./pages/keyboard";
import TrackerIndex from "./pages/tracker";
import TrackerApp from "./pages/tracker/app";
import TrackerCreate from "./pages/tracker/create";
import Blocked from "./pages/blocked";
import {Page404} from "./pages/404";
import TutorialFramework from "./pages/tutorial/framewok";
import AdminIndex from "./pages/admin";
import DarkIndex from "./pages/dark";
import HHPage from "./pages/hh";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<LayoutContainer children={<Main />} />} path="/" />

				{/* LOGIN */}

				<Route element={<LayoutContainer children={<Login />} />} path="/login"></Route>
				<Route element={<LayoutContainer children={<Check />} />} path="/login/check" />

				{/* PARTY */}

				<Route element={<LayoutContainer children={<PartyIndex />} />} path="/party"></Route>
				<Route element={<LayoutContainer children={<PartyApp />} />} path="/party/app" />

				{/* KEYBOARD */}

				<Route element={<LayoutContainer children={<KeyboardIndex />} />} path="/keyboard" />

				{/* TRACKER */}

				<Route element={<LayoutContainer children={<TrackerIndex />} />} path="/tracker"></Route>
				<Route
					element={<LayoutContainer children={<TrackerCreate />} />}
					path="/tracker/create"
				/>
				<Route element={<LayoutContainer children={<TrackerApp />} />} path="/tracker/app" />

				{/* TUTORIAL */}

				<Route
					element={<LayoutContainer children={<TutorialFramework />} />}
					path="/tutorial/framework"
				/>

				{/* ADMIN */}

				<Route
					element={<LayoutContainer children={<AdminIndex />} isForAdmin />}
					path="/admin"
				/>

				{/* DARK */}

				<Route element={<LayoutContainer children={<DarkIndex />} />} path="/dark" />

				{/* HH */}

				<Route element={<HHPage />} path="/hh" />

				{/* BLOCKED */}

				<Route element={<LayoutContainer children={<Blocked />} />} path="/blocked" />

				{/* 404 */}

				<Route element={<LayoutContainer children={<Page404 />} />} path="*" />
			</Routes>
		</BrowserRouter>
	);
}

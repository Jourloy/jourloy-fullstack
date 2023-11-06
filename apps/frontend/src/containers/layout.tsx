import {AppShell} from "@mantine/core";
import {useEffect, useState} from "react";
import HeaderComponent from "../components/layout/header";
import {store} from "../store/store";
import Blocked from "../pages/blocked";
import FooterComponent from "../components/layout/footer";
import DefaultLoading from "../components/layout/loading";

type TProps = {
	needAuth?: boolean;
	ignoreAppShell?: boolean;
	isForAdmin?: boolean;
	children: React.ReactNode;
};

export default function LayoutContainer(props: TProps) {
	const [logined, setLogined] = useState(store.getState().userReducer.logined);
	const [admin, setAdmin] = useState(store.getState().userReducer.role === `admin`);
	store.subscribe(() => {
		const _logined = store.getState().userReducer.logined;
		const _admin = store.getState().userReducer.role === `admin`;
		if (logined !== _logined) setLogined(_logined);
		if (admin !== _admin) setAdmin(_admin);
	});

	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		if (props.isForAdmin) {
			if (admin) setShow(true);
			else setShow(false);
		} else if (props.needAuth) {
			if (!logined) setShow(false);
			else setShow(true);
		} else {
			setShow(true);
		}

		setLoading(false);
	}, [admin, logined, props.isForAdmin, props.needAuth]);

	const body = () => (
		<>
			{!show && <Blocked />}
			{show && props.children}
		</>
	);

	if (loading) return <DefaultLoading />;

	if (props.ignoreAppShell) return body();
	else {
		return (
			<AppShell
				header={<HeaderComponent />}
				footer={<FooterComponent />}
			>
				{body()}
			</AppShell>
		);
	}
}

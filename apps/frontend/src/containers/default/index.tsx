import {PropsWithChildren, useEffect, useState} from "react";
import LoginAPI from "src/pages/login/api";
import DefaultLoading from "src/components/layout/Loading";

export default function DefaultContainer(props: PropsWithChildren) {
	const loginAPI = new LoginAPI();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loginAPI.updateUserInStore().finally(() => {
			setLoading(false);
		});
	});

	if (loading) return <DefaultLoading />;
	return props.children;
}

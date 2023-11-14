import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {userActions} from "../../../store/features/user.slice";
import {store} from "../../../store/store";
import SuccessNotification from "../../../components/logical/notification/success.notification";
import ErrorNotification from "../../../components/logical/notification/error.notification";

export default function Check() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	useEffect(() => {
		const success = searchParams.get(`success`);
		const avatar = searchParams.get(`avatar`);
		const username = searchParams.get(`username`);
		const role = searchParams.get(`role`);

		if (username) store.dispatch(userActions.changeUsername(username));
		if (avatar) store.dispatch(userActions.changeAvatar(avatar));
		if (role) store.dispatch(userActions.changeRole(role));

		if (success) {
			navigate(`/`);
			store.dispatch(userActions.login());
			SuccessNotification({message: `Авторизация прошла успешно`});
		} else {
			navigate(`/login`);
			ErrorNotification();
		}
	});

	return <></>;
}

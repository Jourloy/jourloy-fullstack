import {CancelToken} from "axios";
import BackendContext from "../../context/backend.context";
import {TUser} from "../../types";
import {store} from "../../store/store";
import {userActions} from "../../store/features/user.slice";

export default class LoginAPI extends BackendContext {
	constructor() {
		super(`/auth`);
	}

	public checkUser(token: CancelToken) {
		return this.context.get<{user: TUser}>(`/tokens`, {withCredentials: true, cancelToken: token});
	}

	public async autoLogin(token: CancelToken) {
		return this.checkUser(token)
			.then(d => {
				if (d.data.user.username) {
					store.dispatch(userActions.changeUsername(d.data.user.username));
				}
				if (d.data.user.avatar) {
					store.dispatch(userActions.changeAvatar(d.data.user.avatar));
				}
				if (d.data.user.role) {
					store.dispatch(userActions.changeRole(d.data.user.role));
				}
				if (d.data.user) {
					store.dispatch(userActions.login());
					return true;
				}
			})
			.catch(() => {
				return false;
			});
	}

	public logout() {
		return this.context.get(`/logout`);
	}
}

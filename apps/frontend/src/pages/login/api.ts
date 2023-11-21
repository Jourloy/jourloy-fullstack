import { store } from "src/store/store";
import BackendContext from "../../context/backend";
import { userActions } from "src/store/features/user.slice";

type TUserLoginResponse = {
	username: string;
	avatar: string;
	role: string;
};

export default class LoginAPI extends BackendContext {
	constructor() {
		super(`/auth`);
	}

	/**
	 * Logs in a user with the given username and password.
	 *
	 * @param {string} username - The username of the user.
	 * @param {string} password - The password of the user.
	 * @return A promise that resolves to the login response.
	 */
	public async login(username: string, password: string) {
		return this.context.post<TUserLoginResponse>(
			`/login`,
			{username, password},
			{withCredentials: true}
		);
	}

	/**
	 * Retrieves user data from the server.
	 *
	 * @return The response from the server containing user data.
	 */
	public async getUserData() {
		return this.context.post<TUserLoginResponse>(
			`/user`,
			{},
			{withCredentials: true}
		);
	}

	/**
	 * Updates the user in the store.
	 *
	 * @return A promise that resolves once the user has been updated in the store.
	 */
	public async updateUserInStore() {
		const resp = await this.getUserData();
		if (resp.data) {
			store.dispatch(userActions.forceUpdate({...resp.data, logined: true}));
		}
	}
}

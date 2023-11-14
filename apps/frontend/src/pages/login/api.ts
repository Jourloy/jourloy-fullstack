import BackendContext from "../../context/backend";

type TUserLoginResponse = {
	username: string;
	avatar: string;
	role: string;
};

export default class LoginAPI extends BackendContext {
	constructor() {
		super(`/auth`);
	}

	public async login(username: string, password: string) {
		return this.context.post<TUserLoginResponse>(
			`/login`,
			{username, password},
			{withCredentials: true}
		);
	}
}

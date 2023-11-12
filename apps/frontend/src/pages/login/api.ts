import BackendContext from "../../context/backend";

export default class LoginAPI extends BackendContext {
	constructor() {
		super(`/auth`);
	}

	public async login(username: string, password: string) {
		return this.context.post(`/login`, {username, password});
	}
}
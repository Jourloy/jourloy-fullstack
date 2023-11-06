import {CancelToken} from "axios";
import BackendContext from "../context/backend.context";

export default class LayoutAPI extends BackendContext {
	constructor() {
		super(`/admin`);
	}

	public async isAdmin(token?: CancelToken) {
		return this.context.get(`/is-admin`, {cancelToken: token});
	}
}

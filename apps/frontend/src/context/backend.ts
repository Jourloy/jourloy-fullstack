import axios, {AxiosInstance} from "axios";

const backendLink =
	import.meta.env.VITE_NODE_ENV !== "production"
		? import.meta.env.VITE_DEPLOYMENT_MODE === `local`
			? `http://localhost:${import.meta.env.VITE_BACKEND_PORT}`
			: "https://api.jourloy.online"
		: "https://api.jourloy.com";

export default class BackendContext {
	public context: AxiosInstance;

	constructor(path?: string) {
		let link = backendLink;
		if (path) link += `${path}`;
		this.context = axios.create({
			baseURL: link,
			withCredentials: true,
		});
	}

	public getSource() {
		return axios.CancelToken.source();
	}
}

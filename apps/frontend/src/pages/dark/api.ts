import { CancelToken } from "axios";
import BackendContext from "../../context/backend.context";
import { TDarkAttribute, TDarkClass } from "../../types";
import { store } from "../../store/store";
import { darkActions } from "../../store/features/dark.slice";

export default class DarkAPI extends BackendContext {
	constructor() {
		super(`/dark`);
	}

	public async updateDark(token?: CancelToken) {
		const attr = await this.getAllAttributes(token);
		if (attr.data) {
			store.dispatch(darkActions.updateAttributesForce(attr.data));
		}

		const resp = await this.getAllClasses(token);
		if (resp.data) {
			store.dispatch(darkActions.updateClassesForce(resp.data));
		}
	}

	// CLASS //

	public async addClass(
		data: {enName: string; ruName: string; enDescription: string; ruDescription: string},
		token?: CancelToken
	) {
		return await this.context.post(`/class`, data, {cancelToken: token});
	}

	public async getAllClasses(token?: CancelToken) {
		return await this.context.get<TDarkClass[]>(`/class/all`, {cancelToken: token});
	}

	public async getOneClass(id: number, token?: CancelToken) {
		return await this.context.get<TDarkClass>(`/class/${id}`, {cancelToken: token});
	}

	public async getAllClassesInStore(token?: CancelToken) {
		const resp = await this.getAllClasses(token);
		if (resp.data) {
			store.dispatch(darkActions.updateClassesForce(resp.data));
		}
	}

	// ATTRIBUTE //

	public async addAttribute(
		data: {enName: string; ruName: string; enDescription: string; ruDescription: string},
		token?: CancelToken
	) {
		return await this.context.post(`/attribute`, data, {cancelToken: token});
	}

	public async getAllAttributes(token?: CancelToken) {
		return await this.context.get<TDarkAttribute[]>(`/attribute/all`, {cancelToken: token});
	}

	public async getOneAttributes(id: number, token?: CancelToken) {
		return await this.context.get<TDarkAttribute>(`/attribute/${id}`, {cancelToken: token});
	}

	public async getAllAttributesInStore(token?: CancelToken) {
		const resp = await this.getAllAttributes(token);
		if (resp.data) {
			store.dispatch(darkActions.updateAttributesForce(resp.data));
		}
	}
}

import {CancelToken} from "axios";
import BackendContext from "../../context/backend.context";
import {TTracker} from "../../types";
import {store} from "../../store/store";
import {trackerActions} from "../../store/features/tracker.slice";

export default class TrackerAPI extends BackendContext {
	constructor() {
		super(`/tracker`);
	}

	/* TRACKER */

	public createTracker(data: TTrackerCreate) {
		return this.context.post(`/`, data);
	}

	public getTracker(token?: CancelToken) {
		return this.context.get<TTracker>(`/`, {cancelToken: token});
	}

	/**
	 * Fetches the tracker data and updates the tracker in the store.
	 *
	 * @param token - Optional cancel token for the request.
	 * @returns The HTTP status code of the request.
	 */
	public async autoUpdateTracker(token?: CancelToken) {
		// Fetch the tracker data
		return this.getTracker(token)
			.then(d => {
				// Dispatch an action to update the tracker in the store
				store.dispatch(trackerActions.forceUpdateTracker(d.data));
				// Return a success status code
				return 200;
			})
			.catch(e => {
				if (e && e.response) {
					// Return the status code from the error response
					return e.response.status;
				}
				// Return a generic error status code
				return 600;
			});
	}

	public async updateTracker(data: TTrackerUpdate, token?: CancelToken) {
		return this.context.patch(`/`, data, {cancelToken: token});
	}

	public async removeTracker(id: number, token?: CancelToken) {
		return this.context.delete(`/${id}`, {cancelToken: token});
	}

	/* SPENDS */

	public async addSpend(data: TSpend, token?: CancelToken) {
		return await this.context.post(`/spend`, data, {cancelToken: token});
	}

	public async updateSpend(id: number, data: TSpend, token?: CancelToken) {
		return await this.context.patch(`/spend/${id}`, data, {cancelToken: token});
	}

	public async removeSpend(id: number, token?: CancelToken) {
		return await this.context.delete(`/spend/${id}`, {cancelToken: token});
	}
}

type TTrackerCreate = {
	limit: number;
	startLimit: number;
	dayLimit: number;
	months: number;
	calc: string;
};

type TTrackerUpdate = {
	dayLimit: number;
	startDate: string;
	calc: string;
	limit: number;
};

type TSpend = {
	cost: number;
	category: string;
	description?: string;
	date?: Date | string | null;
	createdAt?: string;
};

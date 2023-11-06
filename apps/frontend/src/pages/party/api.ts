import {CancelToken} from "axios";
import BackendContext from "../../context/backend.context";
import {TCalculator, TMember} from "../../types";
import { store } from "../../store/store";
import { partyActions } from "../../store/features/party.slice";

export default class PartyAPI extends BackendContext {
	constructor() {
		super(`/party`);
	}

	/* CALCULATOR */

	public createCalculator() {
		return this.context.post(`/`, null);
	}

	public getCalculator(token?: CancelToken) {
		return this.context.get<TCalculator>(`/`, {cancelToken: token});
	}

	public async autoUpdateCalculator(token?: CancelToken) {
		return this.getCalculator(token)
			.then(d => {
				if (d && d.data && d.data.id) {
					store.dispatch(partyActions.forceUpdateCalculator(d.data));
					store.dispatch(partyActions.updateMemberPages(Math.ceil(d.data.members.length / 5)));
					store.dispatch(
						partyActions.updatePositionPages(Math.ceil(d.data.positions.length / 10))
					);
				}
			})
			.catch(() => null);
	}

	/* MEMBERS */

	public createMember(calculatorId: number, name: string, payer: boolean) {
		return this.context.post(`/member`, {calculatorId: calculatorId, name: name, payer: payer});
	}

	public getMembers(calculatorId: number) {
		return this.context.get<TMember[]>(`/member/all/${calculatorId}`);
	}

	public updateMembers(props: {name?: string; avatar?: string}, memberId: number) {
		return this.context.patch(`/member/${memberId}`, props);
	}

	public removeMember(memberId: number) {
		return this.context.delete(`/member/${memberId}`);
	}

	public removeMembers(calculatorId: number) {
		return this.context.delete(`/member/all/${calculatorId}`, {withCredentials: true});
	}

	/* POSITIONS */

	public createPosition(data: {
		calculatorId: number;
		name: string;
		cost: number;
		memberIds?: number[];
		payerId?: number;
	}) {
		return this.context.post(`/position`, data, {withCredentials: true});
	}

	public updatePosition(data: {
		positionId: number;
		name?: string;
		cost?: number;
		memberIds?: number[];
		payerId?: number;
	}) {
		return this.context.patch(`/position`, data, {withCredentials: true});
	}

	public removePosition(positionId: number) {
		return this.context.delete(`/position/${positionId}`, {withCredentials: true});
	}

	public removePositions(calculatorId: number) {
		return this.context.delete(`/position/all/${calculatorId}`, {withCredentials: true});
	}
}

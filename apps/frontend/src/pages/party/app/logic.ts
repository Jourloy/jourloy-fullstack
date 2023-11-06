import {TCalculator} from "../../../types";

export default class PartyPositionLogic {
	private calculator: TCalculator;

	constructor(calculator: TCalculator) {
		this.calculator = calculator;
	}

	checkNumber(num: number | "", opt?: TCheckNumberOpts) {
		if (isNaN(Number(num))) return {error: true, desc: `Это должно быть числом`};
		if (!opt?.zero && Number(num) <= 0) return {error: true, desc: `Число должно быть больше нуля`};

		return {error: false, result: Number(num)};
	}

	getMembersAsString = (positionId: number) => {
		const arr: string[] = [];
		const position = this.calculator.positions.filter(p => p.id === positionId)[0];
		if (!position) return [];
		for (const member of position.memberIds) {
			arr.push(member.toString());
		}
		return arr;
	};
}

type TCheckNumberOpts = {
	zero?: boolean;
	min?: number;
	max?: number;
};

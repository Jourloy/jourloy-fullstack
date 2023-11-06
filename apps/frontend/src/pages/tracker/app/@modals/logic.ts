export default class TrackerModalsLogic {
	static checkNumber(num: number | "", opt?: TCheckNumberOpts) {
		if (isNaN(Number(num))) return {error: true, desc: `Это должно быть числом`};
		if (!opt?.zero && Number(num) <= 0) return {error: true, desc: `Число должно быть больше нуля`};

		return {error: false, result: Number(num)};
	}
}

type TCheckNumberOpts = {
	zero?: boolean;
	min?: number;
	max?: number;
};

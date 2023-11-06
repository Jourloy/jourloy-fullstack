export type TUser = {
	id: number;
	username: string;
	lowercaseUsername: string;
	avatar: string;
	role: string;
	createdAt: Date;
	updatedAt: Date;
};

export type TCalculator = {
	id: number;
	name: number;
	positions: TPosition[];
	members: TMember[];
	ownerId: number;
	createdAt: Date;
	updatedAt: Date;
};

export type TMember = {
	id: number;
	name: string;
	avatar: string;
	calculator: TCalculator;
	calculatorId: number;
	payer?: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export type TPosition = {
	id: number;
	name: string;
	cost: number;
	memberIds: number[];
	payerId?: number;
	calculator: TCalculator;
	calculatorId: number;
};

export type TTracker = {
	id: number;
	name: string;
	limit: number;
	startLimit: number;
	dayLimit: number;
	months: number;
	calc: string;
	spends: TSpend[];
	startDate: string;
	createdAt: string;
	updatedAt: string;
};

export type TSpend = {
	id: number;
	cost: number;
	category: string;
	description?: string;
	date?: string;
	createdAt: string;
	updatedAt: string;
};

export interface IPlannedSpend extends TSpend {
	date: string;
}

export type TDarkClass = {
	id: number;
	enName: string;
	ruName: string;
	enDescription: string;
	ruDescription: string;
};

export type TDarkAttribute = {
	id: number;
	enName: string;
	ruName: string;
	enDescription: string;
	ruDescription: string;
	levels: TDarkLevel[];
};

export type TDarkLevel = {
	id: number;
	depth: string;
	classes: string[];
	attributeId: number;
}
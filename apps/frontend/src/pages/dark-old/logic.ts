import {TDarkClass} from "../../types";

export default class DarkLogic {
	constructor(darkClass: TDarkClass) {
		this.darkClass = darkClass;
	}

	private darkClass: TDarkClass;

	public getType() {
		switch (this.darkClass.enName) {
			case `Ranger`:
				return `DD`;
			case `Barbarian`:
				return `Tank`;
			case `Fighter`:
				return `Tank`;
			case `Rogue`:
				return `DD`;
			case `Bard`:
				return `Support`;
			case `Cleric`:
				return `Support`;
			case `Wizard`:
				return `DD`;
			case `Druid`:
				return `Tank`;
			case `Warlock`:
				return `DD`;
		}
	}

	public getRange() {
		switch (this.darkClass.enName) {
			case `Ranger`:
				return `Дальний`;
			case `Barbarian`:
				return `Ближний`;
			case `Fighter`:
				return `Ближний`;
			case `Rogue`:
				return `Ближний`;
			case `Bard`:
				return `Средний`;
			case `Cleric`:
				return `Ближний`;
			case `Wizard`:
				return `Дальний`;
			case `Druid`:
				return `Неизвестно`;
			case `Warlock`:
				return `Средний`;
		}
	}

	public getDifficult() {
		switch (this.darkClass.enName) {
			case `Ranger`:
				return `Средняя`;
			case `Barbarian`:
				return `Низкая`;
			case `Fighter`:
				return `Средняя`;
			case `Rogue`:
				return `Высокая`;
			case `Bard`:
				return `Высокая`;
			case `Cleric`:
				return `Средняя`;
			case `Wizard`:
				return `Средняя`;
			case `Druid`:
				return `Неизвестно`;
			case `Warlock`:
				return `Низкая`;
		}
	}

	public getBackgroundUrl() {
		return `${this.darkClass.enName}Background.png`;
	}

	public getClassUrl() {
		return `${this.darkClass.enName}.png`;
	}

	public getClassIconUrl() {
		return `${this.darkClass.enName}Icon.png`;
	}

	public getTypeColor() {
		const type = this.getType();
		switch (type) {
			case `DD`:
				return `orange`;
			case `Tank`:
				return `red`;
			case `Support`:
				return `green`;
		}
	}

	public getRangeColor() {
		const type = this.getRange();
		switch (type) {
			case `Дальний`:
				return `green`;
			case `Средний`:
				return `orange`;
			case `Ближний`:
				return `red`;
		}
	}

	public getDifficultColor() {
		const type = this.getDifficult();
		switch (type) {
			case `Низкая`:
				return `green`;
			case `Средняя`:
				return `orange`;
			case `Высокая`:
				return `red`;
		}
	}
}

import type { Currency } from '../currency/Currency.ts';

export interface Conversion {
	from: Currency
	to: Currency
	amount: number
	result: string
}

export class History {
	private maxLength: number
	private conversions: Conversion[] = []

	constructor(maxLength: number) {
		this.maxLength = maxLength
	}

	getHistory(): Conversion[] {
		return this.conversions
	}

	addConversion(conversion: Conversion) {
		this.conversions.push(conversion)

		if (this.conversions.length > this.maxLength) {
			this.conversions.shift()
		}
	}
}

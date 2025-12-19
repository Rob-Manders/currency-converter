import type { Currency } from '../currency/Currency.ts';

export interface Conversion {
	from: Currency
	to: Currency
	amount: number
	result: string
}

export class Conversions {
	private readonly maxLength: number
	private conversions: Conversion[] = []

	constructor(maxLength: number) {
		this.maxLength = maxLength
	}

	get(): Conversion[] {
		return this.conversions
	}

	addConversion(conversion: Conversion) {
		this.conversions.unshift(conversion)

		if (this.conversions.length > this.maxLength) {
			this.conversions.pop()
		}
	}
}

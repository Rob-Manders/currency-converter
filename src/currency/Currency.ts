import type { BeaconCurrency, SelectOption } from '../types.ts'

export class Currency {
	private readonly name: string
	private readonly shortCode: string
	private readonly symbol: string
	private readonly symbolFirst: boolean
	private readonly precision: number

	constructor(beaconCurrency: BeaconCurrency) {
		this.name = beaconCurrency.name
		this.shortCode = beaconCurrency.short_code
		this.symbol = beaconCurrency.symbol
		this.symbolFirst = beaconCurrency.symbol_first
		this.precision = beaconCurrency.precision
	}

	getSelectOption(): SelectOption {
		return {
			value: this.shortCode,
			label: this.name
		}
	}

	getName(): string {
		return this.name
	}

	getShortCode(): string {
		return this.shortCode
	}

	formatString(amount: number): string {
		// Assuming UK users here, but ideally this would take the user's actual locale.
		const localeString = Number(amount.toFixed(this.precision)).toLocaleString('en-GB')

		if (this.symbolFirst) {
			return `${this.symbol} ${localeString}`
		}

		return `${localeString} ${this.symbol}`
	}
}

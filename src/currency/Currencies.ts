import { Currency } from './Currency.ts'
import type { BeaconCurrency } from '../types.ts'

export type Currencies = Map<string, Currency>

export function buildCurrencySet(beaconCurrencies: BeaconCurrency[]): Currencies {
	const currencies: Currencies = new Map<string, Currency>()

	beaconCurrencies.forEach((currency) => {
		currencies.set(currency.short_code, new Currency(currency))
	})

	return currencies
}

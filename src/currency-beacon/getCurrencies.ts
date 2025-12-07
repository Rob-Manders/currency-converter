import { buildCurrencySet } from '../currency/Currencies.ts'

const apiKey = import.meta.env.VITE_CURRENCY_BEACON_API_KEY

export async function getCurrencies() {
	const response = await fetch(' https://api.currencybeacon.com/v1/currencies', {
		headers: {
			'Authorization': `Bearer ${apiKey}`
		}
	})
	const data = await response.json()

	return buildCurrencySet(data.response)
}
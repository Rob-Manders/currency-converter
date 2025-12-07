import type { Currency } from '../currency/Currency.ts'

const apiKey = import.meta.env.VITE_CURRENCY_BEACON_API_KEY

export async function convertCurrencies(from: Currency, to: Currency, amount: number): Promise<string> {
	const fromCode = from.getShortCode().toUpperCase()
	const toCode = to.getShortCode().toUpperCase()

	const uri = ` https://api.currencybeacon.com/v1/convert?from=${fromCode}&to=${toCode}&amount=${amount}`

	const response = await fetch(uri, {
		headers: {
			'Authorization': `Bearer ${apiKey}`
		}
	})
	const data = await response.json()

	return to.formatString(data.value)
}
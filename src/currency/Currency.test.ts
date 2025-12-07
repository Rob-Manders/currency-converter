import { describe, expect, it } from 'vitest'
import { Currency } from './Currency.ts'

describe('Format Currency String', () => {
	it('Formats currency with symbol first', () => {
		const currency = new Currency({
			name: 'British Pound',
			short_code: 'GBP',
			symbol: '£',
			symbol_first: true,
			precision: 2
		})

		const want = '£25,000.99'
		const got = currency.formatString(25000.99)

		expect(got).toEqual(want)
	})

	it('Formats currency with symbol last', () => {
		const currency = new Currency({
			name: 'British Pound',
			short_code: 'GBP',
			symbol: '£',
			symbol_first: false,
			precision: 2
		})

		const want = '25,000.99£'
		const got = currency.formatString(25000.99)

		expect(got).toEqual(want)
	})

	it('Formats currency with precision of 2', () => {
		const currency = new Currency({
			name: 'British Pound',
			short_code: 'GBP',
			symbol: '£',
			symbol_first: true,
			precision: 2
		})

		const want = '£25,000.99'
		const got = currency.formatString(25000.987654)

		expect(got).toEqual(want)
	})

	it('Formats currency with precision of 0', () => {
		const currency = new Currency({
			name: 'British Pound',
			short_code: 'GBP',
			symbol: '£',
			symbol_first: true,
			precision: 0
		})

		const want = '£25,001'
		const got = currency.formatString(25000.987654)

		expect(got).toEqual(want)
	})

	it('Formats currency with precision of 3', () => {
		const currency = new Currency({
			name: 'British Pound',
			short_code: 'GBP',
			symbol: '£',
			symbol_first: true,
			precision: 3
		})

		const want = '£25,000.988'
		const got = currency.formatString(25000.987654)

		expect(got).toEqual(want)
	})
})

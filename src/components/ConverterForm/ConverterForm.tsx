import styles from './ConverterForm.module.css'
import Select from '../Select/Select.tsx'
import type { Currencies } from '../../currency/Currencies.ts'
import type { Currency } from '../../currency/Currency.ts'
import type { SelectOption } from '../../types.ts'
import { convertCurrencies } from '../../currency-beacon/convertCurrencies.ts'
import { useEffect, useMemo, useState } from 'react'
import NumberInput from '../NumberInput/NumberInput.tsx'
import { useContext } from 'react'
import { HistoryContext } from '../../context/HistoryContext.tsx';

interface Props {
	currencies: Currencies
}

export default function ConverterForm({ currencies }: Props) {
	const [fromCurrency, setFromCurrency] = useState<Currency>()
	const [toCurrency, setToCurrency] = useState<Currency>()
	const [amount, setAmount] = useState<number>(0)
	const [result, setResult] = useState<string>('')
	const [error, setError] = useState<string | null>()

	const { add } = useContext(HistoryContext)

	useEffect(() => {
		if (!currencies) {
			return
		}

		const gbp = currencies.get('GBP')
		const usd = currencies.get('USD')

		if (gbp && usd) {
			setFromCurrency(gbp)
			setToCurrency(usd)
		}
	}, [currencies])

	const selectOptions = useMemo(() => {
		let options: SelectOption[] = []
		currencies?.forEach((currency) => {
			options.push(currency.getSelectOption())
		})

		options = options.sort(sortSelectOptions)

		return options
	}, [currencies])

	function convertCurrency() {
		if (!fromCurrency || !toCurrency) {
			return
		}

		convertCurrencies(fromCurrency, toCurrency, amount)
		.then((r) => {
			setResult(r);

			add({
				from: fromCurrency,
				to: toCurrency,
				amount: amount,
				result: r
			})
		})
		.catch((error) => {
			setError('Unable to get response from conversion request')
			console.error(error)
		})
	}

	return (
		<>
			{currencies && fromCurrency && toCurrency &&
                <div className={styles.converterForm}>
					<div className={styles.selectors}>
						<Select
							value={fromCurrency.getShortCode()}
							options={selectOptions}
							onChange={(v) => setFromCurrency(currencies?.get(v))}
						/>
						TO
						<Select
							value={toCurrency.getShortCode()}
							options={selectOptions}
							onChange={(v) => setToCurrency(currencies?.get(v))}
						/>
					</div>

					<NumberInput value={amount} onChange={(v) => setAmount(v)}/>
					<button className={styles.button} onClick={() => convertCurrency()}>Convert</button>

					{error ? <p className={styles.error}>{error}</p> : <p className={styles.result}>{result}</p>}
                </div>
			}
		</>
	)
}

function sortSelectOptions(a: SelectOption, b: SelectOption) {
	if (a.label > b.label) {
		return 1
	}

	if (a.label < b.label) {
		return -1
	}

	return 0
}

import styles from './ConverterForm.module.css'
import Select from '../Select/Select.tsx'
import type { Currencies } from '../../currency/Currencies.ts'
import type { Currency } from '../../currency/Currency.ts'
import type { SelectOption } from '../../types.ts'
import { convertCurrencies } from '../../currency-beacon/convertCurrencies.ts'
import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import NumberInput from '../NumberInput/NumberInput.tsx'
import { useContext } from 'react'
import { ResultsContext } from '../../context/ResultsContext.tsx';
import ErrorMessage from '../Error/ErrorMessage.tsx'

interface Props {
	currencies: Currencies
}

export default function ConverterForm({ currencies }: Props) {
	const [fromCurrency, setFromCurrency] = useState<Currency>()
	const [toCurrency, setToCurrency] = useState<Currency>()
	const [amount, setAmount] = useState<number>(0)
	const [error, setError] = useState<string | null>()

	const results = useContext(ResultsContext)
	if (!results) {
		setError('Error initialising application')
		console.error('Results context is null in ConverterForm component')

		return <p className={styles.error}>{error}</p>
	}

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

	function convertCurrency(event: MouseEvent<HTMLButtonElement>) {
		event.preventDefault()

		if (!fromCurrency || !toCurrency) {
			return
		}

		convertCurrencies(fromCurrency, toCurrency, amount)
		.then((r) => {
			results!.add({
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
                <form className={styles.converterForm}>
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
					<button className={styles.button} onClick={(event) => convertCurrency(event)}>Convert</button>

					{error && <ErrorMessage message={error} />}
                </form>
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
